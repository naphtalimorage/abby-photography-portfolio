// src/components/common/UserAvatar.tsx
import { useState, useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { supabase } from '@/intergration/supabase/Client';
import { toast } from 'sonner';
import { useAdminProfile } from '../../hooks/UseAdminProfile.ts';
import { useQueryClient } from '@tanstack/react-query';
import { LogoSVG } from './LogoSVG';

interface UserAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallbackText?: string;
  interactive?: boolean;
  useLogoAsFallback?: boolean;
}

export const UserAvatar = ({
                             size = 'md',
                             className = '',
                             fallbackText = 'U',
                             interactive = true,
                             useLogoAsFallback = false,
                           }: UserAvatarProps) => {
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useAdminProfile();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const avatarUrl = profile?.avatar_url ?? undefined;
  const displayName = profile?.full_name ?? null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async () => {
    if (!imageRef.current || !crop) return;
    setIsUploading(true);

    const canvas = document.createElement('canvas');
    const image = imageRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const cropWidth = (crop.width || 0) * scaleX;
    const cropHeight = (crop.height || 0) * scaleY;
    const cropX = (crop.x || 0) * scaleX;
    const cropY = (crop.y || 0) * scaleY;

    canvas.width = cropWidth;
    canvas.height = cropHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.9);
    });
    if (!blob) {
      toast.error('Failed to process image');
      setIsUploading(false);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Upload to Supabase Storage
      const filePath = `${user.id}/${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, blob, { contentType: 'image/jpeg', upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const avatarUrl = urlData.publicUrl;

      // Update admin_users table
      const { error: updateError } = await supabase
          .from('admin_users')
          .update({ avatar_url: avatarUrl, updated_at: new Date() })
          .eq('user_id', user.id);

      if (updateError) throw updateError;

      // Invalidate the query so it refetches and updates everywhere
      queryClient.invalidateQueries({ queryKey: ['admin-profile'] });

      toast.success('Avatar updated successfully');
      setOpen(false);
      setSelectedImage(null);
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload avatar');
    } finally {
      setIsUploading(false);
    }
  };

  const getSize = () => {
    switch (size) {
      case 'sm': return 'h-8 w-8 text-xs';
      case 'md': return 'h-10 w-10 text-sm';
      case 'lg': return 'h-12 w-12 text-base';
      case 'xl': return 'h-16 w-16 text-lg';
      default: return 'h-10 w-10 text-sm';
    }
  };

  const initial = displayName?.[0]?.toUpperCase() || fallbackText[0]?.toUpperCase() || 'U';

  const avatarElement = (
      <Avatar className={`${getSize()} border-2 border-savanna-gold/20 transition-all ${interactive ? 'group-hover:border-savanna-gold/60 cursor-pointer' : ''}`}>
        <AvatarImage src={avatarUrl} alt="Avatar" />
        <AvatarFallback className="bg-savanna-gold/10 text-savanna-gold font-medium">
          {isLoading ? '…' : (useLogoAsFallback && !avatarUrl) ? <LogoSVG className="w-full h-full p-1" /> : initial}
        </AvatarFallback>
      </Avatar>
  );

  if (!interactive) {
    return <div className={`relative ${className}`}>{avatarElement}</div>;
  }

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className={`relative group ${className} focus:outline-none`}>
          {avatarElement}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-full">
            <Upload className="w-4 h-4 text-white" />
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Change Avatar</h2>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!selectedImage ? (
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-lg">
                  <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">Click to select an image</p>
                  <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                  />
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    Choose Image
                  </Button>
                </div>
            ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <ReactCrop
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        aspect={1}
                        circularCrop
                        className="max-h-[400px]"
                    >
                      <img
                          ref={imageRef}
                          src={selectedImage}
                          alt="Crop"
                          className="max-h-[400px] object-contain"
                      />
                    </ReactCrop>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setSelectedImage(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCropComplete} disabled={isUploading}>
                      {isUploading ? 'Uploading...' : 'Save'}
                    </Button>
                  </div>
                </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
  );
};

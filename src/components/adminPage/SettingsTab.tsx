// src/components/adminpage/SettingsTab.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Store,
  Share2,
  Bell,
  Shield,
  Camera,
  Video,
  MonitorPlay,
  Key,
  Download,
  AlertTriangle,
  Upload,
  ExternalLink,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  Save,
  Eye,
  EyeOff,
  Loader2,
  Database,
  LogOut,
  Trash2,
  User,
  Mail,
  Phone,
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/intergration/supabase/Client.ts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

// Types
interface StudioProfile {
  id: string;
  studio_name: string;
  lead_photographer: string;
  bio: string;
  logo_url: string | null;
  email: string;
  phone: string | null;
  website: string | null;
  location: string | null;
}

interface PlatformIntegration {
  id: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'facebook';
  handle: string;
  connected: boolean;
  connected_at: string | null;
  access_token: string | null;
}

interface NotificationPreferences {
  id: string;
  user_id: string;
  new_bookings: boolean;
  gallery_comments: boolean;
  system_updates: boolean;
  marketing_emails: boolean;
  security_alerts: boolean;
}

const SettingsTab = () => {
  const queryClient = useQueryClient();

  // Profile state
  const [profileData, setProfileData] = useState<Partial<StudioProfile>>({
    studio_name: '',
    lead_photographer: '',
    bio: '',
    email: '',
    phone: '',
    website: '',
    location: '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Mobile collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    profile: true,
    platforms: true,
    notifications: true,
    security: true,
  });

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationPreferences>({
    id: '',
    user_id: '',
    new_bookings: true,
    gallery_comments: true,
    system_updates: false,
    marketing_emails: false,
    security_alerts: true,
  });

  // Security state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Dialogs
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [archiveConfirmText, setArchiveConfirmText] = useState('');

  // Fetch studio profile
  const profileQuery = useQuery({
    queryKey: ['admin-studio-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
          .from('studio_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

      if (error) {
        console.error('Profile fetch error:', error);
        return null;
      }

      return data as StudioProfile | null;
    },
  });

  // Fetch platform integrations
  const integrationsQuery = useQuery({
    queryKey: ['admin-platform-integrations'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
          .from('platform_integrations')
          .select('*')
          .eq('user_id', user.id);

      if (error) throw error;
      return (data ?? []) as PlatformIntegration[];
    },
  });

  // Fetch notification preferences
  const notificationsQuery = useQuery({
    queryKey: ['admin-notification-preferences'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
          .from('notification_preferences')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

      if (error) {
        console.error('Notifications fetch error:', error);
        return null;
      }

      return data as NotificationPreferences | null;
    },
  });

  // Update state when data loads
  useEffect(() => {
    if (profileQuery.data) {
      setProfileData({
        studio_name: profileQuery.data.studio_name || '',
        lead_photographer: profileQuery.data.lead_photographer || '',
        bio: profileQuery.data.bio || '',
        email: profileQuery.data.email || '',
        phone: profileQuery.data.phone || '',
        website: profileQuery.data.website || '',
        location: profileQuery.data.location || '',
      });
      if (profileQuery.data.logo_url) {
        setLogoPreview(profileQuery.data.logo_url);
      }
    }
  }, [profileQuery.data]);

  useEffect(() => {
    if (notificationsQuery.data) {
      setNotifications(notificationsQuery.data);
    }
  }, [notificationsQuery.data]);

  // Platform integrations data
  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Camera,
      handle: integrationsQuery.data?.find(p => p.platform === 'instagram')?.handle || '',
      connected: integrationsQuery.data?.find(p => p.platform === 'instagram')?.connected || false,
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: Video,
      handle: integrationsQuery.data?.find(p => p.platform === 'tiktok')?.handle || '',
      connected: integrationsQuery.data?.find(p => p.platform === 'tiktok')?.connected || false,
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: MonitorPlay,
      handle: integrationsQuery.data?.find(p => p.platform === 'youtube')?.handle || '',
      connected: integrationsQuery.data?.find(p => p.platform === 'youtube')?.connected || false,
    },
  ];

  // Save profile mutation
  const saveProfileMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      let logoUrl = profileData.logo_url;

      if (logoFile) {
        const ext = logoFile.name.split('.').pop() || 'jpg';
        const path = `logo-${Date.now()}.${ext}`;

        const { error: uploadError } = await supabase.storage
            .from('studio_assets')
            .upload(path, logoFile, { contentType: logoFile.type });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('studio_assets').getPublicUrl(path);
        logoUrl = data.publicUrl;

        if (profileQuery.data?.logo_url) {
          const oldPath = profileQuery.data.logo_url.split('/').pop();
          if (oldPath) {
            await supabase.storage.from('studio_assets').remove([oldPath]);
          }
        }
      }

      const { error } = await supabase
          .from('studio_profiles')
          .upsert({
            user_id: user.id,
            studio_name: profileData.studio_name,
            lead_photographer: profileData.lead_photographer,
            bio: profileData.bio,
            email: profileData.email,
            phone: profileData.phone,
            website: profileData.website,
            location: profileData.location,
            logo_url: logoUrl,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id'
          });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-studio-profile'] });
      toast.success('Studio profile updated successfully');
      setLogoFile(null);
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to save profile');
    },
  });

  // Save notifications mutation
  const saveNotificationsMutation = useMutation({
    mutationFn: async (prefs: NotificationPreferences) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
          .from('notification_preferences')
          .upsert({
            user_id: user.id,
            new_bookings: prefs.new_bookings,
            gallery_comments: prefs.gallery_comments,
            system_updates: prefs.system_updates,
            marketing_emails: prefs.marketing_emails,
            security_alerts: prefs.security_alerts,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id'
          });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-notification-preferences'] });
      toast.success('Notification preferences updated');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to save preferences');
    },
  });

  const toggleNotification = (key: keyof Omit<NotificationPreferences, 'id' | 'user_id'>) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    saveNotificationsMutation.mutate(updated);
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setIsChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (error) throw error;

      toast.success('Password changed successfully');
      setPasswordDialogOpen(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      toast.error(err.message || 'Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const archiveStudioMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
          .from('studio_profiles')
          .update({
            archived: true,
            archived_at: new Date().toISOString(),
          })
          .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Studio profile archived');
      setArchiveDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['admin-studio-profile'] });
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to archive studio');
    },
  });

  const handleExportData = async () => {
    try {
      toast.info('Preparing data export...');

      const [photosRes, servicesRes, reelsRes] = await Promise.all([
        supabase.from('photos').select('*'),
        supabase.from('services').select('*'),
        supabase.from('video_reels').select('*'),
      ]);

      const exportData = {
        exported_at: new Date().toISOString(),
        photos: photosRes.data || [],
        services: servicesRes.data || [],
        video_reels: reelsRes.data || [],
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mara-studio-export-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Data exported successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to export data');
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Logo must be smaller than 5MB');
      return;
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSaveProfile = () => {
    if (!profileData.studio_name?.trim()) {
      toast.error('Studio name is required');
      return;
    }
    if (!profileData.email?.trim()) {
      toast.error('Email is required');
      return;
    }

    saveProfileMutation.mutate();
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      window.location.href = '/';
    } catch (err: any) {
      toast.error(err.message || 'Failed to sign out');
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isSaving = saveProfileMutation.isPending;

  return (
      <div className="pb-24 md:pb-0">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-[1px] bg-savanna-gold" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-savanna-gold font-bold">
                                Configuration
                            </span>
              </div>
              <h2 className="font-display text-2xl md:text-5xl text-foreground font-light leading-tight">
                Studio Settings
              </h2>
              <p className="text-muted-foreground text-sm md:text-lg max-w-2xl leading-relaxed mt-1 md:mt-2">
                Manage your identity, security, and integrations
              </p>
            </div>

            {/* Desktop: Save Button */}
            <Button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="hidden md:flex bg-savanna-gold text-savanna-charcoal hover:bg-savanna-gold/90 px-8 py-3 text-xs tracking-[0.2em] uppercase font-bold transition-all shadow-lg shadow-savanna-gold/10 active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
              ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
              )}
            </Button>
          </div>
        </div>

        {/* Main Content - Stacked on Mobile, Grid on Desktop */}
        <div className="space-y-4 md:space-y-6">
          {/* Studio Profile Section */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-savanna-charcoal/30 border border-border/30 overflow-hidden"
          >
            {/* Section Header - Collapsible on Mobile */}
            <button
                onClick={() => toggleSection('profile')}
                className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-savanna-charcoal/20 transition-colors"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="p-2 bg-savanna-gold/10 border border-savanna-gold/30">
                  <Store className="w-4 h-4 md:w-5 md:h-5 text-savanna-gold" />
                </div>
                <div className="text-left">
                  <h3 className="font-display text-base md:text-xl text-foreground">
                    Studio Profile
                  </h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">
                    Update your studio information
                  </p>
                </div>
              </div>
              <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform md:hidden ${
                      expandedSections.profile ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {/* Section Content */}
            <AnimatePresence>
              {(expandedSections.profile || window.innerWidth >= 768) && (
                  <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                  >
                    <div className="px-4 md:px-6 pb-4 md:pb-6">
                      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        {/* Logo Upload */}
                        <div className="flex-shrink-0 flex flex-col items-center gap-3">
                          <div className="relative w-24 h-24 md:w-32 md:h-32 group cursor-pointer">
                            <div className="w-full h-full overflow-hidden border-2 border-border/30 group-hover:border-savanna-gold transition-colors">
                              {logoPreview ? (
                                  <img
                                      src={logoPreview}
                                      alt="Studio Logo"
                                      className="w-full h-full object-cover"
                                  />
                              ) : (
                                  <div className="w-full h-full bg-savanna-charcoal/50 flex items-center justify-center">
                                    <Store className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground" />
                                  </div>
                              )}
                            </div>
                            <label className="absolute inset-0 bg-savanna-charcoal/60 opacity-0 group-hover:opacity-100 group-active:opacity-100 flex flex-col items-center justify-center transition-opacity cursor-pointer">
                              <Upload className="w-4 h-4 md:w-5 md:h-5 text-savanna-gold mb-1" />
                              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-foreground">
                                                        Change
                                                    </span>
                              <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleLogoChange}
                                  className="hidden"
                              />
                            </label>
                          </div>
                          <span className="text-[10px] tracking-widest uppercase text-muted-foreground">
                                                5MB MAX
                                            </span>
                        </div>

                        {/* Profile Fields */}
                        <div className="flex-1 space-y-4 md:space-y-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase tracking-[0.2em] text-savanna-gold font-bold flex items-center gap-2">
                                <User className="w-3 h-3" />
                                Studio Name *
                              </Label>
                              <Input
                                  value={profileData.studio_name}
                                  onChange={(e) => setProfileData({ ...profileData, studio_name: e.target.value })}
                                  placeholder="Mara Capture"
                                  className="bg-savanna-charcoal/50 border border-border/30 focus:border-savanna-gold focus:ring-0 h-11 md:h-12 px-4 text-sm text-foreground placeholder:text-muted-foreground/40"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase tracking-[0.2em] text-savanna-gold font-bold flex items-center gap-2">
                                <User className="w-3 h-3" />
                                Lead Photographer
                              </Label>
                              <Input
                                  value={profileData.lead_photographer}
                                  onChange={(e) => setProfileData({ ...profileData, lead_photographer: e.target.value })}
                                  placeholder="John Doe"
                                  className="bg-savanna-charcoal/50 border border-border/30 focus:border-savanna-gold focus:ring-0 h-11 md:h-12 px-4 text-sm text-foreground placeholder:text-muted-foreground/40"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase tracking-[0.2em] text-savanna-gold font-bold flex items-center gap-2">
                                <Mail className="w-3 h-3" />
                                Email *
                              </Label>
                              <Input
                                  type="email"
                                  value={profileData.email}
                                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                  placeholder="hello@maracapture.com"
                                  className="bg-savanna-charcoal/50 border border-border/30 focus:border-savanna-gold focus:ring-0 h-11 md:h-12 px-4 text-sm text-foreground placeholder:text-muted-foreground/40"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase tracking-[0.2em] text-savanna-gold font-bold flex items-center gap-2">
                                <Phone className="w-3 h-3" />
                                Phone
                              </Label>
                              <Input
                                  type="tel"
                                  value={profileData.phone || ''}
                                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                  placeholder="+254 700 000 000"
                                  className="bg-savanna-charcoal/50 border border-border/30 focus:border-savanna-gold focus:ring-0 h-11 md:h-12 px-4 text-sm text-foreground placeholder:text-muted-foreground/40"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-[0.2em] text-savanna-gold font-bold">
                              Studio Bio
                            </Label>
                            <textarea
                                value={profileData.bio}
                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                placeholder="Tell the world about your studio..."
                                className="w-full bg-savanna-charcoal/50 border border-border/30 focus:border-savanna-gold focus:ring-0 py-3 px-4 text-sm text-foreground transition-all resize-none min-h-[100px] md:min-h-[120px] placeholder:text-muted-foreground/40"
                                rows={4}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Platform Integrations */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-savanna-charcoal/30 border border-border/30 overflow-hidden"
          >
            <button
                onClick={() => toggleSection('platforms')}
                className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-savanna-charcoal/20 transition-colors"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="p-2 bg-savanna-gold/10 border border-savanna-gold/30">
                  <Share2 className="w-4 h-4 md:w-5 md:h-5 text-savanna-gold" />
                </div>
                <div className="text-left">
                  <h3 className="font-display text-base md:text-xl text-foreground">
                    Platform Integrations
                  </h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">
                    Connect your social media accounts
                  </p>
                </div>
              </div>
              <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform md:hidden ${
                      expandedSections.platforms ? 'rotate-180' : ''
                  }`}
              />
            </button>

            <AnimatePresence>
              {(expandedSections.platforms || window.innerWidth >= 768) && (
                  <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                  >
                    <div className="px-4 md:px-6 pb-4 md:pb-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                        {platforms.map((platform) => {
                          const Icon = platform.icon;
                          return (
                              <div
                                  key={platform.id}
                                  className={`bg-savanna-charcoal/50 p-4 md:p-5 border transition-all active:scale-[0.98] ${
                                      platform.connected
                                          ? 'border-border/30 hover:border-savanna-gold/50'
                                          : 'border-error/30 hover:border-error/50'
                                  }`}
                              >
                                <div className="flex items-center justify-between mb-3 md:mb-4">
                                  <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-background border border-border/30">
                                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
                                  </div>
                                  <span
                                      className={`text-[9px] md:text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider ${
                                          platform.connected
                                              ? 'bg-savanna-forest/20 text-savanna-forest border border-savanna-forest/30'
                                              : 'bg-error/20 text-error border border-error/30'
                                      }`}
                                  >
                                                            {platform.connected ? 'Connected' : 'Not Connected'}
                                                        </span>
                                </div>
                                <h4 className="font-bold text-foreground text-sm md:text-base mb-1">
                                  {platform.name}
                                </h4>
                                <p className="text-[10px] md:text-xs text-muted-foreground/60 mb-3 md:mb-4 truncate">
                                  {platform.handle || 'No handle set'}
                                </p>
                                <button
                                    className={`text-[10px] md:text-xs tracking-widest uppercase font-bold hover:underline flex items-center gap-1 ${
                                        platform.connected ? 'text-savanna-gold' : 'text-error'
                                    }`}
                                    onClick={() => {
                                      if (platform.connected) {
                                        toast.info(`Manage ${platform.name} integration`);
                                      } else {
                                        toast.info(`Connect ${platform.name} account`);
                                      }
                                    }}
                                >
                                  {platform.connected ? 'Manage' : 'Connect'}
                                  {platform.connected ? (
                                      <ExternalLink className="w-3 h-3" />
                                  ) : (
                                      <RefreshCw className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Notifications */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-savanna-charcoal/30 border border-border/30 overflow-hidden"
          >
            <button
                onClick={() => toggleSection('notifications')}
                className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-savanna-charcoal/20 transition-colors"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="p-2 bg-savanna-gold/10 border border-savanna-gold/30">
                  <Bell className="w-4 h-4 md:w-5 md:h-5 text-savanna-gold" />
                </div>
                <div className="text-left">
                  <h3 className="font-display text-base md:text-xl text-foreground">
                    Notifications
                  </h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">
                    Manage your notification preferences
                  </p>
                </div>
              </div>
              <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform md:hidden ${
                      expandedSections.notifications ? 'rotate-180' : ''
                  }`}
              />
            </button>

            <AnimatePresence>
              {(expandedSections.notifications || window.innerWidth >= 768) && (
                  <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                  >
                    <div className="px-4 md:px-6 pb-4 md:pb-6">
                      <div className="space-y-4 md:space-y-5">
                        {[
                          { key: 'new_bookings' as const, title: 'New Booking Alerts', desc: 'Real-time SMS & Email' },
                          { key: 'gallery_comments' as const, title: 'Gallery Comments', desc: 'Activity on client photos' },
                          { key: 'system_updates' as const, title: 'System Updates', desc: 'Platform maintenance news' },
                          { key: 'security_alerts' as const, title: 'Security Alerts', desc: 'Login attempts & changes' },
                        ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between gap-4 py-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-foreground text-xs md:text-sm leading-tight truncate">
                                  {item.title}
                                </h4>
                                <p className="text-[10px] md:text-xs text-muted-foreground truncate">
                                  {item.desc}
                                </p>
                              </div>
                              <button
                                  onClick={() => toggleNotification(item.key)}
                                  className={`relative w-12 h-7 md:w-11 md:h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
                                      notifications[item.key]
                                          ? 'bg-savanna-gold'
                                          : 'bg-savanna-charcoal border border-border/30'
                                  }`}
                                  aria-label={`Toggle ${item.title}`}
                              >
                                <div
                                    className={`absolute top-1 w-5 h-5 md:w-4 md:h-4 rounded-full transition-transform duration-200 ${
                                        notifications[item.key]
                                            ? 'translate-x-6 md:translate-x-6 bg-savanna-charcoal'
                                            : 'translate-x-1 bg-muted-foreground'
                                    }`}
                                />
                              </button>
                            </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Security & Data */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-savanna-charcoal/30 border border-border/30 overflow-hidden"
          >
            <button
                onClick={() => toggleSection('security')}
                className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-savanna-charcoal/20 transition-colors"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="p-2 bg-savanna-gold/10 border border-savanna-gold/30">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-savanna-gold" />
                </div>
                <div className="text-left">
                  <h3 className="font-display text-base md:text-xl text-foreground">
                    Security & Data
                  </h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">
                    Manage security and export data
                  </p>
                </div>
              </div>
              <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform md:hidden ${
                      expandedSections.security ? 'rotate-180' : ''
                  }`}
              />
            </button>

            <AnimatePresence>
              {(expandedSections.security || window.innerWidth >= 768) && (
                  <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                  >
                    <div className="px-4 md:px-6 pb-4 md:pb-6 space-y-2 md:space-y-3">
                      <button
                          onClick={() => setPasswordDialogOpen(true)}
                          className="w-full flex items-center justify-between p-3 md:p-4 bg-savanna-charcoal/50 border border-border/30 hover:border-savanna-gold transition-all group active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-3">
                          <Key className="w-4 h-4 text-muted-foreground group-hover:text-savanna-gold transition-colors" />
                          <span className="font-bold text-foreground text-xs md:text-sm">Change Password</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>

                      <button
                          onClick={handleExportData}
                          className="w-full flex items-center justify-between p-3 md:p-4 bg-savanna-charcoal/50 border border-border/30 hover:border-savanna-gold transition-all group active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-3">
                          <Database className="w-4 h-4 text-muted-foreground group-hover:text-savanna-gold transition-colors" />
                          <span className="font-bold text-foreground text-xs md:text-sm">Export All Data</span>
                        </div>
                        <Download className="w-4 h-4 text-muted-foreground group-hover:text-savanna-gold transition-colors" />
                      </button>

                      <button
                          onClick={handleSignOut}
                          className="w-full flex items-center justify-between p-3 md:p-4 bg-savanna-charcoal/50 border border-border/30 hover:border-error transition-all group active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-3">
                          <LogOut className="w-4 h-4 text-muted-foreground group-hover:text-error transition-colors" />
                          <span className="font-bold text-foreground text-xs md:text-sm">Sign Out</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-error/5 border border-error/20 p-4 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-error/10 border border-error/30 flex-shrink-0">
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-error" />
              </div>
              <div>
                <h4 className="font-bold text-error text-base md:text-xl">Danger Zone</h4>
                <p className="text-muted-foreground opacity-70 text-xs md:text-sm">
                  Archiving your studio will hide all public content and stop new bookings.
                </p>
              </div>
            </div>
            <button
                onClick={() => setArchiveDialogOpen(true)}
                className="w-full md:w-auto border border-error text-error px-4 md:px-6 py-2.5 md:py-2 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold hover:bg-error/10 transition-colors flex items-center justify-center gap-2 active:scale-95"
            >
              <Trash2 className="w-4 h-4" />
              Archive Studio
            </button>
          </motion.div>
        </div>

        {/* Mobile: Sticky Save Button */}
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-background/95 backdrop-blur-xl border-t border-border/30"
        >
          <Button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="w-full bg-savanna-gold text-savanna-charcoal hover:bg-savanna-gold/90 h-12 text-xs tracking-[0.2em] uppercase font-bold transition-all shadow-lg shadow-savanna-gold/10 active:scale-95 disabled:opacity-50"
          >
            {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
            ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
            )}
          </Button>
        </motion.div>

        {/* Change Password Dialog */}
        <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
          <DialogContent className="sm:max-w-md border border-border/30 bg-background max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-xl md:text-2xl text-foreground">
                Change <span className="italic text-savanna-gold">Password</span>
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs md:text-sm">
                Update your account password. Choose a strong password with at least 8 characters.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-[0.2em] text-savanna-gold font-bold">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="Enter new password"
                      className="bg-savanna-charcoal/50 border border-border/30 focus:border-savanna-gold pr-10 h-11 md:h-12"
                  />
                  <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-[0.2em] text-savanna-gold font-bold">
                  Confirm Password
                </Label>
                <Input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    className="bg-savanna-charcoal/50 border border-border/30 focus:border-savanna-gold h-11 md:h-12"
                />
              </div>
            </div>

            <DialogFooter className="gap-3 flex-col sm:flex-row">
              <Button
                  variant="outline"
                  onClick={() => setPasswordDialogOpen(false)}
                  className="border-border/30 text-foreground hover:bg-savanna-charcoal/30 w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                  onClick={handleChangePassword}
                  disabled={isChangingPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                  className="bg-savanna-gold text-savanna-charcoal hover:bg-savanna-gold/90 disabled:opacity-50 w-full sm:w-auto"
              >
                {isChangingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Changing...
                    </>
                ) : (
                    'Update Password'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Archive Studio Dialog */}
        <Dialog open={archiveDialogOpen} onOpenChange={setArchiveDialogOpen}>
          <DialogContent className="sm:max-w-md border border-error/30 bg-background max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-xl md:text-2xl text-error flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6" />
                Archive Studio
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs md:text-sm">
                This action will archive your studio profile and hide all public content. This cannot be easily undone.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4">
              <div className="p-3 md:p-4 bg-error/5 border border-error/20">
                <p className="text-xs md:text-sm text-foreground">
                  To confirm, type <span className="font-bold text-error">ARCHIVE</span> below:
                </p>
              </div>
              <Input
                  value={archiveConfirmText}
                  onChange={(e) => setArchiveConfirmText(e.target.value)}
                  placeholder="Type ARCHIVE to confirm"
                  className="bg-savanna-charcoal/50 border border-border/30 focus:border-error h-11 md:h-12"
              />
            </div>

            <DialogFooter className="gap-3 flex-col sm:flex-row">
              <Button
                  variant="outline"
                  onClick={() => {
                    setArchiveDialogOpen(false);
                    setArchiveConfirmText('');
                  }}
                  className="border-border/30 text-foreground hover:bg-savanna-charcoal/30 w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                  onClick={() => archiveStudioMutation.mutate()}
                  disabled={archiveConfirmText !== 'ARCHIVE' || archiveStudioMutation.isPending}
                  className="bg-error text-white hover:bg-error/90 disabled:opacity-50 w-full sm:w-auto"
              >
                {archiveStudioMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Archiving...
                    </>
                ) : (
                    'Archive Studio'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  );
};

export default SettingsTab;

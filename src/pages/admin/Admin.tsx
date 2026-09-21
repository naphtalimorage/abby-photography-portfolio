// src/pages/admin/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Upload,
  LogOut,
  Bell,
  Home,
  Menu,
  X
} from 'lucide-react';
import { MdPhotoLibrary, MdAutoAwesome, MdVideoLibrary } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/intergration/supabase/Client.ts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import components
import ThemeToggle from '@/components/common/ThemeToggle';

// Import tab components
import MediaLibraryTab from '@/components/adminPage/MediaLibraryTab';
import ServicesTab from '@/components/adminPage/ServicesTab';
import ReelsTab from '@/components/adminPage/ReelsTab';
import SettingsTab from '@/components/adminPage/SettingsTab';
import {UserAvatar} from "@/components/common/UserAvatar.tsx";
import {useAdminProfile} from "@/hooks/UseAdminProfile.ts";

const navItems = [
  { icon: MdPhotoLibrary, label: 'Media Library', value: 'media' },
  { icon: MdAutoAwesome, label: 'Services', value: 'services' },
  { icon: MdVideoLibrary, label: 'Reels', value: 'reels' },
  { icon: Settings, label: 'Settings', value: 'settings' }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('media');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { data: profile, isLoading } = useAdminProfile();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserEmail(user.email ?? null);
    });
  }, []);

  // Lock body scroll when Mobile Menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile Menu on tab change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (err: any) {
      toast.error(err.message || 'Failed to sign out');
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsMobileMenuOpen(false);
  };

  // ✅ SidebarContent now returns a fragment – no extra wrapper
  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
      <>
        <div className="px-5 md:px-6 pt-0 lg:pt-6 mb-6">
          <div className="flex items-center justify-between lg:mb-4">
            {!isMobile && (
                <div className="flex items-center gap-2">
                            <span className="font-display text-sm text-foreground uppercase tracking-tight font-semibold">
                                Abby
                            </span>
                  <span className="font-display text-sm italic text-savanna-gold uppercase tracking-tight">
                                Studio
                            </span>
                </div>
            )}

            {/* Theme Toggle - Desktop only */}
            {!isMobile && <ThemeToggle />}
          </div>

          {/* Quick Links */}
          <div className="flex items-center justify-between gap-2 pt-4 border-t border-border/30">
            <Link
                to="/"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-savanna-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="w-3 h-3" />
              <span>View Site</span>
            </Link>

            {/* Theme Toggle - Mobile only */}
            {isMobile && <ThemeToggle />}
          </div>
        </div>

        <nav className="flex-1 px-3 md:px-2 overflow-y-auto">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.value;
            return (
                <button
                    key={index}
                    onClick={() => handleTabChange(item.value)}
                    className={`w-full flex items-center gap-3 px-4 py-4 md:py-3 rounded-md mb-1 transition-all ${
                        isActive
                            ? 'bg-savanna-gold/20 text-savanna-gold border-l-2 border-savanna-gold'
                            : 'text-muted-foreground hover:bg-savanna-charcoal/30 hover:text-foreground'
                    }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                  {isActive && (
                      <motion.div
                          layoutId="activeTabIndicator"
                          className="ml-auto w-1.5 h-1.5 bg-savanna-gold rounded-full flex-shrink-0"
                      />
                  )}
                </button>
            );
          })}
        </nav>

        <div className="mt-auto px-4 pb-6 space-y-4">
          {/* Notifications */}
          <button className="w-full flex items-center justify-between px-4 py-3 text-muted-foreground hover:text-savanna-gold hover:bg-savanna-charcoal/30 transition-all rounded-md relative">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">Notifications</span>
            </div>
            <span className="w-2 h-2 bg-savanna-gold rounded-full animate-pulse flex-shrink-0" />
          </button>

          {/* Upload Button */}
          <button className="w-full py-4 bg-savanna-gold text-savanna-charcoal text-sm tracking-wide font-medium hover:bg-savanna-gold/90 transition-all flex items-center justify-center gap-2 active:scale-95 rounded-md">
            <Upload className="w-4 h-4 flex-shrink-0" />
            Quick Upload
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 p-4 md:p-3 bg-savanna-charcoal/30 rounded-md border border-border/30">
            <UserAvatar size="md" fallbackText={userEmail?.[0] || 'A'} />
            <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-foreground block truncate">
                            {isLoading ? 'Loading...' : (profile?.full_name || 'Admin User')}
                        </span>
              <span className="text-xs text-savanna-gold truncate block">
                            {userEmail || 'Senior Editor'}
                        </span>
            </div>
            <button
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-red-500 transition-colors p-1 shrink-0"
                aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </>
  );

  return (
      <div className="min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 fixed left-0 top-0 h-screen bg-surface-container border-r border-border/30 flex-col z-50">
          <SidebarContent />
        </aside>

        {/* Mobile Top Bar */}
        <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/30">
          <div className="flex items-center justify-between h-16 px-5">
            <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="w-10 h-10 flex items-center justify-center text-foreground hover:text-savanna-gold transition-colors active:scale-90 min-h-[44px] min-w-[44px]"
                aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
                        <span className="font-display text-sm text-foreground uppercase tracking-tight font-semibold">
                            Senet
                        </span>
              <span className="font-display text-sm italic text-savanna-gold uppercase tracking-tight">
                            Studio
                        </span>
            </div>

            <ThemeToggle />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-savanna-gold/40 to-transparent" />
        </header>

        {/* Mobile Drawer */}
        <AnimatePresence mode="sync">
          {isMobileMenuOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden fixed inset-0 bg-savanna-charcoal/80 backdrop-blur-sm z-[60]"
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Drawer */}
                <motion.aside
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className="md:hidden fixed left-0 top-0 h-full w-[85%] max-w-sm bg-surface-container border-r border-savanna-gold/20 flex flex-col z-[70] shadow-2xl"
                >
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between p-5 border-b border-border/30 flex-shrink-0">
                    <div>
                      <h1 className="font-display text-lg text-foreground uppercase tracking-tight font-semibold">
                        Admin Studio
                      </h1>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                        Senet Portfolio Manager
                      </p>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-10 h-10 flex items-center justify-center border border-border/30 text-foreground hover:text-savanna-gold hover:border-savanna-gold transition-all active:scale-90 rounded-md"
                        aria-label="Close menu"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Drawer Content */}
                  <div className="flex-1 flex flex-col overflow-y-auto">
                    <SidebarContent isMobile />
                  </div>
                </motion.aside>
              </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="md:ml-64 min-h-screen pt-20 md:pt-0 px-4 sm:px-5 md:px-8 lg:px-12 py-5 md:py-12 lg:py-16">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full flex flex-col">
            <TabsList className="mb-8 hidden md:flex bg-muted/50 border border-border/50">
              <TabsTrigger value="media" className="data-[state=active]:bg-background data-[state=active]:text-foreground">Media Library</TabsTrigger>
              <TabsTrigger value="services" className="data-[state=active]:bg-background data-[state=active]:text-foreground">Services</TabsTrigger>
              <TabsTrigger value="reels" className="data-[state=active]:bg-background data-[state=active]:text-foreground">Reels</TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-background data-[state=active]:text-foreground">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="media" className="mt-0">
              <MediaLibraryTab />
            </TabsContent>

            <TabsContent value="services" className="mt-0">
              <ServicesTab />
            </TabsContent>

            <TabsContent value="reels" className="mt-0">
              <ReelsTab />
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <SettingsTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
  );
};

export default AdminDashboard;

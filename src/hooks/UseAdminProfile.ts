// src/hooks/useAdminProfile.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/intergration/supabase/Client';

export const useAdminProfile = () => {
    return useQuery({
        queryKey: ['admin-profile'],
        queryFn: async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            const { data, error } = await supabase
                .from('admin_users')
                .select('full_name, avatar_url')
                .eq('user_id', user.id)
                .maybeSingle();

            if (error) {
                console.error('Admin profile fetch error:', error);
                throw error;
            }
            console.log('Admin profile data:', data);
            return data;
        },
        staleTime: 30 * 1000, // 30 seconds - reduced to show updates faster
        retry: 1,
    });
};

// src/store/useProfileStore.ts
import { create } from 'zustand';

interface ProfileState {
  avatarUrl: string | null;
  displayName: string | null;
  setAvatar: (url: string) => void;
  setDisplayName: (name: string) => void;
  reset: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  avatarUrl: null,
  displayName: null,
  setAvatar: (url) => set({ avatarUrl: url }),
  setDisplayName: (name) => set({ displayName: name }),
  reset: () => set({ avatarUrl: null, displayName: null }),
}));

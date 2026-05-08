'use client';

import { useEffect, useState } from 'react';
import {
  getStoredUserProfile,
  normalizeUserProfile,
  PROFILE_STORAGE_KEY,
  PROFILE_UPDATED_EVENT,
  saveUserProfile,
} from '@/lib/profile-storage';
import { defaultUserProfile, type UserProfile } from '@/types/user-profile';

export function useCurrentUserProfile() {
  const [state, setState] = useState(() => {
    const storedProfile = getStoredUserProfile();

    return {
      profile: storedProfile ?? defaultUserProfile,
      isLoading: true,
    };
  });

  useEffect(() => {
    if (state.isLoading) {
      void fetch('/api/users/current')
        .then(async (response) => {
          if (!response.ok) {
            throw new Error('Failed to load profile');
          }

          const data = await response.json();
          const nextProfile = normalizeUserProfile(data.data);

          saveUserProfile(nextProfile);
          setState({
            profile: nextProfile,
            isLoading: false,
          });
        })
        .catch(() => {
          setState({
            profile: defaultUserProfile,
            isLoading: false,
          });
        });
    }

    const handleProfileUpdate = (event: Event) => {
      const nextProfile = (event as CustomEvent<UserProfile>).detail;
      setState({
        profile: normalizeUserProfile(nextProfile),
        isLoading: false,
      });
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key && event.key !== PROFILE_STORAGE_KEY) {
        return;
      }

      if (!event.newValue) {
        setState({
          profile: defaultUserProfile,
          isLoading: false,
        });
        return;
      }

      try {
        setState({
          profile: normalizeUserProfile(JSON.parse(event.newValue)),
          isLoading: false,
        });
      } catch {
        setState({
          profile: defaultUserProfile,
          isLoading: false,
        });
      }
    };

    window.addEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdate);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdate);
      window.removeEventListener('storage', handleStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}

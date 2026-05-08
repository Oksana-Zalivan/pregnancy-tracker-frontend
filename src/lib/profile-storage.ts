'use client';

import {
  defaultUserProfile,
  type BabySex,
  type UserProfile,
} from '@/types/user-profile';

export const PROFILE_STORAGE_KEY = 'user';
export const PROFILE_UPDATED_EVENT = 'profile-updated';

const allowedGenderValues = new Set<Exclude<BabySex, null>>(['girl', 'boy']);

export function normalizeUserProfile(value: unknown): UserProfile {
  const profile =
    value && typeof value === 'object' ? (value as Partial<UserProfile>) : {};

  const gender = allowedGenderValues.has(
    profile.gender as Exclude<BabySex, null>,
  )
    ? (profile.gender as Exclude<BabySex, null>)
    : null;

  return {
    name:
      typeof profile.name === 'string' && profile.name.trim()
        ? profile.name.trim()
        : defaultUserProfile.name,

    email:
      typeof profile.email === 'string' && profile.email.trim()
        ? profile.email.trim()
        : defaultUserProfile.email,

    gender,

    dueDate:
      typeof profile.dueDate === 'string' && profile.dueDate
        ? profile.dueDate
        : defaultUserProfile.dueDate,

    avatar:
      typeof profile.avatar === 'string' && profile.avatar.trim()
        ? profile.avatar
        : defaultUserProfile.avatar,
  };
}

export function getStoredUserProfile(): UserProfile | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawUser = window.localStorage.getItem(PROFILE_STORAGE_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return normalizeUserProfile(JSON.parse(rawUser));
  } catch {
    return null;
  }
}

export function saveUserProfile(profile: UserProfile) {
  if (typeof window === 'undefined') {
    return;
  }

  const normalizedProfile = normalizeUserProfile(profile);

  window.localStorage.setItem(
    PROFILE_STORAGE_KEY,
    JSON.stringify(normalizedProfile),
  );

  window.dispatchEvent(
    new CustomEvent(PROFILE_UPDATED_EVENT, {
      detail: normalizedProfile,
    }),
  );
}

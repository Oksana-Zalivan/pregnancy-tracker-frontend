"use client";

import { defaultUserProfile, type BabySex, type UserProfile } from "@/types/user-profile";

export const PROFILE_STORAGE_KEY = "user";
export const PROFILE_UPDATED_EVENT = "profile-updated";

const allowedBabySexValues = new Set<BabySex>(["unknown", "girl", "boy"]);

export function normalizeUserProfile(value: unknown): UserProfile {
  const profile =
    value && typeof value === "object" ? (value as Partial<UserProfile>) : {};

  return {
    name:
      typeof profile.name === "string" && profile.name.trim()
        ? profile.name.trim()
        : defaultUserProfile.name,
    email:
      typeof profile.email === "string" && profile.email.trim()
        ? profile.email.trim()
        : defaultUserProfile.email,
    babySex: allowedBabySexValues.has(profile.babySex as BabySex)
      ? (profile.babySex as BabySex)
      : defaultUserProfile.babySex,
    dueDate:
      typeof profile.dueDate === "string" && profile.dueDate
        ? profile.dueDate
        : defaultUserProfile.dueDate,
    avatarUrl:
      typeof profile.avatarUrl === "string" && profile.avatarUrl.trim()
        ? profile.avatarUrl
        : defaultUserProfile.avatarUrl,
  };
}

export function getStoredUserProfile(): UserProfile | null {
  if (typeof window === "undefined") {
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
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  window.dispatchEvent(
    new CustomEvent(PROFILE_UPDATED_EVENT, { detail: profile })
  );
}

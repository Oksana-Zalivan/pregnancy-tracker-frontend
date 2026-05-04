const defaultUserProfile = {
  name: "Ганна",
  email: "hanna@gmail.com",
  babySex: "unknown",
  dueDate: "2025-07-16",
  avatarUrl: "/images/placeholder-avatar.jpg",
};

let currentUser = { ...defaultUserProfile };

function normalizeUserProfile(profile = {}) {
  const nextBabySex = ["unknown", "girl", "boy"].includes(profile.babySex)
    ? profile.babySex
    : currentUser.babySex;

  return {
    name:
      typeof profile.name === "string" && profile.name.trim()
        ? profile.name.trim()
        : currentUser.name,
    email:
      typeof profile.email === "string" && profile.email.trim()
        ? profile.email.trim()
        : currentUser.email,
    babySex: nextBabySex,
    dueDate:
      typeof profile.dueDate === "string" && profile.dueDate
        ? profile.dueDate
        : currentUser.dueDate,
    avatarUrl:
      typeof profile.avatarUrl === "string" && profile.avatarUrl.trim()
        ? profile.avatarUrl
        : currentUser.avatarUrl,
  };
}

export function getCurrentUser() {
  return currentUser;
}

export function updateUserProfile(profile = {}) {
  currentUser = normalizeUserProfile(profile);
  return currentUser;
}

export async function updateUserAvatar(file) {
  if (!file) {
    return currentUser;
  }

  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  currentUser = {
    ...currentUser,
    avatarUrl: `data:${file.type};base64,${base64}`,
  };

  return currentUser;
}

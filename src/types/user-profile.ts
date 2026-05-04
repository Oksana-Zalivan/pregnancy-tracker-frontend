export type BabySex = "unknown" | "girl" | "boy";

export type UserProfile = {
  name: string;
  email: string;
  babySex: BabySex;
  dueDate: string;
  avatarUrl: string;
};

export const defaultUserProfile: UserProfile = {
  name: "Ганна",
  email: "hanna@gmail.com",
  babySex: "unknown",
  dueDate: "2025-07-16",
  avatarUrl: "/images/placeholder-avatar.jpg",
};

export const babySexOptions: Array<{ value: BabySex; label: string }> = [
  { value: "unknown", label: "Оберіть стать" },
  { value: "girl", label: "Дівчинка" },
  { value: "boy", label: "Хлопчик" },
];

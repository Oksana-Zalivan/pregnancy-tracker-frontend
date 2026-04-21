export type NavigationItem = {
  label: string;
  href: string;
};

export const navigationItems: NavigationItem[] = [
  { label: "Мій день", href: "/" },
  { label: "Подорож", href: "/journey/1" },
  { label: "Щоденник", href: "/diary" },
  { label: "Профіль", href: "/profile" },
];

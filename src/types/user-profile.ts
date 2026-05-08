export type BabySex = 'girl' | 'boy' | 'unknown';

export type UserProfile = {
  name: string;
  email: string;
  gender: BabySex;
  dueDate: string | null;
  avatar: string;
};

export const defaultUserProfile: UserProfile = {
  name: 'Ганна',
  email: 'hanna@gmail.com',
  gender: 'unknown',
  dueDate: '2025-07-16',
  avatar: '/images/placeholder-avatar.jpg',
};

export const babySexOptions: Array<{
  value: '' | 'girl' | 'boy';
  label: string;
}> = [
  { value: '', label: 'Оберіть стать' },
  { value: 'girl', label: 'Дівчинка' },
  { value: 'boy', label: 'Хлопчик' },
];

export type ThemeType = 'girl' | 'boy' | 'neutral';
export type GenderType = 'girl' | 'boy' | null;

export function applyTheme(gender: GenderType) {
  let theme: ThemeType = 'neutral';

  if (gender === 'girl') {
    theme = 'girl';
  }

  if (gender === 'boy') {
    theme = 'boy';
  }

  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

export function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'neutral';

  document.documentElement.setAttribute('data-theme', savedTheme);
}

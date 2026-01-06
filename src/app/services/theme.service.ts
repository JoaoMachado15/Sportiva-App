import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  constructor() {
    this.loadTheme();
  }

  private loadTheme() {
    const stored = localStorage.getItem('dark-mode');

    if (stored === null) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDarkTheme(prefersDark);
      return;
    }

    this.setDarkTheme(stored === 'true');
  }

  setDarkTheme(isDark: boolean) {
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('dark-mode', String(isDark));
  }

  isDarkMode(): boolean {
    return document.body.classList.contains('dark');
  }
}

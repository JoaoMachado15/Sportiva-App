import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  constructor() {
    this.loadTheme();
  }

  private loadTheme() {
    const stored = localStorage.getItem('dark-mode');

    // 🔥 Nunca seguir o browser
    // Primeira vez → light mode
    if (stored === null) {
      this.setDarkTheme(false);
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

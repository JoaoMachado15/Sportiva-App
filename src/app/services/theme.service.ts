import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  constructor() {
    this.loadTheme();
  }

  private loadTheme() {
    const stored = localStorage.getItem('dark-mode');
    const isDark = stored === 'true';

    document.body.classList.toggle('dark', isDark);
  }

  setDarkTheme(isDark: boolean) {
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('dark-mode', String(isDark));
  }

  isDarkMode(): boolean {
    return document.body.classList.contains('dark');
  }
}

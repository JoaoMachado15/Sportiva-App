import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonToggle,
} from '@ionic/angular/standalone';

import { ThemeService } from '../services/theme.service';

@Component({
  standalone: true,
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonToggle,
  ],
})
export class SettingsPage {
  darkMode = false;

  constructor(private themeService: ThemeService) {}

  ionViewWillEnter() {
    this.darkMode = this.themeService.isDarkMode();
  }

  toggleTheme(event: CustomEvent) {
    this.themeService.setDarkTheme(event.detail.checked);
  }
}

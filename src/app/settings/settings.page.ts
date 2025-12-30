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
  IonButton,

  IonListHeader,
  NavController,
  AlertController,
} from '@ionic/angular/standalone';

import { ThemeService } from '../services/theme.service';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../core/storage.service';

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
    IonButton,

    IonListHeader,
  ],
})
export class SettingsPage {
  darkMode = false;
  userEmail = '';

  constructor(
    private themeService: ThemeService,
    private auth: AuthService,
    private storage: StorageService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  async ionViewWillEnter() {
    this.darkMode = this.themeService.isDarkMode();

    const user = await this.auth.getCurrentUser();
    this.userEmail = user?.email ?? '—';
  }

  toggleTheme(event: CustomEvent) {
    this.themeService.setDarkTheme(event.detail.checked);
  }



  // ===== LOGOUT =====
  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Logout',
      message: 'Tens a certeza que queres terminar sessão?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Logout',
          role: 'destructive',
          handler: async () => {
            await this.auth.logout();
            this.navCtrl.navigateRoot('/login');
          },
        },
      ],
    });

    await alert.present();
  }
}

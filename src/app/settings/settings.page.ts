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
  NavController,
  AlertController,
} from '@ionic/angular/standalone';

import { ThemeService } from '../services/theme.service';
import { AuthService } from '../auth/auth.service';

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
  ],
})
export class SettingsPage {
  darkMode = false;

  constructor(
    private themeService: ThemeService,
    private auth: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.darkMode = this.themeService.isDarkMode();
  }

  toggleTheme(event: CustomEvent) {
    this.themeService.setDarkTheme(event.detail.checked);
  }

  
  // LOGOUT
  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Logout',
      message: 'Tens a certeza que queres terminar sessão?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
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

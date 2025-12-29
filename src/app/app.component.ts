import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { NavController, Platform } from '@ionic/angular';
import { ThemeService } from './services/theme.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private themeService: ThemeService,
    private auth: AuthService,
    private navCtrl: NavController
  ) {
    
    this.platform.ready().then(() => {
      this.init();
    });
  }

  async init() {
    const isAuth = await this.auth.isAuthenticated();
    const seenIntro = await this.auth.hasSeenIntro();

    if (isAuth) {
      this.navCtrl.navigateRoot('/tabs/dashboard');
    } else if (!seenIntro) {
      this.navCtrl.navigateRoot('/intro');
    } else {
      this.navCtrl.navigateRoot('/login');
    }
  }
}

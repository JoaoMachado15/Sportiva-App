import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonButton,
  NavController,
} from '@ionic/angular/standalone';

import { AuthService } from '../../auth/auth.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage {
  constructor(
    private auth: AuthService,
    private navCtrl: NavController
  ) {}

  async finishIntro() {
    await this.auth.setIntroSeen();
    this.navCtrl.navigateRoot('/register');
  }

  skip() {
    this.finishIntro();
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonSpinner,
  NavController,
  ToastController,
} from '@ionic/angular/standalone';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonSpinner,
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loading = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  async submit() {
    if (this.form.invalid) return;

    this.loading = true;
    const { email, password } = this.form.value;

    try {
      await this.auth.login(email!, password!);
      this.navCtrl.navigateRoot('/tabs/dashboard');
    } catch (err: any) {
      this.showToast(err.message || 'Erro ao fazer login');
    } finally {
      this.loading = false;
    }
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'top',
      color: 'danger',
    });
    await toast.present();
  }
}

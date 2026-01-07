import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

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
  selector: 'app-register',
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
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  loading = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  async submit() {
    if (this.form.invalid) return;

    const { name, email, password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.showToast('Passwords do not match');
      return;
    }

    this.loading = true;

    try {
      await this.auth.register(name!, email!, password!);
      this.navCtrl.navigateRoot('/tabs/dashboard');
    } catch (err: any) {
      this.showToast(err.message || 'Erro ao criar conta');
    } finally {
      this.loading = false;
    }
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
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

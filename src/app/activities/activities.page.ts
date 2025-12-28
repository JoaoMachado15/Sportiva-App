import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonButtons,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from '@ionic/angular/standalone';
import { ActivitiesService } from '../services/activities.service';
import { Activity } from '../models/activity.model';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
  ],
})
export class ActivitiesPage {
  activities: Activity[] = [];

  constructor(
    private service: ActivitiesService,
    private alertCtrl: AlertController
  ) {
    addIcons({ trashOutline });
  }

  ngOnInit() {
    this.service.activities.subscribe((data) => {
      this.activities = data;
    });
  }

  async confirmDelete(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Delete activity',
      message: 'Are you sure you want to delete this activity?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.service.delete(id);
          },
        },
      ],
    });

    await alert.present();
  }

  toggleFavorite(id: string) {
    this.service.toggleFavorite(id);
  }
}

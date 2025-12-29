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
  AlertController,
  ToastController,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { ActivitiesService } from '../services/activities.service';
import { Activity, SportType } from '../models/activity.model';
import { SPORTS } from '../constants/sports.constants';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';

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

  // MAPPER CENTRAL
  sportLabels: Record<SportType, string> = SPORTS.reduce(
    (acc, s) => ({ ...acc, [s.value]: s.label }),
    {} as Record<SportType, string>
  );

  constructor(
    private service: ActivitiesService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    addIcons({ addCircleOutline });
  }

  ngOnInit() {
    this.service.activities.subscribe((data) => {
      this.activities = data;
    });
  }

  async confirmDelete(
    activityId: string,
    sportLabel: string,
    slidingItem: IonItemSliding
  ) {
    const alert = await this.alertCtrl.create({
      header: 'Delete activity',
      message: `Are you sure you want to delete?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => slidingItem.close(),
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => this.deleteActivity(activityId, slidingItem),
        },
      ],
    });

    await alert.present();
  }

  private async deleteActivity(
    activityId: string,
    slidingItem: IonItemSliding
  ) {
    this.service.delete(activityId);
    slidingItem.close();

    const toast = await this.toastCtrl.create({
      message: 'Activity deleted',
      duration: 1500,
      position: 'top',
      cssClass: 'delete-toast',
    });

    await toast.present();
  }
}

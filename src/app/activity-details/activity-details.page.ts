import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBackButton,
  IonButtons,
  AlertController,
  ToastController,

} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';



import { ActivitiesService } from '../services/activities.service';
import { Activity } from '../models/activity.model';
import { SPORTS } from '../constants/sports.constants';



@Component({
  standalone: true,
  selector: 'app-activity-details',
  templateUrl: './activity-details.page.html',
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonBackButton,
    IonButtons,
  ],
})

export class ActivityDetailsPage {
  activity?: Activity;

  sportLabels = SPORTS.reduce(
    (acc, s) => ({ ...acc, [s.value]: s.label }),
    {} as Record<string, string>
  );

  constructor(
    private route: ActivatedRoute,
    private service: ActivitiesService,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
   
  }

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.activity = this.service.getById(id);
    }
  }

  // EDIT
  editActivity() {
    if (!this.activity) return;
    this.router.navigate(['/edit-activity', this.activity.id]);
  }

  // DELETE (CONFIRM)
  async confirmDelete() {
    if (!this.activity) return;

    const alert = await this.alertCtrl.create({
      header: 'Delete activity',
      message: `Are you sure you want to delete?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => this.deleteActivity(),
        },
      ],
    });

    await alert.present();
  }

  private async deleteActivity() {
    if (!this.activity) return;

    this.service.delete(this.activity.id);

    const toast = await this.toastCtrl.create({
      message: 'Activity deleted',
      duration: 2000,
      position: 'bottom',
      cssClass: 'delete-toast',
    });

    await toast.present();

    // volta à lista
    this.router.navigateByUrl('/tabs/activities');
  }
}


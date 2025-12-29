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
  IonButton,
  AlertController,
  ToastController,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ActivitiesService } from '../services/activities.service';
import { Activity } from '../models/activity.model';
import { SPORT_LABELS } from '../utils/sports-labels.util';
import {
  confirmDeleteAction,
  showDeleteToast,
} from '../utils/activity-actions.util';

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
    IonButton,
  ],
})
export class ActivityDetailsPage {
  activity?: Activity;
  sportLabels = SPORT_LABELS;

  constructor(
    private route: ActivatedRoute,
    private service: ActivitiesService,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.activity = this.service.getById(id);
    }
  }

  editActivity() {
    if (!this.activity) return;
    this.router.navigate(['/edit-activity', this.activity.id]);
  }

  async confirmDelete() {
    if (!this.activity) return;

    await confirmDeleteAction(this.alertCtrl, async () => {
      this.service.delete(this.activity!.id);
      await showDeleteToast(this.toastCtrl);
      this.router.navigateByUrl('/tabs/activities');
    });
  }
}

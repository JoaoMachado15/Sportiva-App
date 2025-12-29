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
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
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
    private service: ActivitiesService
  ) {}

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.activity = this.service.getById(id);
    }
  }
}

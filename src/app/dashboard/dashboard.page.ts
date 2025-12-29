import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ActivitiesService } from '../services/activities.service';
import { Activity } from '../models/activity.model';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  ],
})
export class DashboardPage {
  totalActivities = 0;
  totalMinutes = 0;
  favorites = 0;
  thisMonth = 0;

  constructor(private service: ActivitiesService) {}

  ngOnInit() {
    this.service.activities.subscribe((activities) => {
      this.calculateSummary(activities);
    });
  }

  private calculateSummary(activities: Activity[]) {
    this.totalActivities = activities.length;

    this.totalMinutes = activities.reduce(
      (sum, a) => sum + a.duration,
      0
    );

    this.favorites = activities.filter(a => a.favorite).length;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    this.thisMonth = activities.filter(a => {
      const date = new Date(a.date);
      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    }).length;
  }
}

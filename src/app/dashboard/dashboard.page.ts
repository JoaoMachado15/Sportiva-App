import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from '@ionic/angular/standalone';

import { ActivitiesService } from '../services/activities.service';
import { Activity, SportType } from '../models/activity.model';
import { SPORTS } from '../constants/sports.constants';

import {
  getTotalActivities,
  getTotalFavorites,
  getTotalMinutes,
  getAverageMinutes,
} from './dashboard-metrics.util';

import { buildSportChart } from './dashboard-chart.util';
import Chart from 'chart.js/auto';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
  ],
})
export class DashboardPage {
  @ViewChild('sportChart') chartRef!: ElementRef<HTMLCanvasElement>;

  activities: Activity[] = [];
  chart?: Chart;

  sportLabels: Record<SportType, string> = SPORTS.reduce(
    (acc, s) => ({ ...acc, [s.value]: s.label }),
    {} as Record<SportType, string>
  );

  constructor(private service: ActivitiesService) {}

  ionViewWillEnter() {
    this.service.activities.subscribe(data => {
      this.activities = data;

      setTimeout(() => {
        if (this.chartRef) {
          this.chart = buildSportChart(
            this.chartRef.nativeElement,
            this.activities,
            this.sportLabels,
            this.chart
          );
        }
      }, 0);
    });
  }

  // === METRICS (delegadas) ===

  get totalActivities() {
    return getTotalActivities(this.activities);
  }

  get totalFavorites() {
    return getTotalFavorites(this.activities);
  }

  get totalMinutes() {
    return getTotalMinutes(this.activities);
  }

  get totalHours() {
    return (this.totalMinutes / 60).toFixed(1);
  }

  get averageMinutes() {
    return getAverageMinutes(this.activities);
  }
}

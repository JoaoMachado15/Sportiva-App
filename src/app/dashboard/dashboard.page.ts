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
  getMostPracticedSport,
  getWeeklyMinutes,
} from '../utils/activity-metrics.util';

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
  @ViewChild('sportChart')
  sportChartRef!: ElementRef<HTMLCanvasElement>;

  activities: Activity[] = [];
  sportChart?: Chart;

  sportLabels: Record<SportType, string> = SPORTS.reduce(
    (acc, s) => ({ ...acc, [s.value]: s.label }),
    {} as Record<SportType, string>
  );

  constructor(private service: ActivitiesService) {}

  ionViewWillEnter() {
    this.service.activities.subscribe((data) => {
      this.activities = data;

      setTimeout(() => {
        if (this.sportChartRef) {
          this.sportChart = buildSportChart(
            this.sportChartRef.nativeElement,
            this.activities,
            this.sportLabels,
            this.sportChart
          );
        }
      });
    });
  }

  // ===== KPI METRICS =====
  get totalActivities(): number {
    return getTotalActivities(this.activities);
  }

  get totalFavorites(): number {
    return getTotalFavorites(this.activities);
  }

  get totalMinutes(): number {
    return getTotalMinutes(this.activities);
  }

  get totalHours(): string {
    return (this.totalMinutes / 60).toFixed(1);
  }

  get averageMinutes(): number {
    return getAverageMinutes(this.activities);
  }

  get mostPracticedSport(): string {
    const sport = getMostPracticedSport(this.activities);
    return sport ? this.sportLabels[sport] : '—';
  }

  // ===== WEEKLY PROGRESS =====
  weeklyGoalMinutes = 300;

  get weeklyMinutes(): number {
    return getWeeklyMinutes(this.activities);
  }

  get weeklyProgress(): number {
    return Math.min((this.weeklyMinutes / this.weeklyGoalMinutes) * 100, 100);
  }
}

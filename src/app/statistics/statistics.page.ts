import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  getTotalMinutes,
  getMostPracticedSport,
} from '../utils/activity-metrics.util';

import { filterActivitiesByPeriod } from '../utils/activity-period.util';
import { buildSportTimeChart } from '../dashboard/dashboard-chart.util';
import { buildActivitiesByMonthChart } from '../utils/statistics-chart.util';

import Chart from 'chart.js/auto';

type StatsPeriod = 'week' | 'month';

@Component({
  standalone: true,
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
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
export class StatisticsPage {
  @ViewChild('timeChart') timeChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('monthChart') monthChartRef!: ElementRef<HTMLCanvasElement>;

  activities: Activity[] = [];
  period: StatsPeriod = 'week';

  timeChart?: Chart;
  monthChart?: Chart;

  sportLabels: Record<SportType, string> = SPORTS.reduce(
    (acc, s) => ({ ...acc, [s.value]: s.label }),
    {} as Record<SportType, string>
  );

  constructor(private service: ActivitiesService) {}

  ionViewWillEnter() {
    this.service.activities.subscribe((data) => {
      this.activities = data;
      setTimeout(() => this.buildCharts());
    });
  }

  onPeriodChange(event: any) {
    this.period = event.detail.value;
    setTimeout(() => this.buildCharts());
  }

  // ===== FILTERED ACTIVITIES =====
  get periodActivities(): Activity[] {
    return filterActivitiesByPeriod(this.activities, this.period);
  }

  // ===== CHARTS =====
  private buildCharts() {
    if (this.timeChartRef) {
      this.timeChart = buildSportTimeChart(
        this.timeChartRef.nativeElement,
        this.periodActivities,
        this.sportLabels,
        this.timeChart
      );
    }

    if (this.monthChartRef) {
      this.monthChart = buildActivitiesByMonthChart(
        this.monthChartRef.nativeElement,
        this.periodActivities,
        this.monthChart
      );
    }
  }

  // ===== KPIs =====
  get totalActivities(): number {
    return getTotalActivities(this.periodActivities);
  }

  get totalHours(): string {
    return (getTotalMinutes(this.periodActivities) / 60).toFixed(1);
  }

  get mostPracticedSport(): string {
    const sport = getMostPracticedSport(this.periodActivities);
    return sport ? this.sportLabels[sport] : '—';
  }
}

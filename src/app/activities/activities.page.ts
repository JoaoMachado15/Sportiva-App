import { Router } from '@angular/router';
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
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

import { ActivitiesService } from '../services/activities.service';
import { Activity, SportType } from '../models/activity.model';
import { SPORT_LABELS } from '../utils/sports-labels.util';
import {
  filterActivities,
  ActivityFilter,
  sortActivities,
  ActivitySort,
} from './activities.utils';
import {
  confirmDeleteAction,
  showDeleteToast,
} from '../utils/activity-actions.util';

import { addIcons } from 'ionicons';
import { addCircleOutline, star, starOutline } from 'ionicons/icons';

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
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
  ],
})
export class ActivitiesPage {
  activities: Activity[] = [];
  filter: ActivityFilter = 'all';
  sort: ActivitySort = 'date-desc';
  selectedSport?: string;

  sports = Object.keys(SPORT_LABELS) as SportType[];

  sportLabels = SPORT_LABELS;

  constructor(
    private service: ActivitiesService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    addIcons({ addCircleOutline, star, starOutline });
  }

  ngOnInit() {
    this.service.activities.subscribe((data) => {
      this.activities = data;
    });
  }

  // ===== NAV =====

  openDetails(id: string) {
    this.router.navigate(['/tabs/activity', id]);
  }

  editActivity(id: string, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/tabs/edit-activity', id]);
  }

  toggleFavorite(id: string, event: Event) {
    event.stopPropagation();
    this.service.toggleFavorite(id);
  }

  // ===== DELETE =====

  async confirmDelete(activityId: string) {
    await confirmDeleteAction(this.alertCtrl, async () => {
      this.service.delete(activityId);
      await showDeleteToast(this.toastCtrl, 'top');
    });
  }

  // ===== FILTER =====

  get filteredActivities(): Activity[] {
    const filtered = filterActivities(
      this.activities,
      this.filter,
      this.selectedSport
    );

    return sortActivities(filtered, this.sort);
  }

  onFilterChange(event: any) {
    this.filter = event.detail.value;
    if (this.filter !== 'sport') {
      this.selectedSport = undefined;
    }
  }

  onSortChange(event: any) {
    this.sort = event.detail.value;
  }

  onSportChange(event: any) {
    this.selectedSport = event.detail.value;
  }
}

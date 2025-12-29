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
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { ActivitiesService } from '../services/activities.service';
import { Activity, SportType } from '../models/activity.model';
import { SPORTS } from '../constants/sports.constants';
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
  ],
})
export class ActivitiesPage {
  activities: Activity[] = [];
  showOnlyFavorites = false;

  // MAPPER CENTRAL
  sportLabels: Record<SportType, string> = SPORTS.reduce(
    (acc, s) => ({ ...acc, [s.value]: s.label }),
    {} as Record<SportType, string>
  );

  // injetar serviços no construtor
  constructor(
    private service: ActivitiesService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    addIcons({ addCircleOutline, star, starOutline });
  }

  //carregar atividades
  ngOnInit() {
    this.service.activities.subscribe((data) => {
      this.activities = data;
    });
  }

  //apagar atividade
  private async deleteActivity(activityId: string) {
    this.service.delete(activityId);

    const toast = await this.toastCtrl.create({
      message: 'Activity deleted',
      duration: 1500,
      position: 'top',
      cssClass: 'delete-toast',
    });

    await toast.present();
  }

  //confirmar apagar atividade
  async confirmDelete(activityId: string) {
    const alert = await this.alertCtrl.create({
      header: 'Delete activity',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => this.deleteActivity(activityId),
        },
      ],
    });

    await alert.present();
  }

  //tirar ou colocar favorito
  toggleFavorite(activityId: string, event: Event) {
    event.stopPropagation(); // impede abrir details

    this.service.toggleFavorite(activityId);
  }

  //nav para acitivity-details
  openDetails(activityId: string) {
    this.router.navigate(['/tabs/activity', activityId]);
  }

  //nav para editar
  editActivity(activityId: string, event: Event) {
    event.stopPropagation(); // impede abrir details
    this.router.navigate(['/edit-activity', activityId]);
  }

  //filtrar por favoritos
  filter: 'all' | 'favorites' = 'all';

  get filteredActivities(): Activity[] {
    if (this.filter === 'favorites') {
      return this.activities.filter((a) => a.favorite);
    }
    return this.activities;
  }

  //mudar filtro
  onFilterChange(event: any) {
    this.filter = event.detail.value;
  }

  //alternar filtro favoritos
  toggleFavoritesFilter() {
    this.showOnlyFavorites = !this.showOnlyFavorites;
  }
}

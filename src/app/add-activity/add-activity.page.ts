import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonDatetime,
  IonInput,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuid } from 'uuid';

import { ActivitiesService } from '../services/activities.service';
import { ActivityIntensity, SportType } from '../models/activity.model';
import { SPORTS } from '../constants/sports.constants';

@Component({
  standalone: true,
  selector: 'app-add-activity',
  templateUrl: './add-activity.page.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonDatetime,
    IonInput,
    IonBackButton,
    IonButtons,
  ],
})
export class AddActivityPage {
  sports = SPORTS;

  isEdit = false;
  activityId!: string;

  form = this.fb.nonNullable.group({
    sport: ['running' as SportType, Validators.required],
    duration: [0, Validators.required],
    date: [new Date().toISOString(), Validators.required],
    location: [''],
    intensity: ['moderate' as ActivityIntensity, Validators.required],
    notes: [''],
  });

  constructor(
    private fb: FormBuilder,
    private service: ActivitiesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.activityId = id;

      const activity = this.service.getById(id);
      if (activity) {
        this.form.patchValue(activity);
      }
    }
  }

  submit() {
    if (this.form.invalid) return;

    const data = this.form.getRawValue();

    if (this.isEdit) {
      this.service.update({
        id: this.activityId,
        favorite: false,
        ...data,
      });
    } else {
      this.service.add({
        id: uuid(),
        favorite: false,
        ...data,
      });
    }

    this.router.navigateByUrl('/tabs/activities');
  }
}

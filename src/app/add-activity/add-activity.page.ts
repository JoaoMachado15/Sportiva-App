import { Activity } from '../models/activity.model';

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonDatetime,
} from '@ionic/angular/standalone';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivitiesService } from '../services/activities.service';
import { v4 as uuid } from 'uuid';
import { ActivityIntensity } from '../models/activity.model';

@Component({
  standalone: true,
  selector: 'app-add-activity',
  templateUrl: './add-activity.page.html',
  imports: [
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonDatetime,
  ],
})
export class AddActivityPage {
  isEdit = false;
  activityId!: string;

  form = this.fb.nonNullable.group({
    sport: ['', Validators.required],
    duration: [0, Validators.required],
    date: ['', Validators.required],
    location: [''],
    intensity: ['moderate' as ActivityIntensity, Validators.required],
    notes: [''],
  });

  constructor(
    private fb: FormBuilder,
    private service: ActivitiesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
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

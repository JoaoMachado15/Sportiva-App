import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Activity } from '../models/activity.model';

const STORAGE_KEY = 'activities';

@Injectable({ providedIn: 'root' })
export class ActivitiesService {
  private activities$ = new BehaviorSubject<Activity[]>(this.getAll());

  get activities() {
    return this.activities$.asObservable();
  }

  private emit() {
    this.activities$.next(this.getAll());
  }

  getAll(): Activity[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveAll(activities: Activity[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    this.emit();
  }

  add(activity: Activity) {
    const activities = this.getAll();
    activities.push(activity);
    this.saveAll(activities);
  }

  delete(id: string) {
    const activities = this.getAll().filter(a => a.id !== id);
    this.saveAll(activities);
  }

  toggleFavorite(id: string) {
    const activities = this.getAll().map(a =>
      a.id === id ? { ...a, favorite: !a.favorite } : a
    );
    this.saveAll(activities);
  }

  getById(id: string) {
    return this.getAll().find(a => a.id === id);
  }

  update(updated: Activity) {
    const activities = this.getAll().map(a =>
      a.id === updated.id ? updated : a
    );
    this.saveAll(activities);
  }
}

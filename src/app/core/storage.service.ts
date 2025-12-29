import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage!: Storage;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // SET
  async set(key: string, value: any): Promise<void> {
    await this._storage?.set(key, value);
  }

  // GET
  async get<T>(key: string): Promise<T | null> {
    return await this._storage?.get(key);
  }

  // REMOVE
  async remove(key: string): Promise<void> {
    await this._storage?.remove(key);
  }

  // CLEAR (usar com cuidado)
  async clear(): Promise<void> {
    await this._storage?.clear();
  }
}

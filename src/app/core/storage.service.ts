import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage!: Storage;
  private readyPromise: Promise<void>;

  constructor(private storage: Storage) {
    this.readyPromise = this.init();
  }

  private async init(): Promise<void> {
    this._storage = await this.storage.create();
  }

  // GARANTE que o storage está pronto
  async ready(): Promise<void> {
    return this.readyPromise;
  }

  // SET
  async set<T>(key: string, value: T): Promise<void> {
    await this.ready();
    await this._storage.set(key, value);
  }

  // GET
  async get<T>(key: string): Promise<T | null> {
    await this.ready();
    return this._storage.get(key);
  }

  // REMOVE
  async remove(key: string): Promise<void> {
    await this.ready();
    await this._storage.remove(key);
  }

  // CLEAR
  async clear(): Promise<void> {
    await this.ready();
    await this._storage.clear();
  }
}

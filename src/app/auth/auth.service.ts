import { Injectable } from '@angular/core';
import { StorageService } from '../core/storage.service';
import { User, Session } from './auth.types';

const USERS_KEY = 'users';
const SESSION_KEY = 'session';
const INTRO_KEY = 'intro_seen';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storage: StorageService) {}

  // ---------- USERS ----------

  private async getUsers(): Promise<User[]> {
    return (await this.storage.get<User[]>(USERS_KEY)) || [];
  }

  private async saveUsers(users: User[]): Promise<void> {
    await this.storage.set(USERS_KEY, users);
  }

  // ---------- REGISTER ----------

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const users = await this.getUsers();

    const exists = users.find(u => u.email === email);
    if (exists) {
      throw new Error('Email já registado');
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await this.saveUsers(users);

    // auto-login após registo
    await this.createSession(newUser);

    return newUser;
  }

  // ---------- LOGIN ----------

  async login(email: string, password: string): Promise<User> {
    const users = await this.getUsers();

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    await this.createSession(user);
    return user;
  }

  // ---------- SESSION ----------

  private async createSession(user: User): Promise<void> {
    const session: Session = {
      user,
      token: crypto.randomUUID(),
      loggedAt: new Date().toISOString(),
    };

    await this.storage.set(SESSION_KEY, session);
  }

  async logout(): Promise<void> {
    await this.storage.remove(SESSION_KEY);
  }

  async getSession(): Promise<Session | null> {
    return await this.storage.get<Session>(SESSION_KEY);
  }

  async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();
    return !!session;
  }

  async getCurrentUser(): Promise<User | null> {
    const session = await this.getSession();
    return session?.user || null;
  }

  // ---------- INTRO / ONBOARDING ----------

  async hasSeenIntro(): Promise<boolean> {
    return (await this.storage.get<boolean>(INTRO_KEY)) ?? false;
  }

  async setIntroSeen(): Promise<void> {
    await this.storage.set(INTRO_KEY, true);
  }
}

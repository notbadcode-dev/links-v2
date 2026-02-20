import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';

export interface IUser {
  email: string;
}

const USER_STORAGE_KEYS = {
  EMAIL: 'links_v2.user.email',
} as const;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public readonly user: Signal<IUser> = computed(() => this._state());
  public readonly email: Signal<string> = computed(() => this._state().email);

  private readonly _state: WritableSignal<IUser> = signal<IUser>(this._getInitialState());

  public setUser(user: IUser): void {
    const normalizedUser: IUser = {
      email: user.email.trim(),
    };

    this._state.set(normalizedUser);
    localStorage.setItem(USER_STORAGE_KEYS.EMAIL, normalizedUser.email);
  }

  public clear(): void {
    this._state.set({
      email: '',
    });
    localStorage.removeItem(USER_STORAGE_KEYS.EMAIL);
  }

  private _getInitialState(): IUser {
    const email = localStorage.getItem(USER_STORAGE_KEYS.EMAIL) ?? '';
    return {
      email,
    };
  }
}

import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { UserProfile } from '../models/types';

const TOKEN_KEY = 'app_token';

function getStorage(): any /* Storage | null */ {
  try {
    const g: any = typeof globalThis !== 'undefined' ? globalThis : undefined;
    if (g && g.localStorage) {
      return g.localStorage as any;
    }
  } catch {}
  return null;
}

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Simplified auth handling with localStorage token. */
  private api = inject(ApiService);
  private user$ = new BehaviorSubject<UserProfile | null>(null);
  private storage = getStorage();

  // PUBLIC_INTERFACE
  get session$(): Observable<UserProfile | null> {
    /** Observable of current user session profile. */
    return this.user$.asObservable();
  }

  // PUBLIC_INTERFACE
  get isAuthenticated(): boolean {
    /** Returns boolean flag for session presence. */
    try {
      return !!this.storage?.getItem(TOKEN_KEY);
    } catch {
      return false;
    }
  }

  // PUBLIC_INTERFACE
  login(email: string, password: string): Observable<UserProfile> {
    /** Performs mock login and stores token. */
    return this.api.login(email, password).pipe(
      tap(() => { try { this.storage?.setItem(TOKEN_KEY, 'mock_token'); } catch {} }),
      tap(user => this.user$.next(user))
    );
  }

  // PUBLIC_INTERFACE
  logout() {
    /** Clears token and user state. */
    try { this.storage?.removeItem(TOKEN_KEY); } catch {}
    this.user$.next(null);
  }

  // PUBLIC_INTERFACE
  loadProfile(): Observable<UserProfile> {
    /** Loads user profile from API. */
    return this.api.getProfile().pipe(tap(user => this.user$.next(user)));
  }

  // PUBLIC_INTERFACE
  updateProfile(profile: Partial<UserProfile>): Observable<UserProfile> {
    /** Updates user profile through API. */
    return this.api.updateProfile(profile).pipe(tap(user => this.user$.next(user)));
  }
}

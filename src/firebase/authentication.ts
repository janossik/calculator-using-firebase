import * as AuthFirebase from 'firebase/auth';
import { auth } from './index.ts';

class AuthUtils {
  auth: AuthFirebase.Auth;
  googleAuthProvider: AuthFirebase.GoogleAuthProvider;
  constructor(auth: AuthFirebase.Auth) {
    this.auth = auth;
    this.googleAuthProvider = new AuthFirebase.GoogleAuthProvider();
    this.init();
  }
  async signInWithGoogle() {
    await AuthFirebase.signInWithPopup(this.auth, this.googleAuthProvider);
  }
  async signOut() {
    await this.auth.signOut();
  }
  onAuthStateChanged(callback: (user: AuthFirebase.User | null) => void) {
    return this.auth.onAuthStateChanged(callback);
  }
  init() {
    this.googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
  }
}

export const authUtils = new AuthUtils(auth);

enum LocalStorageKeys {
  darkMode = 'dark',
  lightMode = 'light',
  mode = 'mode',
  lastLocation = 'lastLocation',
}

export class LocalStorageUtils {
  ls: Storage = localStorage;
  set(key: string, value: string) {
    this.ls.setItem(key, value);
  }
  get(key: string): string | null;
  get(key: string, defaultValue: string): string;
  get(key: string, defaultValue?: string) {
    const value = this.ls.getItem(key);
    if (defaultValue) {
      return value ?? defaultValue;
    }
    return value;
  }
  remove(key: string) {
    this.ls.removeItem(key);
  }
  clear() {
    this.ls.clear();
  }
  switchMode(currentMode?: string) {
    const mode = this.get(LocalStorageKeys.mode);
    if ((currentMode || mode) === LocalStorageKeys.lightMode) {
      this.set(LocalStorageKeys.mode, LocalStorageKeys.darkMode);
      return LocalStorageKeys.darkMode;
    } else {
      this.set(LocalStorageKeys.mode, LocalStorageKeys.lightMode);
      return LocalStorageKeys.lightMode;
    }
  }
  getMode() {
    const mode = this.get(LocalStorageKeys.mode);
    if (mode === LocalStorageKeys.darkMode) return LocalStorageKeys.darkMode;
    if (mode === LocalStorageKeys.lightMode) return LocalStorageKeys.lightMode;
    this.ls.setItem(LocalStorageKeys.mode, LocalStorageKeys.lightMode);
    return LocalStorageKeys.lightMode;
  }

  setLastLocation(location: string) {
    this.set(LocalStorageKeys.lastLocation, location);
  }

  getLastLocation(): string | null;
  getLastLocation(defaultValue: string): string;
  getLastLocation(defaultValue?: string) {
    const lastLocation = this.get(LocalStorageKeys.lastLocation);
    if (lastLocation) {
      return lastLocation;
    }
    return defaultValue || null;
  }
}

export const localStorageUtils = new LocalStorageUtils();

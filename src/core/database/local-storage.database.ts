export namespace LocalStorage {
  type StorageKeysType =
    | 'access_token'
    | 'refresh_token'
    | 'welcome'
    | 'language';
  function storageKeys(key: StorageKeysType) {
    return `Drilling.Storage.${key}`;
  }
  export function get<Value extends string | number | boolean | null = string>(
    key: StorageKeysType
  ): Value {
    const data = localStorage.getItem(storageKeys(key));
    return data as Value;
  }

  export function set(key: StorageKeysType, value: string) {
    localStorage.setItem(storageKeys(key), value);
  }

  export function clear() {
    localStorage.removeItem(storageKeys('access_token'));
    localStorage.removeItem(storageKeys('refresh_token'));
  }
}

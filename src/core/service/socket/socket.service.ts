import { Injectable } from '@angular/core';
import { Settings } from '@function/settings.function';
import { getStorageKeys } from '@function/storage-keys.function';
import { LocalStorage } from '@storage/local/local.storage';
import { Socket, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: Settings.baseUrl(),
  options: {
    extraHeaders: {
      Authorization: LocalStorage.get('access_token'),
    },
    // transportOptions: {
    //   polling: {
    //     extraHeaders: {
    //     },
    //   },
    // },
  },
};

@Injectable({
  providedIn: 'root',
})
export class SocketService extends Socket {
  constructor() {
    super(config);
  }
}

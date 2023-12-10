import { ipcMain, shell } from 'electron';

import * as crypto from 'crypto';
import moment from 'moment';

import { ModuleFunction } from '@app/app';
import { configStore } from '@app/stores/config';

export type AppControlAction = 'devtools' | 'minimize' | 'maximize' | 'close';

const GeneralModule: ModuleFunction = context => {
  // Control functions such as closing, maximizing, and minimizing windows
  ipcMain.on('appControl', async (_, action: AppControlAction) => {
    const { window } = context;

    if (!window) return;

    switch (action) {
      case 'devtools': {
        window.webContents.toggleDevTools();
        break;
      }

      case 'minimize': {
        window.minimize();
        break;
      }

      case 'maximize': {
        window.isMaximized() ? window.unmaximize() : window.maximize();
        break;
      }

      case 'close': {
        window.close();
        break;
      }
    }
  });

  // Open link
  ipcMain.on('openExternal', async (_, link) => {
    return shell.openExternal(link);
  });

  ipcMain.handle('getConfig', async () => {
    return configStore.store;
  });

  ipcMain.handle('setConfig', async (e, config) => {
    return (configStore.store = config);
  });
};

export default GeneralModule;

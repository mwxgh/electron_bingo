import { ipcMain } from 'electron';
import log from 'electron-log';

import * as crypto from 'crypto';
import moment from 'moment';

import { ModuleFunction } from '@app/app';
import { configStore } from '@app/stores/config';

export interface Log {
  size: number;
  path: string;
  lines: string[];
}

const DeveloperModule: ModuleFunction = () => {
  ipcMain.handle('getStorePath', async () => {
    return configStore.path;
  });

  ipcMain.handle('getLogs', async () => {
    const logs = log.transports.file.readAllLogs();

    return logs.map(item => ({
      size: log.transports.file.getFile().size,
      path: item.path,
      lines: item.lines.filter(Boolean),
    }));
  });

  ipcMain.handle('clearLogs', async () => {
    return log.transports.file.getFile().clear();
  });

  ipcMain.handle('checkHashCode', (_, hashCode) => {
    const currentDateTime = moment().format('MM_YYYY');
    const dataToHash = 'NOSAH_SAFETY' + '_' + currentDateTime;

    const md5 = crypto.createHash('md5').update(dataToHash).digest('hex');

    return md5 === hashCode;
  });
};

export default DeveloperModule;

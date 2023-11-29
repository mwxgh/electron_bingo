/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcMain } from 'electron'
import { IPC_ACTIONS } from './action'
import { checkAccessPermission, setWindowTitle } from './window/service'
import { importUserData } from './user/service'

const { SET_WINDOW_TITLE, CHECK_ACCESS_PERMISSION } = IPC_ACTIONS.window
const { IMPORT_USER } = IPC_ACTIONS.user

const ipcHandlers = [
  {
    event: SET_WINDOW_TITLE,
    callback: setWindowTitle,
  },
  {
    event: CHECK_ACCESS_PERMISSION,
    callback: checkAccessPermission,
  },
  {
    event: IMPORT_USER,
    callback: importUserData,
  },
]

export const registerIPCHandlers = () => {
  ipcHandlers.forEach((handler: { event: string; callback: any }) => {
    ipcMain.on(handler.event, handler.callback)
  })
}

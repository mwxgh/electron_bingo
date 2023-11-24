/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcMain } from 'electron'
import { IPC_ACTIONS } from './action'
import { setWindowTitle } from './window/service'
import { importUserData } from './user/service'

const { SET_WINDOW_TITLE } = IPC_ACTIONS.window
const { IMPORT_USER } = IPC_ACTIONS.user

const ipcHandlers = [
  {
    event: SET_WINDOW_TITLE,
    callback: setWindowTitle,
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

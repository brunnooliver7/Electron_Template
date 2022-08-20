const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain
require('electron-reload')(__dirname);

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    minWidth: 940,
    minHeight: 560,
    width: 1200,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  mainWindow.loadFile('src/index.html')
  mainWindow.setBackgroundColor('#343B48');

  ipc.on('minimizeApp', () => {
    mainWindow.minimize()
  })

  ipc.on('maximizeRestoreApp', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore()
    } else {
      mainWindow.maximize()
    }
  })

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('isMaximized')
  })

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('isRestored')
  })
  
  ipc.on('closeApp', () => {
    mainWindow.close()
  })
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
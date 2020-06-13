'use strict';
const path = require('path');
const fs = require('fs');
const {app, shell, Menu, BrowserWindow} = require('electron');
const appMenu = require('./menu');
const tray = require('./tray');
const config = require('./config');
const update = require('./update');

require('electron-debug')({enabled: true});
require('electron-dl')();
require('electron-context-menu')();

let mainWindow;
let isQuitting = false;

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
  }
});

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

function createMainWindow() {
  const lastWindowState = config.get('lastWindowState');
  const lastURL = config.get('lastURL');
  const maxWindowInteger = 2147483647;

  const win = new BrowserWindow({
    title: app.getName(),
    show: false,
    x: lastWindowState.x,
    y: lastWindowState.y,
    width: lastWindowState.width,
    height: lastWindowState.height,
    icon: process.platform === 'linux' && path.join(__dirname, 'static/Icon.png'),
    minWidth: 480,
    minHeight: 480,
    titleBarStyle: 'hiddenInset',
    autoHideMenuBar: true,
    backgroundColor: '#fff',
    webPreferences: {
      preload: path.join(__dirname, 'browser.js'),
      nodeIntegration: false,
      plugins: true
    },
    nodeIntegration: true
  });

  if (process.platform === 'darwin') {
    win.setSheetOffset(40);
  }

  win.loadURL(lastURL);

  win.on('close', event => {
    if (!isQuitting) {
      event.preventDefault();

      if (process.platform === 'darwin') {
        app.hide();
      } else {
        win.hide();
      }
    }
  });

  win.on('page-title-updated', event => {
    event.preventDefault();
  });

  win.on('enter-full-screen', () => {
    win.setMaximumSize(maxWindowInteger, maxWindowInteger);
  });

  win.webContents.on('did-navigate', (event, url) => {
    config.set('lastURL', url);
  });

  return win;
}

app.on('ready', () => {
  Menu.setApplicationMenu(appMenu);
  mainWindow = createMainWindow();
  tray.create(mainWindow);

  const page = mainWindow.webContents;

  page.on('dom-ready', () => {
    page.insertCSS(fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf8'));
    mainWindow.show();
  });

  page.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  update.init(Menu.getApplicationMenu());
  update.checkUpdate();
});

app.on('activate', () => {
  mainWindow.show();
});

app.on('before-quit', () => {
  isQuitting = true;

  if (!mainWindow.isFullScreen()) {
    config.set('lastWindowState', mainWindow.getBounds());
  }
});

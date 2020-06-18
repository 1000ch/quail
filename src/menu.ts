import os from 'os';
import {app, shell, dialog, Menu, MenuItemConstructorOptions} from 'electron';

const appName = app.getName();

const helpSubmenu: MenuItemConstructorOptions[] = [{
  label: `${appName} Website`,
  async click() {
    await shell.openExternal('https://github.com/1000ch/quail');
  }
}, {
  label: 'Report an Issue...',
  async click() {
    const body = `
<!-- Please succinctly describe your issue and steps to reproduce it. -->
-
${app.getName()} ${app.getVersion()}
Electron ${process.versions.electron}
${process.platform} ${process.arch} ${os.release()}`;

    await shell.openExternal(`https://github.com/1000ch/quail/issues/new?body=${encodeURIComponent(body)}`);
  }
}, {
  type: 'separator'
}, {
  role: 'toggleDevTools'
}];

if (process.platform !== 'darwin') {
  helpSubmenu.push({
    label: 'about',
    async click() {
      await dialog.showMessageBox({
        title: `About ${appName}`,
        message: `${appName} ${app.getVersion()}`,
        detail: 'Created by Shogo Sensui',
        buttons: []
      });
    }
  });
}

const darwinTemplate: MenuItemConstructorOptions[] = [{
  label: appName,
  submenu: [{
    role: 'about'
  }, {
    type: 'separator'
  }, {
    role: 'services',
    submenu: []
  }, {
    type: 'separator'
  }, {
    role: 'hide'
  }, {
    role: 'unhide'
  }, {
    type: 'separator'
  }, {
    role: 'quit'
  }]
}, {
  label: 'Edit',
  submenu: [{
    role: 'undo'
  }, {
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    role: 'cut'
  }, {
    role: 'copy'
  }, {
    role: 'paste'
  }, {
    role: 'delete'
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.reload();
      }
    }
  }, {
    type: 'separator'
  }, {
    role: 'togglefullscreen'
  }, {
    role: 'resetZoom'
  }, {
    role: 'zoomIn'
  }, {
    role: 'zoomOut'
  }]
}, {
  role: 'window',
  submenu: [{
    role: 'minimize'
  }, {
    role: 'close'
  }, {
    type: 'separator'
  }, {
    type: 'separator'
  }, {
    role: 'front'
  }, {
    role: 'togglefullscreen'
  }]
}, {
  role: 'help',
  submenu: helpSubmenu
}];

const otherTemplate: MenuItemConstructorOptions[] = [{
  label: 'File',
  submenu: [{
    role: 'quit'
  }]
}, {
  label: 'Edit',
  submenu: [{
    role: 'undo'
  }, {
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    role: 'cut'
  }, {
    role: 'copy'
  }, {
    role: 'paste'
  }, {
    role: 'delete'
  }, {
    type: 'separator'
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.reload();
      }
    }
  }, {
    type: 'separator'
  }, {
    role: 'togglefullscreen'
  }, {
    role: 'resetZoom'
  }, {
    role: 'zoomIn'
  }, {
    role: 'zoomOut'
  }]
}, {
  role: 'help',
  submenu: helpSubmenu
}];

const template = process.platform === 'darwin' ? darwinTemplate : otherTemplate;

export default Menu.buildFromTemplate(template);

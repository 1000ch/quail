import {resolve, dirname} from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import {
  app, Menu, Tray, type BrowserWindow,
} from 'electron';

const __dirname = dirname(fileURLToPath(import.meta.url));

let tray: Tray | undefined;

function create(window: BrowserWindow) {
  if (process.platform === 'darwin' || tray) {
    return;
  }

  const iconPath = resolve(__dirname, '../static/IconTray.png');

  const toggleWin = () => {
    if (window.isVisible()) {
      window.hide();
    } else {
      window.show();
    }
  };

  const contextMenu = Menu.buildFromTemplate([{
    label: 'Toggle',
    click() {
      toggleWin();
    },
  }, {
    type: 'separator',
  }, {
    role: 'quit',
  }]);

  tray = new Tray(iconPath);
  tray.setToolTip(`${app.getName()}`);
  tray.setContextMenu(contextMenu);
  tray.on('click', toggleWin);
}

const defaultObject = {create};
export default defaultObject;

'use strict';
const electron = require('electron');

module.exports.init = () => {
  if (process.platform !== 'darwin') {
    return;
  }

  electron.autoUpdater.on('checking-for-update', () => {
    console.log('checking-for-update');
  });

  electron.autoUpdater.on('update-available', () => {
    console.log('update-available');
  });

  electron.autoUpdater.on('update-not-available', () => {
    console.log('update-not-available');
  });

  electron.autoUpdater.on('update-downloaded', () => {
    console.log('update-downloaded');
  });

  const version = electron.app.getVersion();
  const feedURL = `https://hazel-imrgmeuzge.now.sh/update/${process.platform}/${version}`;
  electron.autoUpdater.setFeedURL(feedURL);
};

module.exports.checkUpdate = () => {
  if (process.platform !== 'darwin') {
    return;
  }

  electron.autoUpdater.checkForUpdates();
};

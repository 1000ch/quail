import Config from 'electron-config';

export default new Config({
  defaults: {
    zoomFactor: 1,
    lastWindowState: {
      width: 840,
      height: 840
    },
    baseURL: 'https://esa.io/',
    lastURL: 'https://esa.io/'
  }
});

import Store from 'electron-store';

export default new Store({
  defaults: {
    zoomFactor: 1,
    lastWindowState: {
      x: 0,
      y: 0,
      width: 840,
      height: 840,
    },
    baseURL: 'https://esa.io/',
    lastURL: 'https://esa.io/',
  },
});

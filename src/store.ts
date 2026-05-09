import Store from 'electron-store';

const store = new Store({
  defaults: {
    zoomFactor: 1,
    lastWindowState: {
      x: 0,
      y: 0,
      width: 840,
      height: 840,
    },
    baseUrl: 'https://esa.io/',
    lastUrl: 'https://esa.io/',
  },
});

export default store;

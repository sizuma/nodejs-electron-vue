
const Electron = require("electron");
const server = require("./server/index");

const electron = Electron.app;

const BrowserWindow = Electron.BrowserWindow;

let mainWindow;

electron.on('ready', () => {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    server.then(url => {
        mainWindow.loadURL(url);
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
        electron.quit();
    });
});
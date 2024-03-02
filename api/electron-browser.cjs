const { app, BrowserWindow } = require('electron');

function createWindow(url) {
    const win = new BrowserWindow({
        width: 450,
        height: 660,
        webPreferences: {
            nodeIntegration: false
        }
    });

    win.loadURL(url);
}

app.whenReady().then(() => {
    const url = process.argv[2];
    createWindow(url);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

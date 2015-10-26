var app = require('app');
var Tray = require('tray');
var Menu = require('menu');
var BrowserWindow = require('browser-window');

// Report crashes
require('crash-reporter').start();

var mainWindows = null;
var appIcon = null;

app.on('window-all-closed', function(){
	// OSX non chiude le app ma le sospende
	if(process.platform != 'darwin')
		app.quit();
});

app.on('ready', function(){
	// icona nell'area di notifica
	if(process.platform != 'win32'){
		appIcon = new Tray('whatsapp.png');

		var contextMenu = Menu.buildFromTemplate([
			{ label: 'Chiudi', click: function() { app.quit(); } }
		]);

		appIcon.setToolTip('Whatsapp Web Desktop.');
		appIcon.setContextMenu(contextMenu);

		appIcon.on('clicked', function(){
			mainWindows.restore();
			mainWindows.focus();
		});
	}

	mainWindows = new BrowserWindow({width:800, height:600, title: 'Whatsapp Web Desktop', 'auto-hide-menu-bar': true, icon: 'whatsapp.png'});

	mainWindows.loadUrl('file://' + __dirname + '/index.html');

	// Strumenti di debug
	//mainWindows.openDevTools();

	mainWindows.on('closed', function(){
		mainWindows = null;
	});
});

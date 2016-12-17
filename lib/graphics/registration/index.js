'use strict';

const fs = require('fs');
const path = require('path');
const app = require('express')();
const io = require('../../server').getIO();
const bundles = require('../../bundles');
const Replicant = require('../../replicant');
const injectScripts = require('../../util').injectScripts;
const registeredSockets = {};
const singleInstanceSocketIDs = new Replicant('singleInstanceSocketIDs', '_singleInstance', {
	defaultValue: {},
	persistent: false
});

// Figure out which urls we need to enforce single instance behavior on.
bundles.all().forEach(bundle => {
	registeredSockets[bundle.name] = {};

	bundle.graphics.forEach(graphic => {
		registeredSockets[bundle.name][graphic.url] = new Set();

		if (graphic.singleInstance) {
			singleInstanceSocketIDs.value[graphic.url] = null;
		}
	});
});

io.on('connection', socket => {
	socket.on('graphic:registerSocket', ({url, bundleName}, cb) => {
		// If the supplied URL is a singleInstance graphic...
		//     and if there's no socket registered for this URL yet, accept this socket,
		//     else reject the socket registration.
		// Else, always accept registration.
		if ({}.hasOwnProperty.call(singleInstanceSocketIDs.value, url)) {
			if (singleInstanceSocketIDs.value[url]) {
				cb(false);
			} else {
				singleInstanceSocketIDs.value[url] = socket.id;
				registeredSockets[bundleName][url].add(socket.id);
				cb(true);
				app.emit('graphicOccupied', url);
			}
		} else {
			// TODO: this throws an error if a graphic is added during runtime
			registeredSockets[bundleName][url].add(socket.id);
			cb(true);
		}
	});

	socket.on('isGraphicAvailable', (url, cb) => {
		cb(!singleInstanceSocketIDs.value[url]);
	});

	socket.on('killGraphic', url => {
		io.emit('graphic:killed', url);
	});

	socket.on('disconnect', () => {
		// Unregister the socket.
		for (const bundleName in registeredSockets) {
			if (!{}.hasOwnProperty.call(registeredSockets, bundleName)) {
				continue;
			}

			for (const graphicUrl in registeredSockets[bundleName]) {
				if (!{}.hasOwnProperty.call(registeredSockets[bundleName], graphicUrl)) {
					continue;
				}

				if (registeredSockets[bundleName][graphicUrl].has(socket.id)) {
					registeredSockets[bundleName][graphicUrl].delete(socket.id);
					break;
				}
			}
		}

		// If the socket that disconnected is registered under a singleInstance graphic,
		// mark that graphic as now being available.
		for (const url in singleInstanceSocketIDs.value) {
			if (!{}.hasOwnProperty.call(singleInstanceSocketIDs.value, url)) {
				continue;
			}

			if (socket.id === singleInstanceSocketIDs.value[url]) {
				singleInstanceSocketIDs.value[url] = null;
				app.emit('graphicAvailable', url);
				break;
			}
		}
	});
});

app.get('/instance/*', (req, res, next) => {
	const resName = req.path.split('/').slice(2).join('/');
	const fileLocation = path.resolve(__dirname, 'public/', resName);

	// Check if the file exists
	if (!fs.existsSync(fileLocation)) {
		next();
		return;
	}

	// If it's a HTML file, inject the graphic setup script and serve that
	// otherwise, send the file unmodified
	if (resName.endsWith('.html')) {
		injectScripts(fileLocation, 'graphic', {}, html => res.send(html));
	} else {
		res.sendFile(fileLocation);
	}
});

module.exports = app;

Object.defineProperty(module.exports, 'singleInstanceSocketIDs', {
	get() {
		return singleInstanceSocketIDs.value;
	}
});

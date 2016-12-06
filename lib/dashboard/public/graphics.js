document.addEventListener('DOMContentLoaded', () => {
	'use strict';

	const toast = document.getElementById('mainToast');

	// Set up graphics URL copy buttons
	Array.prototype.forEach.call(document.querySelectorAll('.js-copy[data-copy-type="graphic"]'), el => {
		const anchor = el.closest('.graphic').querySelector('a');
		let absUrl = anchor.href;

		if (window.ncgConfig.login.enabled && window.token) {
			absUrl += `?key=${window.token}`;

			// If login security is enabled, we must add the ?key to the <a> tag as well.
			anchor.href = absUrl;
		}

		el.setAttribute('data-clipboard-text', absUrl);
	});

	// Set up graphics refresh buttons & dialog
	const confirmRefreshDialog = document.querySelector('#confirmGraphicRefreshDialog');
	Array.prototype.forEach.call(document.querySelectorAll('.js-refresh'), el => {
		el.addEventListener('tap', () => {
			const graphicUrl = el.closest('.graphic').getAttribute('data-graphic-url');
			const bundleName = el.closest('.graphic').getAttribute('data-bundle-name');
			confirmRefreshDialog.querySelector('code').innerText = graphicUrl;
			confirmRefreshDialog.setAttribute('data-graphic-url', graphicUrl);
			confirmRefreshDialog.setAttribute('data-bundle-name', bundleName);
			confirmRefreshDialog.open();
		});
	});

	confirmRefreshDialog.addEventListener('iron-overlay-closed', e => {
		const closingReason = e.detail;
		if (!closingReason.confirmed) {
			return;
		}

		window.socket.emit('request_refreshGraphic', {
			graphicUrl: confirmRefreshDialog.getAttribute('data-graphic-url'),
			bundleName: confirmRefreshDialog.getAttribute('data-bundle-name')
		}, err => {
			if (err) {
				console.error(err);
				toast.text = 'Failed to refresh graphic, check console for error info.';
				toast.show();
				return;
			}

			toast.text = 'Graphic successfully refreshed.';
			toast.show();
		});
	});
});

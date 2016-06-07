<a name="0.8.0"></a>
# [0.8.0](https://github.com/nodecg/nodecg/compare/v0.7.7...v0.8.0) (2016-05-06)

**NOTICE:** This release relies on Node.js >= 6 and Chrome >= 49. **This means that as of right now, NodeCG graphics will not work in OBS1, XSplit, or CasparCG.** The only platform that can currently display NodeCG graphics is OBS Studio with the latest release of its Browser Source plugin.

### Bug Fixes

* **api:** throw error when `listenFor` handler is not a function([9804a84](https://github.com/nodecg/nodecg/commit/9804a84))
* **dashboard:** fix "Copy Url" buttons on graphics page([3ed107f](https://github.com/nodecg/nodecg/commit/3ed107f))
* **dashboard:** fix invalid javascript on standalone panels([fcba09b](https://github.com/nodecg/nodecg/commit/fcba09b))
* **panels:** panels are now served by filename rather than panel name([9f3e54b](https://github.com/nodecg/nodecg/commit/9f3e54b)), closes [#144](https://github.com/nodecg/nodecg/issues/144)
* **tests:** test standalone panels, ensure autodeps are enabled([366422d](https://github.com/nodecg/nodecg/commit/366422d))


### Code Refactoring

* **replicants:** use Proxy instead of Object.observe ([#163](https://github.com/nodecg/nodecg/issues/163))([05ec891](https://github.com/nodecg/nodecg/commit/05ec891))


### Features

* **rollbar:** add support for automatically reporting uncaught exceptions to Rollbar([80f0ea6](https://github.com/nodecg/nodecg/commit/80f0ea6))
  * [More info can be found in the Rollbar docs on nodecg.com](http://nodecg.com/tutorial-rollbar.html)
* **sounds:** add sounds feature, rename uploads to assets, add categories to assets([52a9045](https://github.com/nodecg/nodecg/commit/52a9045))
  * [More info can be found in the Sounds docs on nodecg.com](http://nodecg.com/tutorial-sounds.html)


### BREAKING CHANGES

* replicants: The order of Replicant `change` event arguments has been swapped. `newVal` is now the first argument, `oldVal` is the second argument. Be sure to update all of your `change` event handlers accordingly.

	To migrate, follow the example below:

	Before:

	```
	myRep.on('change', function (oldVal, newVal) {
		// do work
	});
	```

	After:

	```
	myRep.on('change', function (newVal, oldVal) {
		// do work
	});
	```
* replicants: The third Replicant `change` event argument has been changed. Previously it was `changes`, an array of Object.observe change records. It is now `operations`, an array of operation records in NodeCG's internal format. This format is likely to continue changing as we figure out what works best. Any further changes to this format will be considered breaking.
* replicants: WeakMap and Object.observe shims have been removed. This probably won't affect anyone, as any browser that supports Proxy also supports WeakMap, but be aware of it.
* panels: the routes for panels are now `/panel/:bundleName/:panelFile` as opposed to `/panel/:bundleName/:panelName`.

	Closes #144 

	To migrate, any relative URLs present in panels (or dialogs) that are in subfolders will need to be re-written to reflect the new path that the panel is being served from.

* uploads: uploads are now called assets, and their manifest format has changed.

	To migrate, [see the new Assets documentation on nodecg.com](http://nodecg.com/tutorial-assets.html).



<a name="0.7.8"></a>
## [0.7.8](https://github.com/nodecg/nodecg/compare/v0.7.7...v0.7.8) (2016-04-20)


### Bug Fixes

* **api:** throw error when handler is not a function ([9804a84](https://github.com/nodecg/nodecg/commit/9804a84))
* **dashboard:** fix "Copy Url" buttons on graphics page ([3ed107f](https://github.com/nodecg/nodecg/commit/3ed107f))
* **package:** fix docs:publish script ([d5d3160](https://github.com/nodecg/nodecg/commit/d5d3160))
* **replicants:** Remove observe-shim for object.observe bower component  ([490dd0e](https://github.com/nodecg/nodecg/commit/490dd0e))

<a name="0.7.7"></a>
## [0.7.7](https://github.com/nodecg/nodecg/compare/v0.7.6...v0.7.7) (2016-03-31)


### Bug Fixes

* **api:** fix API erroring on page load ([fec7793](https://github.com/nodecg/nodecg/commit/fec7793))



<a name="0.7.6"></a>
## [0.7.6](https://github.com/nodecg/nodecg/compare/v0.7.5...v0.7.6) (2016-03-31)


### Bug Fixes

* **dashboard:** fix "copy key" button on settings page ([9182534](https://github.com/nodecg/nodecg/commit/9182534))
* **dashboard:** fix panels appearing over the top of the loading spinner ([6529248](https://github.com/nodecg/nodecg/commit/6529248))
* **deps:** bump @nodecg/bundle-manager dep, forgot to in last release ([4580bd2](https://github.com/nodecg/nodecg/commit/4580bd2))
* **login:** improve reliability of login lib ([4e37a13](https://github.com/nodecg/nodecg/commit/4e37a13))
* **tests:** remove reference to wrench ([a9ea8d9](https://github.com/nodecg/nodecg/commit/a9ea8d9))

### Features

* **all:** update socket.io to 1.4.5, improves performance. ([59d12c2](https://github.com/nodecg/nodecg/commit/59d12c2))
* **dashboard:** add loading spinner to panels ([dbc0466](https://github.com/nodecg/nodecg/commit/dbc0466))
* **dashboard:** close the drawer panel when selecting an item ([decc77f](https://github.com/nodecg/nodecg/commit/decc77f))
* **dashboard:** emit `dialog-opened` event in a dialog's `document` when it opens ([bb527eb](https://github.com/nodecg/nodecg/commit/bb527eb))
* **dashboard:** show resolution on graphics page ([8ab9335](https://github.com/nodecg/nodecg/commit/8ab9335))



<a name="0.7.5"></a>
## [0.7.5](https://github.com/nodecg/nodecg/compare/v0.7.4...v0.7.5) (2016-03-13)


### Bug Fixes

* **dashboard:** don't apply background color to disabled paper-button elements when using builti ([a34fc9d](https://github.com/nodecg/nodecg/commit/a34fc9d))

### Features

* **api:** deprecate nearestElementWithAttribute, replace usage with element.closest() ([45b272c](https://github.com/nodecg/nodecg/commit/45b272c)), closes [#141](https://github.com/nodecg/nodecg/issues/141)
* **bundles:** Add configuration values allowing to disable bundle autodeps ([4a99774](https://github.com/nodecg/nodecg/commit/4a99774))
* **caching:** disable caching ([a70b9be](https://github.com/nodecg/nodecg/commit/a70b9be))
* **npm:** only install production dependencies for bundles ([be0e74c](https://github.com/nodecg/nodecg/commit/be0e74c))



<a name="0.7.4"></a>
## [0.7.4](https://github.com/nodecg/nodecg/compare/v0.7.3...v0.7.4) (2016-03-01)


### Bug Fixes

* **api:** fix trace logging for client-side message reception ([dc71366](https://github.com/nodecg/nodecg/commit/dc71366))
* **dashboard:** assign a more unique ID to the main paper-toast element ([00f5959](https://github.com/nodecg/nodecg/commit/00f5959))
* **dashboard:** remove default opacity style of disabled paper-button elements ([d6e5baa](https://github.com/nodecg/nodecg/commit/d6e5baa))
* **uploads:** fix case where changes to the first file caused duplication ([4e7a61f](https://github.com/nodecg/nodecg/commit/4e7a61f))

### Features

* **bundleConfig:** defaults from configschema.json are now automatically applied to nodecg.bundleCo ([a4e28fa](https://github.com/nodecg/nodecg/commit/a4e28fa))
* **uploads:** bundles can specify allowed file types via uploads.allowedTypes ([7a1a775](https://github.com/nodecg/nodecg/commit/7a1a775))
* **uploads:** debounce change events by 500ms ([91d151c](https://github.com/nodecg/nodecg/commit/91d151c))



<a name="0.7.3"></a>
## [0.7.3](https://github.com/nodecg/nodecg/compare/v0.7.2...v0.7.3) (2016-02-20)


### Bug Fixes

* **uploads:** prevent crash related to uninstalled bundles ([9d17dc3](https://github.com/nodecg/nodecg/commit/9d17dc3))

### Features

* **dashboard:** hide panel controls until mouseover ([7855a0b](https://github.com/nodecg/nodecg/commit/7855a0b))



<a name="0.7.2"></a>
## [0.7.2](https://github.com/nodecg/nodecg/compare/v0.7.1...v0.7.2) (2016-02-17)

### Style
* **all:** Use XO style (via eslint-config-xo) instead of jshint ([ff74d10](https://github.com/nodecg/nodecg/commit/ff74d10))

### Features

* **uploads:** add file upload system ([e109edf](https://github.com/nodecg/nodecg/commit/e109edf)), closes [#104](https://github.com/nodecg/nodecg/issues/104)



<a name="0.7.1"></a>
## [0.7.1](https://github.com/nodecg/nodecg/compare/v0.7.0...v0.7.1) (2016-01-30)




<a name="0.7.0"></a>
# [0.7.0](https://github.com/nodecg/nodecg/compare/v0.6.2...v0.7.0) (2016-01-19)




<a name="0.6.2"></a>
## [0.6.2](https://github.com/nodecg/nodecg/compare/v0.6.1...v0.6.2) (2015-09-30)




<a name="0.6.1"></a>
## [0.6.1](https://github.com/nodecg/nodecg/compare/v0.6.0...v0.6.1) (2015-07-30)




<a name="0.5.1"></a>
## [0.5.1](https://github.com/nodecg/nodecg/compare/v0.5.0...v0.5.1) (2015-02-19)




<a name="0.4.8"></a>
## [0.4.8](https://github.com/nodecg/nodecg/compare/v0.4.7...v0.4.8) (2015-02-16)




<a name="0.4.6"></a>
## [0.4.6](https://github.com/nodecg/nodecg/compare/v0.4.5...v0.4.6) (2015-02-14)




<a name="0.4.3"></a>
## [0.4.3](https://github.com/nodecg/nodecg/compare/v0.4.2...v0.4.3) (2015-01-20)




<a name="0.4.2"></a>
## [0.4.2](https://github.com/nodecg/nodecg/compare/v0.4.1...v0.4.2) (2015-01-19)




<a name="0.4.1"></a>
## [0.4.1](https://github.com/nodecg/nodecg/compare/v0.4.0...v0.4.1) (2015-01-19)




<a name="0.3.0"></a>
# [0.3.0](https://github.com/nodecg/nodecg/compare/v0.2.1...v0.3.0) (2014-12-18)




<a name="0.2.1"></a>
## [0.2.1](https://github.com/nodecg/nodecg/compare/v0.2.0...v0.2.1) (2014-11-16)




<a name="0.2.0"></a>
# [0.2.0](https://github.com/nodecg/nodecg/compare/v0.1.3...v0.2.0) (2014-11-16)




<a name="0.1.3"></a>
## [0.1.3](https://github.com/nodecg/nodecg/compare/v0.1.2...v0.1.3) (2014-11-09)




<a name="0.1.2"></a>
## [0.1.2](https://github.com/nodecg/nodecg/compare/v0.1.1...v0.1.2) (2014-11-05)




<a name="0.1.1"></a>
## [0.1.1](https://github.com/nodecg/nodecg/compare/0.1.0...v0.1.1) (2014-11-05)




<a name="0.1.0"></a>
# [0.1.0](https://github.com/nodecg/nodecg/compare/0.0.1...0.1.0) (2014-11-05)




<a name="0.0.1"></a>
## 0.0.1 (2014-10-07)




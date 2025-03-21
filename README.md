# Total Recall

TotalRecall is a keyboard-first, cross-browser extension, for marking and recalling webpages.

It can be used for:
- Quickly recalling websites you bookmarked in the past
- Quicklaunching pages you visit often
- Saving/loading browsing sessions (as bookmarks grouped by a session tag)
- Synchronizing your bookmarks across browsers

## Get it now

- [Chrome Extension](https://chrome.google.com/webstore/detail/total-recall/fjhhkjfebkebegmdmemndmbnaoccpfcj)

- [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/total-recall/)

## Features

- Tag-based organization (no folders)
- Full-text search + tags search using hashtag syntax (`#mytag`)
	- Sort by relevance, last updated, url, etc. 
- Uses CouchDB for open-protocol live synchronization across devices
- We provide an official CouchDB server with https access, maintained for free
	- Users may sync to their own private CouchDB server instead
- Export and import your database to and from a local JSON file

**Built with:**
- Svelte for UI
- FlexSearch for fast full-text searching
- PouchDB for persistence and synchronization

## How to use

You can activate TotalRecall from any page in your browser.

- Press `Ctrl+Shift+.` to bookmark the current page
	- Edit the bookmark, and press `Enter` to confirm
	- Press `Escape` to cancel bookmark

- Press `Ctrl+Shift+F` to open a new search page, and start typing!
	- Navigate the results using `Up`/`Down`/`Page Up`/`Page Down`/`Home`/`End`
	- Press `Enter` to go to selected page(s)
	- Press `Ctrl+Enter` to open the selected pages in new tabs
	- Press `Shift+Enter` to open the selected pages in a new window
	- Press `Insert` to edit the bookmarks for the selected pages
	- Press `Delete` to delete the bookmarks for the selected pages

To change the activation shortcuts, see "Setup -> Change Shortcuts".

## Setup

TotalRecall works well out of the box, but we recommend customizing it to get the most out of it.

### Customize Search Page

By default, the search page is blank until you start typing into the search box.

But you can set it up to contain lists of items, based on their tags.

In the Settings Page (you can go there by clicking the Gear on the top-right of the Find Page), fill in the input under "Tags to show in main page". Items with these tags will appear every time you open the Find Page.

Each item will be listed with a checkbox. If you click it, the checked item will receive the special `#done` tag, which will prevent it from appearing next time you load the page. This can be especially useful for task lists, like ToDo items. 

### Backup & Syncronization

Replication (sync) is disabled by default, but can be enabled by the user.

There are two replication options:

- **Sync to TotalRecall free server** - Will sync to a dedicated server that we provide for free.
	- Data is sent securely over https.
	- We will never share your data (i.e. bookmarks) with anyone, without your permission.
- **Sync to custom CouchDB** - Will sync to any CouchDB that has a public URL.
	- CouchDB databases are very easy to set up. (We highly recommend [Caddy](https://caddyserver.com/) as an SSL front).

### Change Shortcuts

The default activation shortcuts (`Ctrl+Shift`+`F`/`.`) were chosen to be compatible with both Chrome and Firefox. However, you can change them to whatever you like.

To change the shortcuts:

- Chrome -- Go to `chrome://extensions` in your browser. Click the 'hamburger' icon, and choose "Keyboard Shortcuts".

- Firefox -- Go to `about:addons` (Ctrl+Shift+A). Click the 'settings (gear)' icon, and choose "Manage Extension Shortcuts". 



## How to build?

If you want to build the extension yourself, just clone it and run:

```bash
	npm install
	npm run build
```

The extension files will be written into the `public` directory (a new `build` subdirectory will be created inside, you can importe the `public` directory as an extension in Chrome).

If there are errors during the extension's loading, you can more easily debug by disabling terse (minification) with this command:

```
DEBUG_BUILD=true npm run build
```

## Screenshot

![Screenshot](screenshot1.png)

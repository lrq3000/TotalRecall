import browser from "webextension-polyfill";

export enum SyncTarget {
  None = "None",
  MainServer = "MainServer",
  CustomCouch = "CustomCouch",
}

export enum SyncStatusEnum {
	Ok = "ok",
	Disabled = "disabled",
	Error = "error",
}

interface SyncConfig {
    sync_target: SyncTarget
    main_server_user?: string
    main_server_pass?: string
    custom_couch_url?: string
}

interface SyncStatus {
	status: SyncStatusEnum
}

interface GeneralConfig {
	sidebar_tags: Array<string>
}

interface Page {
	_id: string
    description: string
    notes: string
    tags: Array<string>
    starred: boolean
}

interface PagesDB {
	tags: Array<string>

	search(s: string): Array<Page>
	count(): number
	getOrNewPage(url: string, defaults): Page

    replicate_to_couch(url: string)
    replicate_to_auth_server(name: string, password: string)
    deleteAllPages()
    addPages(pages: Array<Page>)
}

interface BackgroundPage {
	pages_db: PagesDB
	update_icon(tab_id: number, page: Page)

	get_sync_config(): SyncConfig
    set_sync_config(c: SyncConfig)
}

export function set_config(conf) {
}

declare global {
    interface Window {
        background: BackgroundPage
    }
}


export async function get_bg_module(): Promise<BackgroundPage> {
	let bg_page = await browser.runtime.getBackgroundPage()
	return bg_page.background
}

export async function get_db(): Promise<PagesDB> {
	let bg_module = await get_bg_module()
	return bg_module.pages_db
}

export async function get_suggested_tags(): Promise<Array<string>> {
	let db = await get_db()
	return [...db.tags || []].filter(x => x && x.length > 0)
}

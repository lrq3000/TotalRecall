<script lang="ts">
	import browser from "webextension-polyfill";

	import EditDialog from './EditDialog.svelte';
	import {get_db, Page, get_bg_module, get_suggested_tags} from './interfaces.ts';
	
	async function get_tab() {
		let tabs = await browser.tabs.query({active: true, currentWindow: true})
		if (tabs.length == 0) {
			throw new Error("Cannot read tab information!")
		}

		return tabs[0];
	}

	function assert_attr(obj, attr) {
		if (!obj.hasOwnProperty(attr)) {
			throw new ReferenceError('The property ' + attr + ' is not defined on this object');
		}
	}

	async function get_page(tab): Page {
		let bg = await get_bg_module()
		let db = bg.pages_db
		await bg.update_icon(tab.id, {starred:true})

		let defaults = {description: tab.title, starred: true}
		let [page, just_created] = await db.getOrNewPage(tab.url, defaults)
		page._just_created = just_created	// XXX
		if (!page.starred) {
			page.starred = true
			db.updatePage(page).then( () => {} )
		}
		return page
	}

	async function remove(tab) {
		let bg = await get_bg_module()
		let db = bg.pages_db
		let deleted = await db.deletePage(tab.url)
		await bg.update_icon(tab.id, {starred: false})
		window.close()
	}

	async function remove_star_and_close(tab, page) {
		if (page._just_created) {
			// await remove_star(tab, page)
			let bg = await get_bg_module()
			let db = bg.pages_db
			let deleted = await db.deletePage(tab.url)
			await bg.update_icon(tab.id, {starred: false})
		}
		close()
	}

	async function remove_star(tab, page: Page) {
		let bg = await get_bg_module()
		let db = bg.pages_db
		page.starred = false
		await db.updatePage(page)
		await bg.update_icon(tab.id, {starred: false})
	}

	async function close() {
		window.close()
	}


</script>

<main>
	{#await get_tab()}
		<p>Getting tab...</p>
	{:then tab}
		<button class="diminished" style="float:right" on:click={() => remove(tab)}>remove</button>

		{#await get_page(tab)}
			<p>Checking database...</p>
			<br/>
		{:then page}
			{#if page._just_created}
				<h1> Create bookmark </h1>
				<h4> First visit! </h4>
			{:else}
				<h1> Edit bookmark </h1>
			{/if}

			<EditDialog
				description={page.description}
				url={page._id}
				notes={page.notes || ''}
				tags={page.tags || []}
				suggested_tags_promise={get_suggested_tags()}
				on:save={close}
				on:cancel={() => {remove_star_and_close(tab, page)}}
			/>

			{#if page.visit_count}
				<h4>
					You visited this page {page.visit_count} times (<button class="diminished">view history</button>)
				</h4>
			{/if}
		{/await}

	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}

</main>

<style>
main {
	margin: 0;
	padding: 0;
	margin-top: 0;
}
</style>
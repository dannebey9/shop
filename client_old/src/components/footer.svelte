<script>
	export let siteName = "siteName";
    export let links;
</script>

<footer class="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-800">
	<div class="sm:flex sm:items-center sm:justify-between">
		<a href="https://flowbite.com" class="flex items-center mb-4 sm:mb-0">
			<img src="/docs/images/logo.svg" class="mr-3 h-8" alt="Flowbite Logo" />
			<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
				>{siteName}</span
			>
		</a>
		<ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            {#each links as {name, url}}
			<li>
				<a href={url} class="mr-4 hover:underline md:mr-6 ">{name}</a>
			</li>
            {/each}
		</ul>
	</div>
	<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
	<span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
		>© 2022 <a href="https://flowbite.com" class="hover:underline">{siteName}</a>. All Rights
		Reserved.
	</span>
</footer>

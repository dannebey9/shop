<script>
	import { onMount } from "svelte";
	import { page } from '$app/stores';
    let path;

    $: path = $page.url.pathname;

	export let siteName = 'siteName';
	export let links;
	// let togglemenu = false;
	// function toggler() {
	// 	let body = document.getElementsByTagName('body');
	// 	if (togglemenu === false) {
	// 		togglemenu = true;
	// 		document.querySelector('body').classList.add('overflow-hidden');
	// 	} else {
	// 		togglemenu = false;
	// 		document.querySelector('body').classList.remove('overflow-hidden');
	// 	}
	// }
	let togglenot = false;
	function toggleNotif(){
		if(togglenot === true){
			togglenot = false;
		} else {
			togglenot = true;
		}
		console.log(togglenot);
	}
	function selectlink(idurl){
		if(path === links[idurl].url){
			console.log("working")
		}
	}
	onMount(async function (){
		if (links.url === window.location.pathname){
			console.log("Yes");
		} else {
			console.log("No" + links[0].url);
		}
		async function geturl(){
			console.log(window.location.href + " " + window.location.host + " " + window.location.pathname);
		}
		geturl();
	})
</script>

<nav
	class="
  fixed
  w-full
  flex flex-wrap
  items-center
  justify-between
  py-4
  bg-gray-100
  text-gray-500
  hover:text-gray-700
  focus:text-gray-700
  shadow-lg
  navbar navbar-expand-lg navbar-light
  "
>
	<div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
		<div class="flex collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">
			<a
				class="
        flex
        items-center
        text-gray-900
        hover:text-gray-900
        focus:text-gray-900
        mt-0
		text-2xl
        lg:mt-0
        mr-1
      "
				href="#"
			>
				{siteName}
			</a>
			<!-- Left links -->
			<ul class="navbar-nav hidden sm:flex pl-0 list-style-none mr-auto">
				{#each links as { name, url, id }}
					<li class="nav-item p-2" {id}>
						<a class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" on:click={() => selectlink(id)} href={url}
							>{name}</a
						>
					</li>
				{/each}
			</ul>
			<!-- Left links -->
		</div>
		<!-- Collapsible wrapper -->

		<!-- Right elements -->
		<div class="flex items-center relative">
			<!-- Icon -->
			<a class="text-gray-500 hover:text-gray-700 focus:text-gray-700 mr-4 hide-mobile" href="#">
				<svg
				
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="shopping-cart"
					class="w-4"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 576 512"
				>
					<path
						fill="currentColor"
						d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
					/>
				</svg>
			</a>
			<div class="dropdown relative">
				<a
				on:click="{toggleNotif}"
					class="
          text-gray-500
          hover:text-gray-700
          focus:text-gray-700
          mr-4
          dropdown-toggle
          hidden-arrow
          flex items-center
        "
					href="#"
					id="dropdownMenuButton1"
					role="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<svg
						aria-hidden="true"
						focusable="false"
						data-prefix="fas"
						data-icon="bell"
						class="w-4"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
					>
						<path
							fill="currentColor"
							d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"
						/>
					</svg>
					<span class="text-white bg-red-700 absolute rounded-full text-xs -mt-2.5 ml-2 py-0 px-1.5"
						>1</span
					>
				</a>
				<ul class:hidden={togglenot === false}
					class="
      dropdown-menu
      min-w-max
      absolute
      bg-white
      text-base
      z-50
      float-left
      py-2
      list-none
      text-left
      rounded-lg
      shadow-lg
      mt-1
      m-0
      bg-clip-padding
      border-none
      left-auto
      right-0
    "
					aria-labelledby="dropdownMenuButton1"
				>
					<li>
						<a
							class="
          dropdown-item
          text-sm
          py-2
          px-4
          font-normal
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-gray-700
          hover:bg-gray-100
        "
							href="#">Открыть</a
						>
					</li>
					<li>
						<a
							class="
          dropdown-item
          text-sm
          py-2
          px-4
          font-normal
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-gray-700
          hover:bg-gray-100
        "
							href="#">Просмотреть всё</a
						>
					</li>
					<li>
						<a
							class="
          dropdown-item
          text-sm
          py-2
          px-4
          font-normal
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-gray-700
          hover:bg-gray-100
        "
							href="#">Отключить уведомления</a
						>
					</li>
				</ul>
			</div>
			<div class="hide-mobile">
				<a
					class="dropdown-toggle flex items-center hidden-arrow"
					href="#"
					id="dropdownMenuButton2"
					role="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<img
						src="https://mdbootstrap.com/img/new/avatars/2.jpg"
						class="rounded-full"
						style="height: 25px; width: 25px"
						alt=""
						loading="lazy"
					/>
				</a>
				<ul
					class="
    dropdown-menu
    min-w-max
    absolute
    bg-white
    text-base
    z-50
    float-left
    py-2
    list-none
    text-left
    rounded-lg
    shadow-lg
    mt-1
    hidden
    m-0
    bg-clip-padding
    border-none
    left-auto
    right-0
  "
					aria-labelledby="dropdownMenuButton2"
				>
					<li>
						<a
							class="
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      "
							href="#">Action</a
						>
					</li>
					<li>
						<a
							class="
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      "
							href="#">Another action</a
						>
					</li>
					<li>
						<a
							class="
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      "
							href="#">Something else here</a
						>
					</li>
				</ul>
			</div>
		</div>
		<!-- Right elements -->
	</div>
</nav>

<div
	class="bg-blue-600 transition-all sm:hidden duration-300 z-2 mx-auto my-auto w-screen h-16 bottom-0 fixed flex items-stretch justify-center"
>
	<ul class="self-center flex">
		{#each links as { name, url, svg}}
			<li class=" text-sm leading-8 mb-2 mt-2 py-1 px-5 flex flex-col justify-center text-white">
        
				<a class="text-center flex-col justify-center" href={url}>
          {@html svg }
          <h3>{name}</h3>
        </a>
			</li>
		{/each}
	</ul>
</div>

<!-- <button
	class="
  sm:hidden
      
      text-white
      border-0
      hover:shadow-none hover:no-underline
      p-5
	  z-10
      px-5
      bg-blue-500
      focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
	  fixed
	  rounded-full
	  bottom-4
	  right-4
    "
	on:click={toggler}
	type="button"
	data-bs-toggle="collapse"
	data-bs-target="#navbarSupportedContent"
	aria-controls="navbarSupportedContent"
	aria-expanded="false"
	aria-label="Toggle navigation"
>
	<svg
		class="w-6 h-6"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		><path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M4 6h16M4 12h16M4 18h16"
		/></svg>
</button> -->
<style>
	/* .lefttog {
    	transform: translateY(1080px);
	} */

	@media (max-width: 640px) {
	.hide-mobile{
		display: none;
	}
}

</style>

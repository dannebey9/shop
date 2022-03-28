<script>
    import { onMount } from "svelte";


    const productendpoint = 'http://localhost:5000/api/product';
    const typeendpoint = 'http://localhost:5000/api/type';
    const brandendpoint = 'http://localhost:5000/api/brand';
    export let products = [];
    export let brands = [];
    export let types = [];
    onMount(async function () {
        const responseProd = await fetch(productendpoint);
        const responseType = await fetch(typeendpoint);
        const responseBrand = await fetch(brandendpoint);
        const dataProd = await responseProd.json();
        const dataType = await responseType.json();
        const dataBrand = await responseBrand.json();

        console.log("Вывод даты: " + dataProd.rows[0].name);
        products = dataProd.rows;
        types = dataType.rows;
        brands = dataBrand.rows;
    });

    let togglemodal = false;
    function togglermodal(){
		if (togglemodal === false) {
			togglemodal = true;
			document.querySelector('body').classList.add('overflow-hidden')

		} else{
			togglemodal = false;
			document.querySelector('body').classList.remove('overflow-hidden')
		}
    }
</script>
<style>
    .downtog{
        transform: translateY(900px);
    }
</style>
<div class="container mx-auto pt-[75px] pl-4">
    <button 
    class="text-white bg-blue-700 hover:bg-blue-800 flex focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm pl-4 pr-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    on:click="{togglermodal}"
    >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
        Фильтр
    </button>
</div>
<div class:downtog="{togglemodal === false}" class="bg-gray-200 rounded-xl shadow-inner transition-all duration-300 bottom-0 mx-auto my-auto w-screen h-2/3 fixed z-10 text-center items-stretch justify-center">
	<h1 class="text-2xl">Фильтры</h1>
    <!-- <div>
        {#each brands as brand}
            <input type="checkbox" name="{brand.name}" id="">
        {/each}
    </div>-->
    <div>
        {#each types as type}
            <input type="checkbox" name="{type.name}" id="">
        {/each}
    </div> 
</div>
<div class="container mx-auto columns-auto flex flex-wrap gap-6 justify-center pb-10 pt-32">
    {#each products as product}
    <div class="max-w-md md:max-w-sm bg-white rounded-3xl shadow-xl shadow-red-100 hover:shadow-blue-400 transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 ">
        <a href="##">
            <img class="p-8 rounded-t-lg" src="http://localhost:5000/{product.img}" alt="product image" />
        </a>
        <div class="px-5 pb-5">
            <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.name}
                </h5>
            </a>
            <div class="flex items-center mt-2.5 mb-5">
                <svg
                    class="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    /></svg
                >
                <svg
                    class="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    /></svg
                >
                <svg
                    class="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    /></svg
                >
                <svg
                    class="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    /></svg
                >
                <svg
                    class="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    /></svg
                >
                <span
                    class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3"
                    >{product.rating}</span
                >
            </div>
            <div class="flex justify-between items-center">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">{product.price} Рублей</span>
                <a
                    href="#"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >В корзину</a
                >
            </div>
        </div>
    </div>
    {/each}
</div>

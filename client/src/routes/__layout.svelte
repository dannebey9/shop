<script>
    import "../app.css";
    import "flowbite/dist/flowbite.css";
    import Navbar from "../components/navbar.svelte";
    import Footer from "../components/footer.svelte";

    // Переменные 
    const siteName = "FruitMarket";
    let links = [
        {name: "Главная", url: "/"},
        {name: "Каталог", url: "catalog"},
        {name: "О нас", url: "#"},
        {name: "Контакты", url: "#"}
    ]
    
</script>
<Navbar {siteName} {links} />
  
<slot />

<Footer {siteName} {links}/>
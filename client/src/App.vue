<template>
    <router-view/>
</template>

<script>
export default {
    name: 'App',
    mounted(){
        //this.$router.push({name: "Home"});
    }
}
</script>

<style>

@font-face {
    font-family: BirchStd;
    src: url("@/assets/fonts/BirchStd.otf");
}

html, body, #app{
    width:100%;
    height: 100%;
}

.bd-callout {
    padding: 1.25rem;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    background-color: var(--bd-callout-bg, var(--bs-gray-100));
    border-left: 0.25rem solid var(--bd-callout-border, var(--bs-gray-300));
}

.bd-callout-info {
    --bd-callout-bg: rgba(var(--bs-info-rgb), .075);
    --bd-callout-border: rgba(var(--bs-info-rgb), .5);
}

</style>

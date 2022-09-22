<template>
    <div class="container-fluid w-100 h-100 p-0 overflow-hidden" id="stwiy-bg">
        <ul class="d-flex justify-content-center align-items-center position-relative list-unstyled float-end mt-3 me-3" id="menu">
            <li class="p-3 d-flex justify-content-center align-items-center"><img class="logo me-2" src="@/assets/img/icon.png"><a href="/">HOME</a></li>
            <li class="p-3"><a target="_blank" href="https://discord.com/invite/TA9zKUXQAc">DISCORD</a></li>
            <li class="p-3"><router-link :to="{name: 'Documentation'}">DOCUMENTATION</router-link></li>
            <li class="p-3"><a target="_blank" href="https://github.com/Gangsta-Team">GITHUB</a></li>
        </ul>

        <img class="position-absolute float-start bottom-0 ms-5" style="width: 55%;" src="@/assets/img/tony.png">
        <img id="title" class="position-absolute float-end bottom-0 end-0" style="width: 35%;" src="@/assets/img/title.png">
        
    </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'Home',
    components: {
        //HelloWorld
    },
    mounted(){
    }
}
</script>

<style scoped>

.logo{
    width: 50px;
    background: white;
    padding: 10px;
    border-radius: 5px;
}

#stwiy-bg{
    background-color: rgb(209 28 37);
    background-image: url(@/assets/img/blood_reduced.png);
    background-size: cover;
    background-position: center;
}

#menu{
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.739);
    color: white;
    list-style: none;
    border-radius: 5px;
    font-family: BirchStd;
    font-size: 30px;
    letter-spacing: 2px;
}

#menu a{
    color: white;
    text-decoration-color: red;
}
</style>

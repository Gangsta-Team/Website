<template>
    <div class="navbar-brand" href="#">
        <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item text-white" aria-current="page" v-for="path in $route.meta.breadcrumb">
                <router-link :to="{name: path.link}" :class="(($route.name == path.route_name) ? 'text-white':'') + (path.class)">
                    {{ capitalize(path.name) }}
                </router-link>
            </li>
        </ol>
    </div>
</template>

<script>
    export default {
        name: 'Breadcrumb',
        methods:{
            capitalize: function(word){
                if(word == '') return '';
                var lower = word.toLowerCase();
                return word.charAt(0).toUpperCase() + lower.slice(1);
            }
        }
    }
</script>

<style scoped>
    .bc-link{
        color: white;
        text-decoration: none;
    }
    .bc-link-active{
        color: white;
        font-weight: bold;
        text-decoration: underline;
    }
</style>
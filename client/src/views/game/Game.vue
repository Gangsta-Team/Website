<template>
    <div class="game">
        <div v-if="$route.name == 'Game'">
            <div class="row m-0 mt-3 mb-3 d-flex justify-content-center align-items-center">
                <div class="col-8">
                    <div class="card w-100">
                        <div class="card-header">
                            Scarface The World Is Yours: Game
                        </div>
                        <div class="card-body">
                            <ul v-if="$route.name == 'Game'" class="mb-0">
                                <li><router-link :to="{name: 'Characters'}">Characters</router-link></li>
                                <li><router-link :to="{name: 'Vehicles'}">Vehicles</router-link></li>
                                <li><router-link :to="{name: 'Helicopters'}">Helicopters</router-link></li>
                                <li><router-link :to="{name: 'Boats'}">Boats</router-link></li>
                                <li><router-link :to="{name: 'Planes'}">Planes</router-link></li>
                                <li><router-link :to="{name: 'Natives'}">Natives</router-link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row m-0 mt-3 mb-3">
                <div class="col">
                    <div class="bd-callout bd-callout-info h-100">
                        <h4><a href="/documentation/game/natives">Explore the game natives</a></h4>
                        Get an overview of the game scripting natives. You can play arround game natives if you have intalled the scarface mod.
                    </div>
                </div>
                <div class="col">
                    <div class="bd-callout bd-callout-info h-100">
                        <h4><a href="/documentation/game/internals">Explore the game internals</a></h4>
                        Get an idea on how the game was made.
                    </div>
                </div>
                <div class="col">
                    <div class="bd-callout bd-callout-info h-100">
                        <h4><a href="/documentation/contribute">Contribute</a></h4>
                    </div>
                </div>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'Game',
}
</script>

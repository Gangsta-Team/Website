<template>
    <div class="vehicles" id="vehicles-list">
        <h2 class="p-3 mb-0 pb-0">Game vehicles</h2>
        <hr>
        <div class="card m-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-md">
                        <input class="form-control search" placeholder="Search...">
                    </div>
                    <!--div class="col-md">
                        <select class="form-select" @change="type_filter_change" aria-label="">
                            <option value="">Filter by vehicle type</option>
                            <option :value="type" v-for="type in vehicle_types">{{ type }}</option>
                        </select>
                    </div-->
                </div>
            </div>
        </div>
        <Grid :items="vehicles" :keyprop="'name'" @on_loaded="vehicles_loaded" v-slot="{ item }" :class="'vehicle p-3 d-flex justify-content-center align-items-center flex-column'">
            <img loading="lazzy" alt="vehicle" class="vehicle-img w-100" :src="item.item.img">
            <div class="w-100">
                <strong :id="item.item.name+'_'+item.item.id">
                    Name: <strong class="vehicle-name">{{ item.item.name }}</strong>
                </strong>
                <div class="d-flex justify-content-center align-items-start flex-column">
                    <span><b>Overall:</b> <span class="vehicle-overall">{{ item.item.overall }}</span></span>
                    <span><b>Top Speed:</b> <span class="vehicle-topspeed">{{ item.item.top_speed }}</span></span>
                    <span><b>Acceleration:</b> <span class="vehicle-acceleration">{{ item.item.acceleration }}</span></span>
                    <span><b>Handling:</b> <span class="vehicle-handling">{{ item.item.handling }}</span></span>
                    <span><b>Braking:</b> <span class="vehicle-braking">{{ item.item.braking }}</span></span>
                    <span><b>Mass:</b> <span class="vehicle-mass">{{ item.item.mass }}</span></span>
                    <span><b>Armor:</b> <span class="vehicle-armor">{{ item.item.armor }}</span></span>
                    <span><b>Type:</b> <span class="vehicle-type">{{ item.item.type }}</span></span>
                </div>
            </div>
        </Grid>
    </div>
</template>

<script>
    
import Grid from '@/components/Grid.vue'

import Vehicles from '@/assets/api/vehicles.json'

export default {
    name: 'Vehicles',
    components: {
        Grid,
    },
    data(){
        return {
            vehicles: [],
            vehicle_list: null,
            vehicle_types: []
        };
    },
    methods: {
        type_filter_change: function(evt){
            this.vehicle_list.search(evt.target.value, ['vehicle-type']);
        },
        vehicles_loaded: function(){
            console.log("vehicles_loaded")
            var options = {
                valueNames: [ 
                    'vehicle-name', 
                ]
            };

            this.vehicle_list = new listjs('vehicles-list', options);
        }
    },
    mounted(){
        this.$store.commit("setLoading", true);
        Vehicles.vehicles.forEach((vehicle, idx) => {
            var image = null;
            try {
                image = require("@/assets/vehicles/vehicle_"+idx+".png");
            } catch (e) {
                image = require("@/assets/img/placeholder.jpg");
                if (e.code !== 'MODULE_NOT_FOUND') {
                    throw e;
                }
            }
            vehicle.id = idx;
            vehicle.img = image;
            this.vehicles.push(vehicle);
            if(!this.vehicle_types.includes(vehicle.type))
                this.vehicle_types.push(vehicle.type);
        });
        this.$store.commit("setLoading", false);
    }
}
</script>

<style>
.vehicle{
    border: 1px solid rgb(215 215 215);
    background: #efefef;
}

.vehicle-img{
    border: 3px solid rgb(199 151 42);
}
.vehicle-name{
    color: rgb(199 151 42);
}
</style>
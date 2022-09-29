<template>
    <div class="vehicles w-100 start-0 bg-white" id="vehicles-list">

        <div class="modal fade" id="vehicleModal" tabindex="-1" aria-labelledby="vehicleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="vehicleModalLabel">Vehicle detail</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" v-if="selected_vehicle">
                    <div class="row d-flex justify-content-center align-items-center">
                        <div class="col-8">
                            <img loading="lazzy" alt="vehicle" class="vehicle-img img-fluid w-100" :src="selected_vehicle.img">
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-between flex-column w-100 h-100 m-2">
                        <strong>
                            {{ selected_vehicle.id }} Name: <strong class="vehicle-name">{{ selected_vehicle.name }}</strong>
                        </strong>
                        <div class="d-flex justify-content-center align-items-start flex-column h-100">
                            <span><b>Overall:</b> <span class="vehicle-overall">{{ selected_vehicle.overall }}</span></span>
                            <span><b>Top Speed:</b> <span class="vehicle-topspeed">{{ selected_vehicle.top_speed }}</span></span>
                            <span><b>Acceleration:</b> <span class="vehicle-acceleration">{{ selected_vehicle.acceleration }}</span></span>
                            <span><b>Handling:</b> <span class="vehicle-handling">{{ selected_vehicle.handling }}</span></span>
                            <span><b>Braking:</b> <span class="vehicle-braking">{{ selected_vehicle.braking }}</span></span>
                            <span><b>Mass:</b> <span class="vehicle-mass">{{ selected_vehicle.mass }}</span></span>
                            <span><b>Armor:</b> <span class="vehicle-armor">{{ selected_vehicle.armor }}</span></span>
                            <span><b>Type:</b> <span class="vehicle-type">{{ selected_vehicle.type }}</span></span>
                        </div>
                        <div>
                            <strong>Type:</strong> <span class="vehicle-type">{{ selected_vehicle.type }}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>

        <h2 class="p-3 mb-0 pb-0">Game vehicles</h2>
        <hr>
        <div class="card m-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12 col-md-12  col-lg-6">
                        <div class="row">
                            <div class="col">
                                <input class="form-control search" placeholder="Search...">
                            </div>
                            <div class="col">
                                <select class="form-select" @change="type_filter_change" aria-label="">
                                    <option value="">Filter by vehicle locale</option>
                                    <option :value="type" v-for="type in vehicle_types">{{ type }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-12  col-lg-6">
                        <div class="row">
                            <div class="col-md">
                                <button class="sort btn btn-primary w-100" data-sort="vehicle-name">
                                    Sort by name
                                </button>
                            </div>
                            <div class="col-md">
                                <button class="sort btn btn-primary w-100" data-sort="vehicle-type">
                                    Sort by type
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Grid :items="vehicles" :keyprop="'name'" @on_loaded="vehicles_loaded" @on_click="on_click" v-slot="{ item }" :class="'vehicle p-3 d-flex justify-content-center align-items-center flex-column'">
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
            vehicle_types: [],
            vehicle_modal: null,
            selected_vehicle: null,
        };
    },
    methods: {
        on_click:function(evt){
            console.log("Vehicle click", evt)
            this.selected_vehicle = evt;
            this.vehicle_modal.show();
        },
        type_filter_change: function(evt){
            this.vehicle_list.search(evt.target.value, ['vehicle-type']);
        },
        vehicles_loaded: function(){
            console.log("vehicles_loaded")
            var options = {
                valueNames: [ 
                    'vehicle-name', 
                    'vehicle-type', 
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
            vehicle.click = this.on_click;
            this.vehicles.push(vehicle);
            if(!this.vehicle_types.includes(vehicle.type))
                this.vehicle_types.push(vehicle.type);
        });
        this.$store.commit("setLoading", false);

        this.vehicle_modal = new bootstrap.Modal('#vehicleModal', {
            keyboard: false
        })
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
<template>
    <div class="vehicles">
        <h2 class="p-3 mb-0 pb-0">Game vehicles</h2>
        <hr>
        <Grid>
            <GridItem v-for="(vehicle, idx) in vehicles" class="vehicle p-3 d-flex justify-content-center align-items-center flex-column">
                
                <img loading="lazzy" alt="vehicle" class="vehicle-img w-100" :src="vehicle.img">
                <div class="w-100">
                    <strong :id="vehicle.name+'_'+idx">
                        Name: <strong class="vehicle-name">{{ vehicle.name }}</strong>
                    </strong>
                    <div class="d-flex justify-content-center align-items-start flex-column">
                        <span><b>Overall:</b> {{ vehicle.overall }}</span>
                        <span><b>Top Speed:</b> {{ vehicle.top_speed }}</span>
                        <span><b>Acceleration:</b> {{ vehicle.acceleration }}</span>
                        <span><b>Handling:</b> {{ vehicle.handling }}</span>
                        <span><b>Braking:</b> {{ vehicle.braking }}</span>
                        <span><b>Mass:</b> {{ vehicle.mass }}</span>
                        <span><b>Armor:</b> {{ vehicle.armor }}</span>
                        <span><b>Type:</b> {{ vehicle.type }}</span>
                    </div>
                </div>
            </GridItem>
        </Grid>
    </div>
</template>

<script>
    
import Grid from '@/components/Grid.vue'
import GridItem from '@/components/GridItem.vue'

import Vehicles from '@/assets/api/vehicles.json'

export default {
    name: 'Vehicles',
    components: {
        Grid,
        GridItem
    },
    data(){
        return {
            vehicles: []
        };
    },
    mounted(){
        this.$store.commit("setLoading", true);
        Vehicles.vehicles.forEach((vehicle, idx) => {
            var image = null;
            try {
                image = require("@/assets/vehicles/vehicle_"+idx+".png");
            } catch (e) {
                if (e.code !== 'MODULE_NOT_FOUND') {
                    throw e;
                }
            }
            vehicle.id = idx;
            vehicle.img = image;
            this.vehicles.push(vehicle);
        });
        this.$store.commit("setLoading", false);
    }
}
</script>

<style scoped>
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
.item{
    font-size: 14px;
}
</style>
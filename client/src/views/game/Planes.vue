<template>
    <div class="planes">
        <h2 class="p-3 mb-0">Game planes</h2>
        <Grid>
            <GridItem v-for="(plane, idx) in planes">
                <span>
                    {{ plane.name }}
                </span>
                <img loading="lazzy" alt="plane" :src="plane.img" width="100">
            </GridItem>
        </Grid>
    </div>
</template>

<script>
    
import Grid from '@/components/Grid.vue'
import GridItem from '@/components/GridItem.vue'

import Planes from '@/assets/api/planes.json'

export default {
    name: 'Planes',
    components: {
        Grid,
        GridItem
    },
    data(){
        return {
            planes: []
        };
    },
    mounted(){
        Planes.planes.forEach((plane, idx) => {
            var image = null;
            try {
                image = require("@/assets/planes/plane_"+idx+".png");
            } catch (e) {
                if (e.code !== 'MODULE_NOT_FOUND') {
                    throw e;
                }
            }
            plane.id = idx;
            plane.img = image;
            this.planes.push(plane);
        });
    }
}
</script>

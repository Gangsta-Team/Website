<template>
    <div class="boats w-100 start-0 bg-white">
        <h2 class="p-3 mb-0">Game boats</h2>
        <Grid>
            <GridItem v-for="(boat, idx) in boats">
                <span>
                    {{ boat.name }}
                </span>
                <img loading="lazzy" alt="boat" :src="boat.img" width="100">
            </GridItem>
        </Grid>
    </div>
</template>

<script>
    
import Grid from '@/components/Grid.vue'
import GridItem from '@/components/GridItem.vue'

//import Boats from '@/assets/api/boats.json'

export default {
    name: 'Boats',
    components: {
        Grid,
        GridItem
    },
    data(){
        return {
            boats: []
        };
    },
    mounted(){
        
    }
}
</script>

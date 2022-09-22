<template>
    <div class="helicopters">
        <h2 class="p-3 mb-0">Game helicopters</h2>
        <Grid>
            <GridItem v-for="(helicopter, idx) in helicopters">
                <span>
                    {{ helicopter.name }}
                </span>
                <img loading="lazzy" alt="helicopter" :src="helicopter.img" width="100">
            </GridItem>
        </Grid>
    </div>
</template>

<script>
    
import Grid from '@/components/Grid.vue'
import GridItem from '@/components/GridItem.vue'

//import Helicopters from '@/assets/api/helicopters.json'

export default {
    name: 'Helicopters',
    components: {
        Grid,
        GridItem
    },
    data(){
        return {
            helicopters: []
        };
    },
    mounted(){
        
    }
}
</script>

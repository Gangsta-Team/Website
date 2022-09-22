<template>
    <div class="characters">
        <h2 class="p-3 mb-0 pb-0">Game characters</h2>
        <hr>
        <div class="p-3 pt-0 pb-0">
            <div class="p-3 alert alert-info mb-0">
                This information is taken from: <a href="https://archive.org/details/Scarface_The_World_is_Yours_Prima_Official_eGuide" target="_blank">Scarface The World is Yours Prima Official eGuide.pdf</a>
            </div>
        </div>
        <Grid>
            <GridItem v-for="(character, idx) in characters" v-bind:key="idx" class="character p-3 d-flex justify-content-start align-items-center">
                <img loading="lazzy" alt="character" class="character-img" :src="character.img" width="130">
                <div class="d-flex justify-content-between align-items-between flex-column w-100 h-100">
                    <strong>
                        {{ idx }} Name: <strong class="character-name">{{ character.name }}</strong>
                    </strong>
                    <div class="d-flex justify-content-center align-items-center p-2 bg-light h-100">
                        <i>
                            {{ character.text }}
                        </i>
                    </div>
                    <div>
                        <strong>Locale:</strong> {{ character.locale }}
                    </div>
                </div>
            </GridItem>
        </Grid>
    </div>
</template>

<script>
    
import Grid from '@/components/Grid.vue'
import GridItem from '@/components/GridItem.vue'

import Characters from '@/assets/api/characters.json'

export default {
    name: 'Characters',
    components: {
        Grid,
        GridItem
    },
    data(){
        return {
            characters: [],
        };
    },
    mounted(){
        this.$store.commit("setLoading", true);
        Characters.characters.forEach((character, idx) => {
            var image = null;
            try {
                image = require("@/assets/characters/character_"+idx+".png");
                this.characters.push({
                    id: idx,
                    name: character.name,
                    text: character.text,
                    locale: character.locale,
                    img: image
                });
            } catch (e) {
                if (e.code !== 'MODULE_NOT_FOUND') {
                    throw e;
                }
                this.characters.push({
                    id: idx,
                    name: character.name,
                    img: require("@/assets/img/placeholder.jpg")
                });
            }
        });
        this.$store.commit("setLoading", false);
    }
}
</script>

<style scoped>
.character{
    border: 1px solid rgb(215 215 215);
    background: #efefef;
}

.character-img{
    border: 3px solid rgb(199 151 42);
}
.character-name{
    color: rgb(199 151 42);
}
.item{
    font-size: 14px;
}
</style>

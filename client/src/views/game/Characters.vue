<template>
    <div class="characters" id="characters-list">
        <h2 class="p-3 mb-0 pb-0">Game characters</h2>
        <hr>
        <div class="card m-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-md">
                        <input class="form-control search" placeholder="Search...">
                    </div>
                    <!--div class="col-md">
                        <select class="form-select" @change="locale_filter_change" aria-label="">
                            <option value="">Filter by character locale</option>
                            <option :value="locale" v-for="locale in character_locales">{{ locale }}</option>
                        </select>
                    </div-->
                </div>
            </div>
        </div>
        <div class="p-3 pt-0 pb-0">
            <div class="p-3 alert alert-info mb-0">
                This information is taken from: <a href="https://archive.org/details/Scarface_The_World_is_Yours_Prima_Official_eGuide" target="_blank">Scarface The World is Yours Prima Official eGuide.pdf</a>
            </div>
        </div>
        <Grid :items="characters" :keyprop="'name'" @on_loaded="characters_loaded" v-slot="{ item }" :class="'character p-3 d-flex justify-content-start align-items-center'">
            <img loading="lazzy" alt="character" class="character-img" :src="item.item.img" width="130">
            <div class="d-flex justify-content-between align-items-between flex-column w-100 h-100">
                <strong>
                    {{ item.item.id }} Name: <strong class="character-name">{{ item.item.name }}</strong>
                </strong>
                <div class="d-flex justify-content-center align-items-center p-2 bg-light h-100">
                    <i class="character-text">
                        {{ item.item.text }}
                    </i>
                </div>
                <div>
                    <strong>Locale:</strong> <span class="character-locale">{{ item.item.locale }}</span>
                </div>
            </div>
        </Grid>
    </div>
</template>

<script>
    
import Grid from '@/components/Grid.vue'

import Characters from '@/assets/api/characters.json'

export default {
    name: 'Characters',
    components: {
        Grid
    },
    data(){
        return {
            characters: [],
            character_list: null,
            character_locales: []
        };
    },
    methods : {
        locale_filter_change: function(evt){
            this.character_list.search(evt.target.value, ['character-locale']);
        },
        characters_loaded: function(){
            var options = {
                valueNames: [ 
                    'character-name', 
                    'character-text' 
                ]
            };

            this.character_list = new listjs('characters-list', options);
        },
    },
    mounted(){
        this.$store.commit("setLoading", true);
        Characters.characters.forEach((character, idx) => {
            var image = null;
            try {
                image = require("@/assets/characters/character_"+idx+".png");
            } catch (e) {
                image = require("@/assets/img/placeholder.jpg");
                if (e.code !== 'MODULE_NOT_FOUND') {
                    throw e;
                }
            }
            
            this.characters.push({
                id: idx,
                name: character.name,
                text: character.text,
                locale: character.locale,
                img: image
            });

            if(!this.character_locales.includes(character.locale))
                this.character_locales.push(character.locale);
        });
        this.$store.commit("setLoading", false);
    }
}
</script>

<style>
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
</style>

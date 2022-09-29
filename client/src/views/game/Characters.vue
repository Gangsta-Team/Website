<template>
    <div class="characters w-100 start-0 bg-white" id="characters-list">

        <div class="modal fade" id="characterModal" tabindex="-1" aria-labelledby="characterModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="characterModalLabel">Character detail</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex" v-if="selected_character">
                    <img loading="lazzy" alt="character" class="character-img m-2" :src="selected_character.img" width="130">
                    <div class="d-flex justify-content-between align-items-between flex-column w-100 h-100 m-2">
                        <strong>
                            {{ selected_character.id }} Name: <strong class="character-name">{{ selected_character.name }}</strong>
                        </strong>
                        <div class="d-flex justify-content-center align-items-center p-2 bg-light h-100">
                            <i class="character-text">
                                {{ selected_character.text }}
                            </i>
                        </div>
                        <div>
                            <strong>Locale:</strong> <span class="character-locale">{{ selected_character.locale }}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>

        <h2 class="p-3 mb-0 pb-0">Game characters</h2>
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
                                <select class="form-select" @change="locale_filter_change" aria-label="">
                                    <option value="">Filter by character locale</option>
                                    <option :value="locale" v-for="locale in character_locales">{{ locale }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-12  col-lg-6">
                        <div class="row">
                            <div class="col-md">
                                <button class="sort btn btn-primary w-100" data-sort="character-name">
                                    Sort by name
                                </button>
                            </div>
                            <div class="col-md">
                                <button class="sort btn btn-primary w-100" data-sort="character-locale">
                                    Sort by locale
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-3 pt-0 pb-0">
            <div class="p-3 alert alert-info mb-0">
                This information is taken from: <a href="https://archive.org/details/Scarface_The_World_is_Yours_Prima_Official_eGuide" target="_blank">Scarface The World is Yours Prima Official eGuide.pdf</a>
            </div>
        </div>
        <Grid :items="characters" :keyprop="'name'" @on_loaded="characters_loaded" v-slot="{ item }" @on_click="on_click" :class="'character p-3 d-flex justify-content-start align-items-center'">
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
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
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
            character_locales: [],
            character_modal: null,
            selected_character: null,
        };
    },
    methods : {
        on_click:function(evt){
            console.log("Charater click", evt)
            this.selected_character = evt;
            this.character_modal.show();
        },
        locale_filter_change: function(evt){
            this.character_list.search(evt.target.value, ['character-locale']);
        },
        characters_loaded: function(){
            var options = {
                valueNames: [ 
                    'character-name', 
                    'character-text', 
                    'character-locale', 
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
                click: this.on_click,
                name: character.name,
                text: character.text,
                locale: character.locale,
                img: image
            });

            if(!this.character_locales.includes(character.locale))
                this.character_locales.push(character.locale);
        });
        this.$store.commit("setLoading", false);

        this.character_modal = new bootstrap.Modal('#characterModal', {
            keyboard: false
        })
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

.sort:focus {
  outline:none;
}
.sort:after {
  display:inline-block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid transparent;
  content:"";
  position: relative;
  top:-10px;
  right:-5px;
}
.sort.asc:after {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #fff;
  content:"";
  position: relative;
  top:4px;
  right:-5px;
}
.sort.desc:after {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #fff;
  content:"";
  position: relative;
  top:-4px;
  right:-5px;
}
</style>

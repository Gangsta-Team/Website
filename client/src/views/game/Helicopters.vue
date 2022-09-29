<template>
    <div class="helicopters w-100 start-0 bg-white" id="helicopters-list">

        <div class="modal fade" id="helicopterModal" tabindex="-1" aria-labelledby="helicopterModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="helicopterModalLabel">Helicopter detail</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" v-if="selected_helicopter">
                    <div class="row d-flex justify-content-center align-items-center">
                        <div class="col-8">
                            <img loading="lazzy" alt="helicopter" class="helicopter-img img-fluid w-100" :src="selected_helicopter.img">
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-between flex-column w-100 h-100 m-2">
                        <strong>
                            {{ selected_helicopter.id }} Name: <strong class="helicopter-name">{{ selected_helicopter.name }}</strong>
                        </strong>
                        <div class="d-flex justify-content-center align-items-start flex-column h-100">
                            <span><b>Template:</b> <span class="helicopter-template">{{ selected_helicopter.template }}</span></span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>

        <h2 class="p-3 mb-0 pb-0">Game helicopters</h2>
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
                                <select class="form-select" @change="template_filter_change" aria-label="">
                                    <option value="">Filter by helicopter locale</option>
                                    <option :value="template" v-for="template in helicopter_templates">{{ template }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-12  col-lg-6">
                        <div class="row">
                            <div class="col-md">
                                <button class="sort btn btn-primary w-100" data-sort="helicopter-name">
                                    Sort by name
                                </button>
                            </div>
                            <div class="col-md">
                                <button class="sort btn btn-primary w-100" data-sort="helicopter-template">
                                    Sort by template
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Grid :items="helicopters" :keyprop="'name'" @on_loaded="helicopters_loaded" @on_click="on_click" v-slot="{ item }" :class="'helicopter p-3 d-flex justify-content-center align-items-center flex-column'">
            <img loading="lazzy" alt="helicopter" class="helicopter-img w-100" :src="item.item.img">
            <div class="w-100">
                <strong :id="item.item.name+'_'+item.item.id">
                    Name: <strong class="helicopter-name">{{ item.item.name }}</strong>
                </strong>
                <div class="d-flex justify-content-center align-items-start flex-column h-100">
                    <span><b>Temlate:</b> <span class="vehicle-template">{{ item.item.template }}</span></span>
                </div>
            </div>
        </Grid>
    </div>
</template>

<script>
    
import Grid from '@/components/Grid.vue'

import Helicopters from '@/assets/api/helicopters.json'

export default {
    name: 'Helicopters',
    components: {
        Grid,
    },
    data(){
        return {
            helicopters: [],
            helicopter_list: null,
            helicopter_templates: [],
            helicopter_modal: null,
            selected_helicopter: null,
        };
    },
    methods: {
        on_click:function(evt){
            console.log("helicopter click", evt)
            this.selected_helicopter = evt;
            this.helicopter_modal.show();
        },
        template_filter_change: function(evt){
            this.helicopter_list.search(evt.target.value, ['helicopter-template']);
        },
        helicopters_loaded: function(){
            console.log("helicopters_loaded")
            var options = {
                valueNames: [ 
                    'helicopter-name', 
                    'helicopter-template', 
                ]
            };

            this.helicopter_list = new listjs('helicopters-list', options);
        }
    },
    mounted(){
        this.$store.commit("setLoading", true);
        Helicopters.helicopters.forEach((helicopter, idx) => {
            console.log(helicopter)
            var image = null;
            try {
                image = require("@/assets/helicopters/helicopter_"+idx+".png");
            } catch (e) {
                image = require("@/assets/img/placeholder.jpg");
                if (e.code !== 'MODULE_NOT_FOUND') {
                    throw e;
                }
            }
            helicopter.id = idx;
            helicopter.img = image;
            helicopter.click = this.on_click;
            this.helicopters.push(helicopter);
            if(!this.helicopter_templates.includes(helicopter.template))
                this.helicopter_templates.push(helicopter.template);
        });
        this.$store.commit("setLoading", false);

        this.helicopter_modal = new bootstrap.Modal('#helicopterModal', {
            keyboard: false
        })
    }
}
</script>

<style>
.helicopter{
    border: 1px solid rgb(215 215 215);
    background: #efefef;
}

.helicopter-img{
    border: 3px solid rgb(199 151 42);
}
.helicopter-name{
    color: rgb(199 151 42);
}
</style>
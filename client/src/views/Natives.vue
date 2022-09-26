<template>
    <div class="container-fluid h-100">
        <div class="row d-flex h-100">
            <div class="flex-shrink-0 ps-0 pe-0 navbar-dark bg-light" style="width: 280px;">
                <nav class="navbar navbar-dark navbar-expand-lg bg-dark sticky-top" id="doc-nav">
                    <div class="container-fluid">
                        <a class="navbar-brand navbar-brand d-flex justify-content-center align-items-center" href="/">
                            <img src="@/assets/logo.png" alt="Logo" height="24" class="bg-white p-1 rounded d-inline-block align-text-top me-2">
                            STWIY
                        </a>
                    </div>
                </nav>
                <ul class="list-unstyled p-2 overflow-auto m-0" id="doc-list">
                    <li class="mb-1">
                        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#classes-collapse" aria-expanded="false">
                            Classes
                        </button>
                        <div class="collapse" id="classes-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li class="ms-3" v-for="(key, val) in classFunctions" v-bind:key="val">
                                    <button :class="'btn btn-toggle align-items-center rounded'+ ((working_class == val) ? '' : ' collapsed')" @click="getMD('/classes/'+val+'/', true)" data-bs-toggle="collapse" :data-bs-target="'#'+val.toLowerCase()+'-collapse'" aria-expanded="false">
                                        {{ val }}
                                    </button>
                                    <div :class="'collapse'+ ((working_class == val) ? ' show' : '')" :id="val.toLowerCase() + '-collapse'">
                                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            <li v-for="(props, method_name) in key">
                                                <a href="#" :class="'link-dark rounded'+ ((working_path == '/classes/'+val+'/'+method_name+'.md') ? ' active' : '')" :data-md="'/classes/'+val+'/'+method_name+'.md'" @click="getMD('/classes/'+val+'/'+method_name+'.md', false)">{{ method_name }}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="mb-1">
                        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#blobals-collapse" aria-expanded="false">
                            Globals
                        </button>
                        <div class="collapse" id="blobals-collapse" style="">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li class="ms-3" v-for="(key, val) in globalFunctions" v-bind:key="val">
                                    <a href="#" :class="'link-dark rounded'+ ((working_path == '/globals/'+val+'.md') ? ' active' : '')" @click="getMD('/globals/'+val+'.md', false)">{{ val }}</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    </ul>
            </div>
            <div class="p-0" style="width: calc(100% - 280px)">
                <nav class="navbar navbar-dark navbar-expand-lg bg-dark sticky-top">
                    <div class="container-fluid">
                        <Breadcrumb/>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div class="me-auto"></div>
                        </div>
                    </div>
                </nav>
                <div class="p-3 overflow-auto position-absolute end-0" style="width: calc(100% - 280px)" id="native">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Breadcrumb from '@/components/Breadcrumb'
import Loader from '@/components/Loader'
    
export default {
    name: 'Natives',
    components: {
        Breadcrumb,
        Loader
    },
    data(){
        return {
            classFunctions: null,
            globalFunctions: null,
            returnNames: null,
            natives: [],
            github_host: 'https://raw.githubusercontent.com/',
            repository: 'Gangsta-Team/natives',
            path: '/main/docs/',
            root_element: null,
            working_path: null,
            working_class: null
        };
    },
    methods:{
        adjustSize(){
            var app_h = $("#app").outerHeight();
            var nav_h = $('#doc-nav').outerHeight();
            $('#doc-list').css("height", (app_h - nav_h)+"px");
            $('#native').css("height", (app_h - nav_h)+"px");
        },
        formatTableLinks(){
            var links = $('#native table').find("a").toArray();
            for(var i = 0; i < links.length; i++){
                var fn_name = this.working_path + links[i].text+".md";
                links[i].href = fn_name;
                links[i].md = fn_name;
                links[i].onclick = function(evt){
                    evt.preventDefault();
                    //this.getMD(, false)
                    $("a[data-md='"+evt.target.md+"']")[0].click()
                }.bind(this)
            }
        },
        getMD(md_path, is_class){
            this.$store.commit("setLoading", true);
            this.working_path = md_path;
            this.working_class = md_path.split("/")[2];
            //"https://raw.githubusercontent.com/Gangsta-Team/natives/main/ExampleFunction.md"

            if(is_class)
                md_path += "README.md"; 

            $.ajax({
                url: this.github_host+this.repository+this.path+md_path,
                data: null,
                success: function(res){
                    $('#native').html(window.marked.parse(res));
                    window.hl.highlightAll();

                    $('#native table').addClass("table table-striped table-hover w-auto table-bordered");
                    if(is_class){
                        this.formatTableLinks();
                    }
                    this.$store.commit("setLoading", false);
                }.bind(this),
                dataType: "text"
            });
        }
    },
    mounted(){
        this.$store.commit("setLoading", true);
        this.root_element = $('#native');
        $.getJSON( "https://raw.githubusercontent.com/Gangsta-Team/natives/main/natives.json", function( data ) {
            this.classFunctions = data.classFunctions;
            this.globalFunctions = data.globalFunctions;
            this.returnNames = data.returnNames;
            this.$store.commit("setLoading", false);
        }.bind(this));
        this.adjustSize();
        $(window).resize(function(){
            this.adjustSize();
        }.bind(this));
    }
}
</script>


<style scoped>
main {
  display: flex;
  flex-wrap: nowrap;
  height: 100vh;
  height: -webkit-fill-available;
  max-height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
}

.b-example-divider {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.bi {
  vertical-align: -.125em;
  pointer-events: none;
  fill: currentColor;
}

.dropdown-toggle { outline: 0; }

.nav-flush .nav-link {
  border-radius: 0;
}

.btn-toggle {
  display: inline-flex;
  align-items: center;
  padding: .25rem .5rem;
  font-weight: 600;
  color: rgba(0, 0, 0, .65);
  background-color: transparent;
  border: 0;
}
.btn-toggle:hover,
.btn-toggle:focus {
  color: rgba(0, 0, 0, .85);
  background-color: #d2f4ea;
}

.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform .35s ease;
  transform-origin: .5em 50%;
}

.btn-toggle[aria-expanded="true"] {
  color: rgba(0, 0, 0, .85);
}
.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.btn-toggle-nav a {
  display: inline-flex;
  padding: .1875rem .5rem;
  margin-top: .125rem;
  margin-left: 1.25rem;
  text-decoration: none;
}
.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus,
.btn-toggle-nav a.active {
  background-color: #d2f4ea;
}

.scrollarea {
  overflow-y: auto;
}

.fw-semibold { font-weight: 600; }
.lh-tight { line-height: 1.25; }

table, th, td {
  border: 1px solid;
}
</style>
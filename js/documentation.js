
// ######################################################
// Variables.
// ######################################################

// Save the current opened section.
var current_section = "general";
var root_element = null;
var loader = null;
var main_content = null;
var general = null;

// Default prototype.
var prototype = {
    loaded: false,
    root: null,
    title: 'Scarface The World Is Yours',
    breadcrumb: [
        {
            name: 'Documentation',
            href: 'documentation.html'
        }
    ],
    content: null,
    load(ref, cb){
        if(this.loaded==true) return;
        LoadData(ref, function(){
            cb(ref);
        })
    }
}

general = Object.assign({}, prototype);
general.root = "general";
general.breadcrumb.push({
    name: 'General',
    href: 'general.html'
});
general.content = [
    "Characters",
    "Vehicles",
    "Planes",
    "Helicopters",
    "Boats",
    "Natives",
];
window.api = [];
window.api['general'] = general;

// ######################################################
// Functions.
// ######################################################

function FormatID(str){
    return str.replace(/\s/g, '_').toUpperCase();
}

function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
};

function LoadPrototypes(){
    var assets = window.api.general.content.length;
    general.template_section = tmpl("tmpl-general", window.api['general']);
    document.getElementById("general").innerHTML = general.template_section;
    window.api["general"].element = document.getElementById("section-general");
    for(var i = 0; i < window.api.general.content.length; i++){
        var model = window.api.general.content[i].toLowerCase();
        window[model] = Object.assign({}, prototype);
        window[model].root = model;
        window[model].breadcrumb.push({
            name: model,
            href: model+'.html'
        });
        window.api[window[model].root] = window[model];
        window.api[window[model].root].load(window[model], function(target){
            target.template_list = tmpl("list-menu", target);
            target.template_section = tmpl("tmpl-"+target.root, target);
            assets--;
            if(assets == 0) LoadTemplates();
        });
    }
}

function LoadData(root, cb){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            root.content = data;
            cb();
        }
    };
    xmlhttp.open("GET", "/api/"+root.root+".json", true);
    xmlhttp.send();
}

function LoadTemplates(){
    // Load left menu.
    document.getElementById('list-general').innerHTML = tmpl('tmpl-general-menu', window.api['general']);
    
    // Load sections. 
    for( var key in window.api ) {
        if( window.api.hasOwnProperty(key) ) {
            console.log(window.api[key])
            if(key != 'general') {
                // Load left menu items.
                document.getElementById('menu-'+key).innerHTML = window.api[key].template_list;

                var model_region = document.createElement("div");
                model_region.id = "section-"+key;
                model_region.classList.add("d-none");
                model_region.classList.add("section");
                model_region.classList.add("w-100");
                model_region.classList.add("twelve");
                model_region.innerHTML = window.api[key].template_section;
                root_element.appendChild(model_region);
                window.api[key].element = model_region;
            }
        }
    }

    // Register event listeners.
    // Left menu items.
    var summary_nodes = document.querySelectorAll("summary");
    for(var i = 0; i < summary_nodes.length; i++){
        summary_nodes[i].onclick = function(evt){
            var apipage = evt.target.getAttribute("data-apipage");
            console.log(apipage)
            var sections = document.getElementsByClassName("section");
            for(var i = 0; i < sections.length; i++)
                sections[i].classList.add("d-none");
            window.api[apipage].element.classList.remove("d-none");
            current_section = apipage;
        }
    }

    // Left menu sub-items.
    var subitems = document.querySelectorAll(".tree-nam__subitem");
    for(var i = 0; i < subitems.length; i++){
        subitems[i].onclick = function(evt){
            evt.preventDefault();
            var anchor = document.getElementById(evt.target.getAttribute("href"));
            if(anchor)
                anchor.scrollIntoView()
        }
    }

    // Hide the loader.
    loader.style.display = "none";
    // Show the main content.
    main_content.style.display = "flex";
}

// Create the event listener for know when the DOM content is loaded.
document.addEventListener("DOMContentLoaded", function(){
    // Get the root element.
    root_element = document.getElementById("general");
    // Get the main content element.
    main_content = document.getElementById("main-content");
    // Get the loader element.
    loader = document.querySelector(".loader");
    // Load each prototype.
    LoadPrototypes();
});

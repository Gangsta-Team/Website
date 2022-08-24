var current_section = null;

window['APIDataLoaded'] = function(){
    if(window.general.loaded && window.characters.loaded && window.vehicles.loaded && window.boats.loaded){
        document.getElementById('general').innerHTML = '<div id="list-general" class="twelve"></div>'; 
        document.getElementById('list-general').innerHTML = tmpl('tmpl-general-right-menu', window.general);
        document.querySelector('.menu-characters').innerHTML = tmpl('tmpl-characters', window.characters);
        document.querySelector('.menu-vehicles').innerHTML = tmpl('tmpl-vehicles', window.vehicles);
        document.querySelector('.menu-boats').innerHTML = tmpl('tmpl-boats', window.boats);
        var summary_nodes = document.querySelectorAll("summary");
        for(var i = 0; i < summary_nodes.length; i++){
            summary_nodes[i].onclick = function(evt){
                const styles = window.getComputedStyle(evt.target, '::before');
                const content = styles.transform;
                if(/*content === 'none'&& */evt.target.getAttribute("data-page") != null){   
                    current_section = evt.target.getAttribute("data-page");
                    document.getElementById('general').innerHTML = '<div id="list-'+current_section+'" class="twelve"></div>';                    
                    document.getElementById('list-'+current_section).innerHTML = tmpl('tmpl-'+current_section+'-right-menu', window[evt.target.getAttribute("data-page")])
                }
            }
        }
        var subitems = document.querySelectorAll(".tree-nam__subitem");
        for(var i = 0; i < subitems.length; i++){
            subitems[i].onclick = function(evt){
                evt.preventDefault();
                if(evt.target.getAttribute("data-page") != current_section){
                    current_section = evt.target.getAttribute("data-page");
                    document.getElementById('general').innerHTML = '<div id="list-'+current_section+'" class="twelve"></div>';                    
                    document.getElementById('list-'+current_section).innerHTML = tmpl('tmpl-'+current_section+'-right-menu', window[evt.target.getAttribute("data-page")])
                }
                var anchor = document.getElementById(evt.target.getAttribute("href"));
                anchor.scrollIntoView()
            }
        }
    }
};

window['LoadData'] = function(url, cb){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            cb(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

document.addEventListener("DOMContentLoaded", function(){
    window.general.load();
    window.characters.load();
    window.vehicles.load();
    window.boats.load();
});
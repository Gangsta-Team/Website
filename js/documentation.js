window['APIDataLoaded'] = function(){
    if(window.characters.loaded && window.vehicles.loaded){
        document.getElementById('menu-characters').innerHTML = tmpl('tmpl-characters', window.characters.content)
        document.getElementById('menu-vehicles').innerHTML = tmpl('tmpl-vehicles', window.vehicles.content)

        var summary_nodes = document.querySelectorAll("summary");
        console.log(summary_nodes)
        for(var i = 0; i < summary_nodes.length; i++){
            summary_nodes[i].onclick = function(evt){
                const styles = window.getComputedStyle(evt.target, '::before');
                const content = styles.transform;
                if(content === 'none'&& evt.target.getAttribute("data-page") != null){
                    console.log(evt.target.getAttribute("data-page"))
                    document.getElementById('list-vehicles').innerHTML = tmpl('tmpl-vehicles-right-menu', window.vehicles.content)

                    /*
                    $("#right-menu").load(evt.target.getAttribute("data-page")+".html");
                    GetPage(evt.target.getAttribute("data-page") + ".html", function(response){
                        var LoadScript = new Function($('script#'+evt.target.getAttribute("data-page"),response).text());
                        LoadScript();
                        LoadMain();
                    });*/
                }
            }
        }
    }
};


function CreateElementFromHTML(str) {
    var div = document.createElement('div');
    div.innerHTML = str.trim();
    return div;
}

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

function GetPage(url, cb){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            cb(xhr.responseText);
        }
    }
    xhr.send();
}

var data_loaded = false;

document.addEventListener("DOMContentLoaded", function(){
    window.characters.load();
    window.vehicles.load();
});
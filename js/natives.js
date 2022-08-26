window['natives'] = {
    loaded: false,
    title: 'Scarface The World Is Yours: Natives',
    breadcrumb: [
        {
            name: 'Documentation',
            href: 'documentation.html'
        },
        {
            name: 'natives',
            href: 'natives.html'
        }
    ],
    content: null,
    load(cb){
        LoadData("api/natives.json", function(data){
            window.natives.loaded = true;
            window.natives.content = data;
            window.APIDataLoaded();
        })
    }
};
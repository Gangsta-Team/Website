window['characters'] = {
    loaded: false,
    title: 'Scarface The World Is Yours: Characters',
    breadcrumb: [
        {
            name: 'Documentation',
            href: 'documentation.html'
        },
        {
            name: 'Characters',
            href: 'characters.html'
        }
    ],
    content: null,
    load(cb){
        LoadData("/documents/api/characters.json", function(data){
            window.characters.loaded = true;
            window.characters.content = data;
            window.APIDataLoaded();
        })
    }
};
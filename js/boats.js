window['boats'] = {
    loaded: false,
    title: 'Scarface The World Is Yours: Boats',
    breadcrumb: [
        {
            name: 'Documentation',
            href: 'documentation.html'
        },
        {
            name: 'boats',
            href: 'boats.html'
        }
    ],
    content: null,
    load(cb){
        LoadData("api/boats.json", function(data){
            window.boats.loaded = true;
            window.boats.content = data;
            window.APIDataLoaded();
        })
    }
};
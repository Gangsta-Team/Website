window['planes'] = {
    loaded: false,
    title: 'Scarface The World Is Yours: planes',
    breadcrumb: [
        {
            name: 'Documentation',
            href: 'documentation.html'
        },
        {
            name: 'planes',
            href: 'planes.html'
        }
    ],
    content: null,
    load(cb){
        LoadData("api/planes.json", function(data){
            window.planes.loaded = true;
            window.planes.content = data;
            window.APIDataLoaded();
        })
    }
};
window['helicopters'] = {
    loaded: false,
    title: 'Scarface The World Is Yours: Helicopters',
    breadcrumb: [
        {
            name: 'Documentation',
            href: 'documentation.html'
        },
        {
            name: 'helicopters',
            href: 'helicopters.html'
        }
    ],
    content: null,
    load(cb){
        LoadData("api/helicopters.json", function(data){
            window.helicopters.loaded = true;
            window.helicopters.content = data;
            window.APIDataLoaded();
        })
    }
};
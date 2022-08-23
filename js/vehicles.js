window['vehicles'] = {
    loaded: false,
    title: 'Scarface The World Is Yours: Vehicles',
    breadcrumb: [
        {
            name: 'Documentation',
            href: 'documentation.html'
        },
        {
            name: 'Vehicles',
            href: 'vehicles.html'
        }
    ],
    content: null,
    load(cb){
        LoadData("api/vehicles.json", function(data){
            window.vehicles.loaded = true;
            window.vehicles.content = data;
            window.APIDataLoaded();
        })
    }
};
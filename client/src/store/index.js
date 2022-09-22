import { createStore } from 'vuex'

export default createStore({
    state: {
        last_route: null,
        loading: false
    },
    mutations: {
        setLastRoute(state, params){
            state.last_route = params;
        },
        setLoading(state, params){
            state.loading = params;
        }
    },
    actions: {
    },
    modules: {
    }
})

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Documentation from '../views/Documentation.vue'

import Game from '../views/game/Game.vue'
import Characters from '../views/game/Characters.vue'
import Vehicles from '../views/game/Vehicles.vue'
import Helicopters from '../views/game/Helicopters.vue'
import Boats from '../views/game/Boats.vue'
import Planes from '../views/game/Planes.vue'
import Natives from '../views/Natives.vue'
import Internals from '../views/Internals.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            breadcrumb: [
                {
                    name: "Home"
                }
            ]
        },
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/documentation',
        name: 'Documentation',
        component: Documentation,
        meta: {
            breadcrumb: [
                {
                    name: "Documentation",
                    class: "bc-link"
                }
            ]
        },
        children: [
            {
                path: 'game',
                name: 'Game',
                component: Game,
                meta: {
                    breadcrumb: [
                        {
                            name: "Documentation",
                            link: "Documentation",
                            class: "bc-link"
                        },
                        {
                            name: "Game",
                            class: "bc-link-active"
                        },
                    ]
                },
                children: [
                    {
                        path: 'characters',
                        name: 'Characters',
                        component: Characters,
                        meta: {
                            breadcrumb: [
                                {
                                    name: "Documentation",
                                    link: "Documentation",
                                    class: "bc-link"
                                },
                                {
                                    name: "Characters",
                                    class: "bc-link-active"
                                },
                            ]
                        },
                    },
                    {
                        path: 'vehicles',
                        name: 'Vehicles',
                        component: Vehicles,
                        meta: {
                            breadcrumb: [
                                {
                                    name: "Documentation",
                                    link: "Documentation",
                                    class: "bc-link"
                                },
                                {
                                    name: "Vehicles",
                                    class: "bc-link-active"
                                },
                            ]
                        },
                    },
                    {
                        path: 'helicopters',
                        name: 'Helicopters',
                        component: Helicopters,
                        meta: {
                            breadcrumb: [
                                {
                                    name: "Documentation",
                                    link: "Documentation",
                                    class: "bc-link"
                                },
                                {
                                    name: "Helicopters",
                                    class: "bc-link-active"
                                },
                            ]
                        },
                    },
                    {
                        path: 'boats',
                        name: 'Boats',
                        component: Boats,
                        meta: {
                            breadcrumb: [
                                {
                                    name: "Documentation",
                                    link: "Documentation",
                                    class: "bc-link"
                                },
                                {
                                    name: "Boats",
                                    class: "bc-link-active"
                                },
                            ]
                        },
                    },
                    {
                        path: 'planes',
                        name: 'Planes',
                        component: Planes,
                        meta: {
                            breadcrumb: [
                                {
                                    name: "Documentation",
                                    link: "Documentation",
                                    class: "bc-link"
                                },
                                {
                                    name: "Planes",
                                    class: "bc-link-active"
                                },
                            ]
                        },
                    }
                ]
            }
        ]
    },
    {
        path: '/documentation/game/natives',
        name: 'Natives',
        component: Natives,
        meta: {
            breadcrumb: [
                {
                    name: "Documentation",
                    link: "Documentation",
                    class: "bc-link"
                },
                {
                    name: "Natives",
                    class: "bc-link-active"
                },
            ]
        },
    },
    {
        path: '/documentation/game/internals',
        name: 'Internals',
        component: Internals,
        meta: {
            breadcrumb: [
                {
                    name: "Documentation",
                    link: "Documentation",
                    class: "bc-link"
                },
                {
                    name: "Internals",
                    class: "bc-link-active"
                },
            ]
        },
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    //linkActiveClass: "active font-weight-light text-decoration-none text-light",
    //linkExactActiveClass: "text-white font-weight-bold text-decoration-underline",
    routes
})

export default router

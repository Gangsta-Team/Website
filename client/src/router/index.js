import { createRouter, createWebHistory } from 'vue-router'
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
                    name: "Documentation"
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
                            link: "Documentation"
                        },
                        {
                            name: "Game"
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
                                    link: "Documentation"
                                },
                                {
                                    name: "Characters"
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
                                    link: "Documentation"
                                },
                                {
                                    name: "Vehicles"
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
                                    link: "Documentation"
                                },
                                {
                                    name: "Helicopters"
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
                                    link: "Documentation"
                                },
                                {
                                    name: "Boats"
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
                                    link: "Documentation"
                                },
                                {
                                    name: "Planes"
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
                    link: "Documentation"
                },
                {
                    name: "Natives"
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
                    link: "Documentation"
                },
                {
                    name: "Internals"
                },
            ]
        },
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    linkActiveClass: "active font-weight-light text-decoration-none text-light",
    linkExactActiveClass: "text-white font-weight-bold text-decoration-underline",
    routes
})

export default router

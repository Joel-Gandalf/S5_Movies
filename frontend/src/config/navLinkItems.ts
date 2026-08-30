import type { NavLinkItem } from "../types/NavLinkItem";

export const navLinkItems: NavLinkItem[] = [
    {
        id: 'home',
        label: 'Inicio',
        path: '/',
        ariaLabel: 'Ir a inicio' 
    },
    {
        id: 'explore',
        label: 'Explora',
        path: '/explore',
        ariaLabel: 'Ir a Exploración de películas' 
    },
    {
        id: 'favorites',
        label: 'Favoritos',
        path: '/favorites',
        ariaLabel: 'Ir a lista de películas favoritas'
    },   
]
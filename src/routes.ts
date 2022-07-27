export interface IMenuItem {
    text: string
    route: string
}

export const menuItems: IMenuItem[] = [{
    text: 'Explore',
    route: 'explore'
}, {
    text: 'Create',
    route: 'create'
}, {
    text: 'Stats',
    route: 'stats'
}]

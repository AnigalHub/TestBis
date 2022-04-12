export default [
    {
        path:'/',
        name: 'Account',
        component:() => import('./components/account'),
    },
    {
        path:'/operatingDays',
        name: 'OperatingDays',
        component:() => import('./components/operatingDays'),
    },
    {
        path:'/operations',
        name: 'Operations',
        component:() => import('./components/operations'),
    },
]

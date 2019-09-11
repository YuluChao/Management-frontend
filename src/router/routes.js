import contact from '../components/page/contact'
import club from '../components/page/club'
import activity from '../components/page/activity'
import admin from '../components/page/admin'
import basic from '../components/page/basic'
import department from '../components/page/department'
import login from '../components/page/login'

const routes = [
  {
    path: '/club/',
    name: 'club',
    component: club,
    children: [
      {
        path: '/club/basic/',
        component: basic,
        name: 'basic'
      },
      {
        path: '/club/department/',
        component: department,
        name: 'department'
      },
      {
        path: '/club/activity/',
        component: activity,
        name: 'activity'
      },
      {
        path: '/club/admin/',
        component: admin,
        name: 'admin'
      },
      {
        path: '/club/contact/',
        component: contact,
        name: 'contact'
      }
    ]
  },
  {
    path: '/',
    redirect: '/club/login'
  },
  {
    path: '/club/login',
    component: login,
    name: 'login'
  }
]

export default routes

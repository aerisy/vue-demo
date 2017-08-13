import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import BasicTable from '@/pages/BasicTable'
import EditableTable from '@/pages/EditableTable'
import Widget from '@/pages/Widget'
import ImageList from '@/pages/ImageList'
import Charts from '@/pages/Charts'
import Login from '@/pages/Login'
import LockScreen from '@/pages/LockScreen'
import DataDemo from '@/pages/DataDemo'
import TagDemo from '@/pages/TagDemo'
import MapDemo from '@/pages/MapDemo'
import MapDemo2 from '@/pages/MapDemo2'
import TreeDemo from '@/pages/TreeDemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'widget',
          name: 'Widget',
          component: Widget
        },
        {
          path: 'imagelist',
          name: 'ImageList',
          component: ImageList
        },
        {
          path: 'basic-table',
          name: 'BasicTable',
          component: BasicTable
        },
        {
          path: 'editable-table',
          name: 'EditableTable',
          component: EditableTable
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'datademo',
          name: 'DataDemo',
          component: DataDemo
        },
        {
          path: 'tagdemo',
          name: 'TagDemo',
          component: TagDemo
        },
        {
          path: 'mapdemo',
          name: 'MapDemo',
          component: MapDemo
        },
        {
          path: 'mapdemo2',
          name: 'MapDemo2',
          component: MapDemo2
        },
        {
          path: 'treedemo',
          name: 'TreeDemo',
          component: TreeDemo
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        blank: Login
      }
    },
    {
      path: '/lockscreen',
      name: 'Lockscreen',
      components: {
        blank: LockScreen
      }
    }
  ]
})

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Dashboard',
//       component: Dashboard
//     },
//     {
//       path: '/basic-table',
//       name: 'BasicTable',
//       component: BasicTable
//     },
//     {
//       path: '/editable-table',
//       name: 'EditableTable',
//       component: EditableTable
//     },
//     {
//       path: '/widget',
//       name: 'Widget',
//       component: Widget
//     },
//     {
//       path: '/charts',
//       name: 'Charts',
//       component: Charts
//     }
//   ]
// })

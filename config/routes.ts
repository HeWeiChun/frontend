export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  // { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  // {
  //   path: '/admin',
  //   name: '管理页',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     { path: '/admin', redirect: '/admin/sub-page' },
  //     { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
  //   ],
  // },
  // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { name: '概况', icon: 'smile', path: '/abstract', component: './AbstractAntv'},
  { name: '概况_新', icon: 'smile', path: '/abstractnew', component: './Abstract'},
  { name: '任务管理', icon: 'table', path: '/task', component: './Task' },
  {name: '任务详情', icon: 'profile', path: '/taskdetail', component: './TaskDetail'},
  { path: '/', redirect: '/task' },
  { path: '*', layout: false, component: './404' },
];

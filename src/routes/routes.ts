type Route = {
  path: string
  exact?: boolean
  [nextPath: string]: Route | string | boolean | undefined
}

interface IRoutes {
  [key: string]: Route
}

const routes: IRoutes = {
  home: {
    path: '/',
    exact: true,
  },
  login: {
    path: '/login',
    exact: true,
    resetPassword: {
      path: '/login/reset-password',
      exact: true,
      withToken: {
        path: '/login/reset-password/:token',
        exact: true,
      },
    },
  },
}

export default routes

const routes = {
  documents: {
    path: '/documents',
    exact: true,
    singleDoc: {
      path: '/documents/:id',
      exact: true,
    },
  },
  support: {
    path: '/contact',
    exact: true,
  },
  changeEmailWithToken: {
    path: '/change-email/:token',
    exact: true,
  },
  notFound: {
    path: '/not-found',
    exact: true,
  },
}

export default routes

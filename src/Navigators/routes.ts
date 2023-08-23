const routes = {
  home: {
    path: '/',
  },
  auth: {
    path: '/auth',
    login: {
      path: '/auth/login',
    },
    register: {
      path: '/auth/register',
    },
    resetPassword: {
      path: '/auth/reset-password',
    },
    emailConfirmation: {
      path: '/auth/email-confirmation',
    },
    changePassword: {
      path: '/auth/change-password',
    },
  },
}

export default routes

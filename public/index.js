import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://dev-900308.com/oauth2/default',
  client_id: '0oaecgiijpEcDM1aR0h7',
  redirect_uri: 'http://localhost:8000/implicit/callback',
  scope: 'openid profile email'
})

const router = new Router ({
  ...
  mode: 'history',
  routes: [
    {path: '/implicit/callback', component: Auth.handleCallback()},
    ...
  ]
})

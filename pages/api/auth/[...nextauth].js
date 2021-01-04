import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import userDB from '../../../util/user';
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const options = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    })
  ],
  // Enable debug messages in the console if you are having problems
    events: {
    signIn: async (message) => {/*console.log("Create User------------\n");console.log(message);userDB(message.user);*/  },
    createUser: async (message) => {   },
  }
}
//http://localhost:3000/api/auth/callback/auth0
export default (req, res) => NextAuth(req, res, options)
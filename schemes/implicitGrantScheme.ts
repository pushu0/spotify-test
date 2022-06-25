import { Oauth2Scheme } from '@nuxtjs/auth-next/dist/runtime.js'
import { parseQuery } from '~/utils/query'

export default class ImplicitGrantScheme extends Oauth2Scheme {
  check() {
    const response = {
      valid: false,
    }

    const hash = this.$auth.ctx.route.hash.substr(1)
    const parsedQuery = parseQuery(hash)
    const storedState = this.$auth.$storage.getUniversal(this.name + '.state')
    const receivedState = parsedQuery.state

    const isValidState = storedState === receivedState

    if (!isValidState) return response
    response.valid = true

    const token = parsedQuery.access_token
    if (token) this.token.set(token)

    return response
  }
}

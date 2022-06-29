# spotify

## Instructions

1. Create a `CLIENT_ID` in spotify developers [dashboard](https://developer.spotify.com/)
2. Add `Redirect URIs` -> `http://localhost:3000/callback`
3. Add `Users`
4. Create `.env` file in the root directory
5. Add `CLIENT_ID=STEP1_CLIENT_ID`

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

## SSR / Client only

App works both in ssr mode or client only with one caveat, in client only authentication only works via the `Implicit Grant` option. The key validation gets done on client side in this case.

For security reasons I've added the option to login via the `OAuth2` standard with ssr validation.

### Future Improvements

- logout functionality
- refetch recently played tracks when currently played song changes
- pagination or infinite scrolling
- deep link to play the tracks when clicking on them
- more testing (store, api)

### Tradeoffs

- using Vuetify adds a lot of weight, probably for this small app a much better choice would've been a css only library
- using `component is: ` along with a Vuetify component, doesn't play nicely unless treeshaking is disabled or the respective components get imported individually, which then causes an issue when transpiling in jest - thus for the purpose of this exercise I've disabled vuetify treeshaking

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

- pagination or infinite scrolling
- deep link to play the tracks when clicking on them

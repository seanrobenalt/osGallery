### osGallery

Android app for [Ethereum OS](https://www.ethosmobile.org/) devices to view the NFT's in the system-level wallet.

Check out a screen recording of the app on an Android device running ethOS [here](https://youtube.com/shorts/VfMgxOfwu_E?feature=share)

#### Running the App

You'll need a development build installed on an Android. You can generate one in your own [Expo](https://expo.dev) account with `npm run build:dev`. Install it on your Android device or emulator.

You'll need an [Alchemy](https://docs.alchemy.com/reference/getnftsforowner-v3), API key. Use that in `components/Main.js` to retrieve NFT data. 

For testing, if you don't have an ethOS device you can just hardcode an address to lookup and comment out any of the `ExpoWalletsdk` code.

Then:

- Clone the app
- Run `npm i`
- Run `npx expo start`
- Open app on your Android
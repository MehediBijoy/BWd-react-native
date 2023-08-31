This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android

# generate keystore
cd android/app
sudo keytool -genkey -v -keystore brettonwoods-gold.keystore -alias brettonwoods-key-alias -keyalg RSA -keysize 2048 -validity 10000


#create personal config
create file gradle.properties in your home directory under .gradle folder (~/.gradle/gradle.properties) and add following content

STORE_FILE=brettonwoods-gold.keystore
KEY_ALIAS=brettonwoods-key-alias
STORE_PASSWORD=******
KEY_PASSWORD=******

#build release apk
yarn build

#Generating the release AAB
npx react-native build-android --mode=release
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

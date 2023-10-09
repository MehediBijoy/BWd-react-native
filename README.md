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

# For Android

This readme outlines the process for building and publishing a React Native Android app. Please follow these steps carefully to ensure a smooth build and publication process. Make sure you have already completed the initial system setup and simulator setup as specified in the [react native official documentation](https://reactnative.dev/docs/environment-setup)

### Installing dependencies and development environment

You will need Node, the React Native command line interface, a JDK, and Android Studio.

Please verify the [link](https://reactnative.dev/docs/environment-setup#installing-dependencies) to ensure that the necessary dependencies are properly configured.

Prior to commencing the Android app development, make sure you have Yarn installed on your system. If it's not already installed, you can do so by executing the following command:

```shell
npm install -g yarn
```

Now, navigate to the root directory of your React Native project and run the following command to install all required android dependencies defined in your package.json:

```shell
yarn android
```

To create an APK file, execute the following command:

```shell
yarn build
```

## Publishing to Google Play Store

Android requires that all apps be digitally signed with a certificate before they can be installed. In order to distribute your Android application via Google Play store it needs to be signed with a release key that then needs to be used for all future updates. Since 2017 it is possible for Google Play to manage signing releases automatically. However, before your application binary is uploaded to Google Play it needs to be signed with an upload key. The Signing Your Applications page on Android Developers documentation describes the topic in detail.

## Generating an upload key

You can generate a private signing key using **keytool**.
Please execute the following command to generate the keystore for Android:

```bash
cd android/app && sudo keytool -genkey -v -keystore brettonwoods-gold.keystore -alias brettonwoods-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

> **CAUTION**
> Remember to keep the keystore file private. In case you've lost upload key or it's been compromised you should follow these [instructions](https://support.google.com/googleplay/android-developer/answer/9842756?visit_id=638324443352545255-3013092957&rd=1#reset).

## Setting up Gradle variables

Create a file named gradle.properties in your home directory within the .gradle folder (usually located at ~/.gradle/gradle.properties) and insert the following content:

```bash
STORE_FILE=brettonwoods-gold.keystore
KEY_ALIAS=brettonwoods-key-alias
STORE_PASSWORD=******
KEY_PASSWORD=******
APP_VERSION_CODE=1 #Please use numerical digits.
APP_VERSION_NAME=beta-1.0.1
```

## Generating the release AAB

Run the following command in a terminal:

```bash
yarn prod-build
```

# For iOS

This readme outlines the process for building and publishing a React Native iOS app. Please follow these steps carefully to ensure a smooth build and publication process. Make sure you have already completed the initial system setup and simulator setup as specified in the [react native official documentation](https://reactnative.dev/docs/environment-setup)

### Installation of React Native Dependencies for iOS Build

> **Important**
> Before started iOS build must check two official docs for setup system properly. Please check both links [system setup docs](https://reactnative.dev/docs/environment-setup) and [run ios app in simulator](https://reactnative.dev/docs/running-on-simulator-ios)

Before you start building the iOS app, ensure that you have yarn installed on your machine. If not, you can install it using the following command:

```shell
npm install -g yarn
```

Now, navigate to the root directory of your React Native project and run the following command to install all required iOS dependencies defined in your `package.json`:

```shell
npx pod-install
```

It will installed all required packages (`already defined in package.json`) for build ios app. If there is any issue with install `npx pod-install` there might be re-iterate again official docs and install all required things properly.

### Publishing to the Apple App Store

> **Important**
> Before started iOS app published to apple app store please the [official docs](https://reactnative.dev/docs/publishing-to-app-store) first

Follow the steps below to prepare your app for publishing:

### 1. Open Your Project in Xcode

Go to the `~/platform-app/ios` directory and open `PlatformApp.xcworkspace` file. Please make sure you have selected `PlatformApp.xcworkspace` file not <span style='color: red'>PlatformApp.xcodeproj</span> file. IDouble-clicking on this file will open your project in `Xcode`.

### 2. Developer Account

To publish your app to the Apple App Store, you'll need an active Apple Developer account. Here's how to log in with your Apple Developer account credentials in Xcode:

1. Open Xcode if it's not already open.

2. In the top menu bar, click on `Xcode`.

3. Select `Preferences`.

4. In the Preferences window, click on the `Accounts` tab.

5. You may see a list of accounts if you've added one previously. If not, click the `+` button at the bottom left corner of the Accounts tab.

6. Choose `Apple ID` as the account type.

7. Sign in with your Apple Developer account credentials (Apple ID and password).

This step is crucial for code signing, app provisioning, and distribution. It ensures that your app is associated with your Apple Developer account, allowing you to publish it to the App Store. Make sure you've completed this step before proceeding further in the app publishing process.

### 3. Prepare App Build Settings

In Xcode, it's crucial to configure your app's build settings correctly to ensure a successful deployment. Follow these detailed steps to set up your app's build settings:

- Open Xcode and load your project (in our case, it's `PlatformApp`).

- Make sure that the target selected in Xcode matches the name of your app (in our case, it's `PlatformApp`). To verify this, look for the target selection dropdown in the top left corner of the Xcode window. Ensure it's set to the same name as your app.

- Navigate to the `Signing & Capabilities` tab by following these steps:

  - In Xcode, click on the name of your project in the project navigator on the left-hand side.
  - In the main window, you'll see several tabs at the top, including "General," "Signing & Capabilities," "Build Settings," and more. Click on "Signing & Capabilities."

- Configure the following settings within the `Signing & Capabilities` tab:

  - **Select your Developer Team**: From the "Team" dropdown menu, choose the appropriate developer team associated with your Apple Developer account. This team ensures that your app is properly signed and associated with your developer account.

  - **Bundle Identifier**: Verify that the bundle identifier matches the one you've registered on your Apple Developer account. The bundle identifier should be in reverse domain notation (e.g., `com.yourcompany.appname`). This identifier must match what you've set up in your Apple Developer account for the app.

  - **Provisioning Profile**: Xcode should automatically assign a provisioning profile based on your team selection and bundle identifier. You generally don't need to manually configure this unless you encounter specific issues. Ensure that it shows a valid provisioning profile associated with your app.

These settings are crucial for code signing and ensuring that your app can be deployed to a physical device or submitted to the App Store. Double-check that all information is accurate and that there are no warnings or errors in this section. Address any issues that may arise during this configuration to ensure a smooth build and deployment process.

Once you've configured these settings correctly, you are ready to proceed with building and archiving your React Native iOS app for distribution.

### 4. Build for Production

Now, you are ready to build your app for production. Follow these steps:

- In Xcode, select the appropriate Apple device from the device dropdown.
- Go to the top menu and click on Product.
- Under the Build submenu, select Build.

Xcode will compile and build your React Native app for iOS in production mode. Any errors or issues during this process will be displayed in the Xcode interface, and you can address them accordingly.

### 5. Create an Archive

Once you have successfully built your React Native app for iOS in production mode, the next step is to create an archive of your app. Archiving is a necessary step before you can submit your app to the Apple App Store.

Follow these steps to create an archive:

- In Xcode, make sure your project is still open.
- Go to the top menu and click on `Product`.
- Under the `Archive` submenu, select `Archive`.

Xcode will begin the archiving process, which involves packaging your app for distribution. During this process, Xcode will check for any additional errors or issues that may arise during the archiving process.

### 6. Validate and Distribute

After the archiving process is complete, Xcode will open the Organizer window, showing your archived app. From here, you can perform the following actions:

- **Validate**: Click the "Validate" button to perform a validation check on your app. This step ensures that your app meets all the necessary requirements and guidelines for submission to the App Store. Address any issues or warnings that may appear during validation.

- **Distribute**: Once your app passes validation, you can click the "Distribute" button to initiate the distribution process. Follow the on-screen instructions to select the distribution method (App Store Connect, Ad-Hoc, or Enterprise) and complete the necessary steps to prepare your app for submission.

#### 7. Submit to the Apple App Store

After successfully validating and distributing your archived app, you are now ready to submit it to the Apple App Store. Follow the steps outlined in the [official React Native documentation on publishing to the App Store](https://reactnative.dev/docs/publishing-to-app-store) to complete the submission process.

Congratulations! Your React Native iOS app is now ready for submission to the Apple App Store. Ensure that you follow the guidelines and requirements provided by Apple during the submission process for a smooth release.

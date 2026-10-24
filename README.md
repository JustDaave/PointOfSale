# Point of Sale

DESIGNED FOR TABLET AND MOBILE

A responsive React Native point-of-sale app built with Expo SDK 57 and Expo Router, styled with Material Design 3. Staff sign in with a PIN, build orders from the menu, and print a receipt at checkout. Customers can be added by scanning the barcode on their driver's license, which shows their age, ID validity, visits, and favorite products. Orders and customers are saved on the device, and the app has a light and dark theme.


## Extra Expo packages

- [`expo-symbols`](https://docs.expo.dev/versions/v57.0.0/sdk/symbols/) — cross-platform SF Symbols and Material Symbols.
- [`expo-status-bar`](https://docs.expo.dev/versions/v57.0.0/sdk/status-bar/) — native status bar styling.
- [`expo-print`](https://docs.expo.dev/versions/v57.0.0/sdk/print/) — generates an itemized receipt and opens the native Android or iOS print dialog during checkout.
- [`expo-camera`](https://docs.expo.dev/versions/v57.0.0/sdk/camera/) — scans the PDF417 barcode on the back of a driver's license and takes a photo of the ID.
- [`@react-native-async-storage/async-storage`](https://docs.expo.dev/versions/v57.0.0/sdk/async-storage/) — saves orders, customers, and the theme setting on the device.
- [`expo-file-system`](https://docs.expo.dev/versions/v57.0.0/sdk/filesystem/) — copies ID photos into the app's document folder so they are kept after a restart.
- [`expo-image-picker`](https://docs.expo.dev/versions/v57.0.0/sdk/imagepicker/) — on web, lets staff upload a photo of an ID barcode when the laptop camera can't read it.
- [`barcode-detector`](https://github.com/Sec-ant/barcode-detector) — ZXing barcode reader used on web, because Chrome's built-in reader can find an ID barcode but return empty text.
- [`expo-haptics`](https://docs.expo.dev/versions/v57.0.0/sdk/haptics/) — vibration feedback when scanning an ID, adding items, and entering a wrong PIN.

Expo Router is also provided by `expo-router` for file-based navigation, route parameters, and protected routes.

## Screenshots

### Register and order

![Frame 1](./Frame1.png)

### Staff sign-in

![Frame 2](./Frame2.png)

### Identification results

![Frame 3](./Frame3.png)

### Mobile register

![Mobile](./Mobile.png)

## Run locally

```bash
npm install
npm start
```

This starts the Expo development server in localhost mode for an emulator, simulator, or web browser running on the same computer.

### Physical device

To run the app in Expo Go on a separate phone or tablet, use tunnel mode:

```bash
npm install
npm run start:tunnel
```

Keep the terminal running and scan the displayed QR code using Expo Go. Tunnel mode is recommended because school, public, or guest Wi-Fi may prevent devices from communicating directly. On a physical iPhone, sign in to the same Expo account in Expo Go and Expo CLI if prompted.

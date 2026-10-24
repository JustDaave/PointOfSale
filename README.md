# Point of Sale

DESIGNED FOR TABLET AND MOBILE

A responsive React Native point-of-sale app built with Expo SDK 57 and Expo Router. Staff can choose a profile, enter a PIN, search and filter the menu, build an order, adjust quantities, and complete payment with immediate on-screen feedback.


## Extra Expo packages

- [`expo-symbols`](https://docs.expo.dev/versions/v57.0.0/sdk/symbols/) — cross-platform SF Symbols and Material Symbols.
- [`expo-status-bar`](https://docs.expo.dev/versions/v57.0.0/sdk/status-bar/) — native status bar styling.
- [`expo-print`](https://docs.expo.dev/versions/v57.0.0/sdk/print/) — generates an itemized receipt and opens the native Android or iOS print dialog during checkout.
- [`expo-camera`](https://docs.expo.dev/versions/v57.0.0/sdk/camera/) — scans the PDF417 barcode on the back of a driver's license and takes a photo of the ID.
- [`@react-native-async-storage/async-storage`](https://docs.expo.dev/versions/v57.0.0/sdk/async-storage/) — saves orders, customers, and the theme setting on the device.
- [`expo-file-system`](https://docs.expo.dev/versions/v57.0.0/sdk/filesystem/) — copies ID photos into the app's document folder so they are kept after a restart.
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

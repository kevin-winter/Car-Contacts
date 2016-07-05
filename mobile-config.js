/*
* Javascript Configuration for the Mobile Export (for example Android apk)
* Created by Rosel
* */
App.info({
  name: 'Car Contacts',
  description: 'Der Chat für Auto Fahrer',
  author: 'IMS15, Rosel, Teichert, Winter',
  email: 'info@fh-joanneum.at',
  website: 'https://fh-joanneum.at/',
  version: '1.0.0'
});

App.icons({
  // iOS
  'iphone_2x': 'resources/icons/icon-60-2x.png',
  'ipad': 'resources/icons/icon-76.png',
  'ipad_2x': 'resources/icons/icon-76-2x.png',
  'iphone_3x': 'resources/icons/icon-60-3x.png',

  // Android
  'android_mdpi': 'resources/icons/icon-48-mdpi.png',
  'android_hdpi': 'resources/icons/icon-72-hdpi.png',
  'android_xhdpi': 'resources/icons/icon-96-xhdpi.png',
  'android_xxhdpi': 'resources/icons/icon-144-xxhdpi.png',
  'android_xxxhdpi': 'resources/icons/icon-192-xxxhdpi.png'
});

App.launchScreens({
  // iOS
  'iphone_2x': 'resources/splash/screen-iphone-portrait-2x.png',
  'iphone5': 'resources/splash/screen-iphone-portrait-568h-2x.png',
  'ipad_portrait': 'resources/splash/screen-ipad-portrait.png',
  'iphone6p_portrait': 'resources/splash/screen-iphone6p-portrait.png',


  // Android
  'android_mdpi_portrait': 'resources/splash/screen-mdpi-portrait.png',
  'android_hdpi_portrait': 'resources/splash/screen-hdpi-portrait.png',
  'android_xhdpi_portrait':'resources/splash/screen-xhdpi-portrait.png',
  'android_xxhdpi_portrait':'resources/splash/screen-xxhdpi-portrait.png'
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');

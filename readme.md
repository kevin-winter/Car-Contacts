# Car-Contacts
Der Chat für Auto Fahrer

## Team Members
  - Josef Rosel
  - Kevin Winter

## Installation / Startup
### Node Packages installieren
```
npm install
```
### Meteor Server starten (Web Version)
```
meteor run
```
### Meteor Server starten mit Android App
```
meteor run android-device --mobile-server=<ip-address>:<port>;
```
### Meteor Server starten mit Android App
```
meteor run ios-device --mobile-server=<ip-address>:<port>;
```

## Problem Management
Falls sich Meteor nicht starten lässt, sind folgende Schritte auszuführen.

### Zeile entfernen
In client/styles chat.scss, chats.scss, login.scss, profile.scss die erste Zeile ausschneiden
```
@import '../../.meteor/local/build/programs/server/assets/packages/meteoric_ionicons-sass/ionicons';
```
### Entfernen und hinzufügen von Paketen
```
meteor remove fourseven:scss
meteor remove meteoric:ionic-sass
meteor remove meteoric:ionicons-sass
meteor add fourseven:scss@2.0.0
meteor add meteoric:ionic-sass
meteor add meteoric:ionicons-sass
```
### Meteor starten
```
meteor run
```
### Meteor beenden
Doppel Strg C
### Zeile einfügen
In client/styles chat.scss, chats.scss, login.scss, profile.scss die erste Zeile wieder einfügen.
```
@import '../../.meteor/local/build/programs/server/assets/packages/meteoric_ionicons-sass/ionicons';
```

### Meteor starten
```
meteor run
```
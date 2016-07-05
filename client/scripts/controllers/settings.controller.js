/*
* Angular Controller for Logging out
* 
* */
import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class SettingsCtrl extends Controller {
  logout() {
    Meteor.logout((err) => {
      if (err) return this.handleError(err);
      this.$state.go('login');
    })
  }

  handleError (err) {
    this.$log.error('Optionen speichern fehlgeschlagen ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Optionen speichern fehlgeschlagen',
      template: 'Bitte versuchen Sie es erneut',
      okType: 'button-positive button-clear'
    });
  }
}

SettingsCtrl.$inject = ['$state', '$ionicPopup', '$log'];
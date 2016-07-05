/*
* Angular Controller for loging the user in with Tel Number
* Created by Winter
* */
import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class LoginCtrl extends Controller {
  login() {
    if (_.isEmpty(this.phone)) return;

    const confirmPopup = this.$ionicPopup.confirm({
      title: 'Bestätigen Sie Ihre Telefon Nummer',
      template: '<div>' + this.phone + '</div><div>Ist Ihre Telefon Nummer korrekt?</div>',
      cssClass: 'text-center',
      okText: 'Ja',
      okType: 'button-positive button-clear',
      cancelText: 'Bearbeiten',
      cancelType: 'button-dark button-clear'
    });

    confirmPopup.then((res) => {
      if (!res) return;

      this.$ionicLoading.show({
        template: 'Bestätigungscode wird gesendet...'
      });

      Accounts.requestPhoneVerification(this.phone, (err) => {
        this.$ionicLoading.hide();
        if (err) return this.handleError(err);
        this.$state.go('confirmation', { phone: this.phone });
      });
    });
  }

  handleError(err) {
    this.$log.error('Login fehlgeschlagen ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Login fehlgeschlagen',
      template: 'Bitte versuchen Sie es erneut',
      okType: 'button-positive button-clear'
    });
  }
}

LoginCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];
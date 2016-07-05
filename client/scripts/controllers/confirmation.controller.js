/*
* Angular Controller for Verifing the Tel Number of the User
* Created by Winter
* */
import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class ConfirmationCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.phone = this.$state.params.phone;
  }

  confirm() {
    if (_.isEmpty(this.code)) return;

    Accounts.verifyPhone(this.phone, this.code, (err) => {
      if (err) return this.handleError(err);
      this.$state.go('profile');
    });
  }

  handleError(err) {
    this.$log.error('Bestätigungsfehler ', err);

    this.$ionicPopup.alert({
      title: 'Bestätigung fehlgeschlagen',
      template: 'Bitte versuchen Sie es erneut',
      okType: 'button-positive button-clear'
    });
  }
}

ConfirmationCtrl.$inject = ['$state', '$ionicPopup', '$log'];
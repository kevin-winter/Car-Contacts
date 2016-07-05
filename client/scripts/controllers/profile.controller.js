/*
* Angular Controller for updating the Profile Picture and Name (Numberplate)
* Created by Teichert
* */
import { _ } from 'meteor/underscore';
import { MeteorCameraUI } from 'meteor/okland:camera-ui';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class ProfileCtrl extends Controller {
  constructor() {
    super(...arguments);

    const profile = this.currentUser && this.currentUser.profile;
    this.name = profile ? profile.name : '';
  }

  updatePicture () {
    MeteorCameraUI.getPicture({width: 500, height: 500}, (err, data) => {
      if (err) return this.handleError(err);

      this.callMethod('updatePicture', data, (err) => {
        this.handleError(err);
      });
    });
  }

  updateName() {
    if (_.isEmpty(this.name)) return;

    this.callMethod('updateName', this.name, (err) => {
      if (this.name == this.currentUser.profile.name) {
      this.$state.go('tab.chats');
      return;
    }

      if (err) return this.handleError(err);
      this.$state.go('tab.chats');
    });
  }

  handleError(err) {
    if (err.error == 'cancel') return;
    else if (err.error == 'not-logged-in') this.$state.go('login');
    else if (err.error == 'plate-exists') {
      this.$ionicPopup.alert({
        title: 'Kennzeichen existiert bereits',
        template: 'Bitte versuchen Sie es erneut'
      });
    } else {

      this.$log.error( 'Profil speichern fehlgeschlagen ', err);

      this.$ionicPopup.alert({
        title: err.reason || 'Profil speichern fehlgeschlagen',
        template: 'Bitte versuchen Sie es erneut',
        okType: 'button-positive button-clear'
      });
    }
  }
}

ProfileCtrl.$inject = ['$state', '$ionicPopup', '$log'];
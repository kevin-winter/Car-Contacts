/*
* Angular Controller for Single Chat with other Car Drivers, sending Image, showing Profile Pic
* Created by Rosel
* */
import Ionic from 'ionic-scripts';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { MeteorCameraUI } from 'meteor/okland:camera-ui';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats, Messages } from '../../../lib/collections';

export default class ChatCtrl extends Controller {
  constructor() {
    super(...arguments
  )
    ;

    this.chatId = this.$stateParams.chatId;
    this.isIOS = Ionic.Platform.isWebView() && Ionic.Platform.isIOS();
    this.isCordova = Meteor.isCordova;

    this.helpers({
      messages() {
        return Messages.find({chatId: this.chatId});
      },
      data() {
        return Chats.findOne(this.chatId);
      }
    });

    this.autoScroll();

  }

  showImgModal() {
    this.imgModal.showModal();
  }

  hideImgModal() {
    this.imgModal.hideModal();
  }

  sendPicture() {
    MeteorCameraUI.getPicture({}, (err, data) => {
      if (err) return this.handleError(err);

      this.callMethod('newMessage', {
        picture: data,
        type: 'picture',
        chatId: this.chatId
      });
    });
  }

  sendMessage(message) {
    if (_.isEmpty(message)) return;

    this.callMethod('newMessage', {
      text: message,
      type: 'text',
      chatId: this.chatId
    });

    delete this.message;
  }

  inputUp () {
    if (this.isIOS) {
      this.keyboardHeight = 216;
    }

    this.scrollBottom(true);
  }

  inputDown () {
    if (this.isIOS) {
      this.keyboardHeight = 0;
    }

    this.$ionicScrollDelegate.$getByHandle('chatScroll').resize();
  }

  closeKeyboard () {
    if (this.isCordova) {
      cordova.plugins.Keyboard.close();
    }
  }

  autoScroll() {
    let recentMessagesNum = this.messages.length;

    this.autorun(() => {
      const currMessagesNum = this.getCollectionReactively('messages').length;
      const animate = recentMessagesNum != currMessagesNum;
      recentMessagesNum = currMessagesNum;
      this.scrollBottom(animate);
    });
  }

  scrollBottom(animate) {
    this.$timeout(() => {
      this.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
    }, 10);
  }

  handleError(err) {
    if (err.error == 'cancel') return;
    this.$log.error('Profil speichern fehlgeschlagen ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Speichern fehlgeschlagen',
      template: 'Bitte versuchen Sie es erneut',
      okType: 'button-positive button-clear'
    });
  }
}

ChatCtrl.$inject = ['$stateParams', '$timeout', '$ionicScrollDelegate', '$ionicPopup', '$log','imgModal'];

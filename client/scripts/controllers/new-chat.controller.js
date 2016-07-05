/*
* Angular Controller for adding new Chat to Car Contacts
* Created by Teichert
* */
import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats } from '../../../lib/collections';

export default class NewChatCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('users');

    this.helpers({
      users() {
        return Meteor.users.find({ _id: { $ne: this.currentUserId } });
      }
    });
  }

  newChat(userId) {
    let chat = Chats.findOne({ userIds: { $all: [this.currentUserId, userId] } });

    if (chat) {
      this.hideNewChatModal();
      return this.goToChat(chat._id);
    }

    this.callMethod('newChat', userId, (err, chatId) => {
      this.hideNewChatModal();
      if (err) return this.handleError(err);
      this.goToChat(chatId);
    });
  }

  hideNewChatModal() {
    this.NewChat.hideModal();
  }

  goToChat(chatId) {
    this.$state.go('tab.chat', { chatId });
  }

  handleError(err) {
    if (err.error == 'not-logged-in') this.$state.go('login');
    this.$log.error('Neuer Chat fehlgeschlagen ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Neuer Chat fehlgeschlagen',
      template: 'Bitte versuchen Sie es erneut',
      okType: 'button-positive button-clear'
    });
  }
}

NewChatCtrl.$inject = ['$state', 'NewChat', '$ionicPopup', '$log'];
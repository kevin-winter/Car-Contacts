/*
 * Controller for Chats Overview, Chats Listing
 * Created by Rosel
 * */
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats } from '../../../lib/collections';

export default class ChatsCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.helpers({
      data() {
        return Chats.find();
      }
    });
  }

  showNewChatModal() {
    this.NewChat.showModal();
  }

  remove(chat) {
    this.callMethod('removeChat', chat._id);
  }
}

ChatsCtrl.$inject = ['NewChat'];

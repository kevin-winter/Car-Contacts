/*
 * Javascript for the Business logic of the Meteor Server
 * Created by Winter
 * */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Chats, Messages } from '../lib/collections';

Meteor.methods({
  newMessage(message) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Um Nachrichten zu senden müssen Sie eingeloggt sein.');
    }

    check(message, Match.OneOf(
      {
        text: String,
        type: String,
        chatId: String
      },
      {
        picture: String,
        type: String,
        chatId: String
      }
    ));

    message.timestamp = new Date();
    message.userId = this.userId;

    const messageId = Messages.insert(message);
    Chats.update(message.chatId, { $set: { lastMessage: message } });

    return messageId;
  },
  updateName(name) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Um das Kennzeichen zu ändern müssen Sie eingeloggt sein.');
      this.$state.go('login');
    }
    
    if(Meteor.users.findOne({'profile.name': name})) {
      throw new Meteor.Error('plate-exists',
          'Kennzeichen existiert bereits.');
    }

    check(name, String);
/*
    userExists = function(name) {
      return !!Meteor.users.findOne({'profile.name': name});
    }

    if(userExists){
      throw Meteor.Error('user-exists', 'Kennzeichen ist bereits vergeben.');
    }
*/
    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Bitte geben Sie ein Kennzeichen an.');
    }

    return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
  },
  newChat(otherId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Um Kontakte hinzuzufügen müssen Sie eingeloggt sein.');
      this.$state.go('login');
    }

    check(otherId, String);
    const otherUser = Meteor.users.findOne(otherId);

    if (!otherUser) {
      throw new Meteor.Error('user-not-exists',
        'Kontakt existiert nicht.');
    }

    const chat = {
      userIds: [this.userId, otherId],
      createdAt: new Date()
    };

    const chatId = Chats.insert(chat);

    return chatId;
  },
  removeChat(chatId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Um Kontakte zu löschen müssen Sie eingeloggt sein.');
      this.$state.go('login');
    }

    check(chatId, String);

    const chat = Chats.findOne(chatId);

    if (!chat || !_.include(chat.userIds, this.userId)) {
      throw new Meteor.Error('chat-not-exists',
        'Kontakt existiert nicht.');
    }

    Messages.remove({ chatId: chatId });

    return Chats.remove({ _id: chatId });
  },
  updatePicture(data) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Um das Bild zu aktualisieren müssen Sie eingeloggt sein.');
      this.$state.go('login');
    }

    check(data, String);

    return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  }
});
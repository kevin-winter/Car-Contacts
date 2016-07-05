/*
* Angular Filter for getting the Name (Numberplate) of the user
* Created by Rosel
* */
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Filter } from 'angular-ecmascript/module-helpers';

export default class ChatNameFilter extends Filter {
  filter(chat) {
    if (!chat) return;

    let otherId = _.without(chat.userIds, Meteor.userId())[0];
    let otherUser = Meteor.users.findOne(otherId);
    let hasName = otherUser && otherUser.profile && otherUser.profile.name;

    return hasName ? otherUser.profile.name : chat.name || 'No Numberplate';
  }
}

ChatNameFilter.$name = 'chatName';

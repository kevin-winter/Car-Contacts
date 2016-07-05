/*
* Javascript for defining the Collections in the Mongo DB
* Created by Rosel
* */
import { Mongo } from 'meteor/mongo';

export const Chats = new Mongo.Collection('chats');
export const Messages = new Mongo.Collection('messages');

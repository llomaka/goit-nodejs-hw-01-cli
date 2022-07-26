const fs = require('fs');
const path = require('path');

//  * Розкоментуйте і запиши значення
const contactsPath = path.resolve('contacts.js');
console.log(contactsPath);

// TODO: задокументувати кожну функцію
function listContacts() {
  // ...твій код
}

function getContactById(contactId) {
  // ...твій код
}

function removeContact(contactId) {
  // ...твій код
}

function addContact(name, email, phone) {
  // ...твій код
}

module.exports = { listContacts, getContactById, removeContact, addContact };
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

//  * Шлях до файлу з масивом об'єктів контактів
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// TODO: задокументувати кожну функцію
// функція зчитує файл масиву контактів і виводить його в консоль
function listContacts() {
  fs.readFile(contactsPath, 'utf8', (error, data) => {
    if (error) throw error;
    console.table(JSON.parse(data));
  });
}

// функція виводить в консоль контакт за ідентифікатором
function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf8', (error, data) => {
    if (error) throw error;
    const contactsArray = (JSON.parse(data));
    const foundContactIndex = contactsArray.findIndex(contact => parseInt(contact.id) === parseInt(contactId));
    const result = foundContactIndex !== -1 ? contactsArray[foundContactIndex] : `Contact with id: ${contactId} not found.`;
    console.log(result);
  });
}

// функція видаляє з масиву контакт за ідентифікатором
function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf8', (error, data) => {
    if (error) throw error;
    const contactsArray = (JSON.parse(data));
    const foundContactIndex = contactsArray.findIndex(contact => contact.id === contactId);
    if (foundContactIndex === -1) {
      console.log(`Contact with id: ${contactId} not found. Nothing to delete.`);
      return -1;
    }
    const newContactsArray = contactsArray.filter(contact => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContactsArray), (error) => {
      if (error) throw error;
      console.log(`Contact with id: ${contactId} successfully deleted.`);  
    })  
  });
}

// функція додає до масиву контакт
function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf8', (error, data) => {
    if (error) throw error;
      const contactsArray = (JSON.parse(data));
      const isNamePresentIndex = contactsArray.findIndex(contact => contact.name === name);
      if (isNamePresentIndex !== -1) {
        console.log(`Contact ${name} already exists. Please check the data.`);
        return -1;
      }
      const newId = nanoid();
      contactsArray.push({
        'id': newId,
        name,
        email,
        phone
      });
      fs.writeFile(contactsPath, JSON.stringify(contactsArray), (error) => {
        if (error) throw error;
        console.log(`Contact ${name} successfully added.`);
      })
    }
  )
}

module.exports = { listContacts, getContactById, removeContact, addContact };

// function checkUniqueId(id) {
//   fs.readFile(contactsPath, (error, data) => {
//     if (error) throw error;
//       const contactsArray = (JSON.parse(data));
//       return contactsArray.find(contact => parseInt(contact.id) === parseInt(id)) ? true : false;
//   })
// }

// function findHighestId() {
//   fs.readFile(contactsPath, (error, data) => {
//     if (error) throw error;
//       const contactsArray = (JSON.parse(data));
//       const idArray = contactsArray.map(contact => parseInt(contact.id)).sort((a, b) => a - b);
//       return idArray[idArray.length - 1];
//   })
// }

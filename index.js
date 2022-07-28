const yargs = require('yargs');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');
// listContacts();
// const argv = require('yargs').argv;
// const [, , action, id, name, email, phone] = process.argv;

// TODO: рефакторити
// function invokeAction({ action, id, name, email, phone }) {
//   switch (action) {
//     case "list":
//       // ...
//       break;

//     case "get":
//       // ... id
//       break;

//     case "add":
//       // ... name email phone
//       break;

//     case "remove":
//       // ... id
//       break;

//     default:
//       console.warn("\x1B[31m Unknown action type!");
//   }
// }

// invokeAction(argv);

require('yargs')
  .scriptName('contacts')
    .usage('$0 <cmd> [args]')
  .command('list', 'List all contacts', () => {}, function () {
    listContacts();
  })
  .command('get <id>', 'Display contact by id', (yargs) => {
    yargs.positional('id', {
    describe: 'Contact id',
    type: 'string',
    })
  }, function (argv) {
    const { id } = argv;
    getContactById(id);
  })
  .command('add <name> <email> <phone>', 'Add new contact with sequential fields: name, email and phone', (yargs) => {
    yargs.positional('name', {
    describe: 'Contact Full Name',
    type: 'string',
    })
    .positional('email', {
    describe: 'Contact e-mail',
    type: 'string',
    })
    .positional('phone', {
    describe: 'Contact phone number',
    type: 'string',
    })
  }, function (argv) {
    const { name, email, phone } = argv;
    addContact(name, email, phone);
  })
  .command('remove <id>', 'Delete contact by id', (yargs) => {
    yargs.positional('id', {
    describe: 'Contact id',
    type: 'string',
    })
  }, function (argv) {
    const { id } = argv;
    removeContact(id);
  })
  .help()
  .epilog('Copyright 2022')
  .argv
  
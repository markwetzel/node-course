const yargs = require('yargs');
const { addNote, removeNote, listNotes, readNote } = require('./notes');

yargs.version('1.1.1');

// Create Add Command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler({ title, body }) {
    addNote(title, body);
  }
});

// Create Remove Command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler({ title }) {
    removeNote(title);
  }
})

// Create List Command
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler() {
    listNotes();
  }
})

// Create Read Command
yargs.command({
  command: 'read',
  describe: 'Reading notes',
  builder: {
    title: {
      command: 'read',
      describe: 'Read a single note',
      demandOption: true,
      type: 'string'
    }
  },
  handler({ title }) {
    readNote(title);
  }
})

// Needed for yargs to work correctly
yargs.parse();
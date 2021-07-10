const fs = require('fs');
const chalk = require('chalk');

const addNote = function (title, body) {
  const notes = loadNotes();

  const sanitizedTitle = sanitizeTitle(title);

  if (getNoteByTitle(notes, sanitizedTitle)) {
    console.log(chalk.red.bold("Note title taken. Try again."));
    return;
  }

  notes.push({
    title,
    body
  });
  saveNotes(notes);

  console.log(chalk.green.bold(`Added ${title}.`));
};

const removeNote = function (title) {
  const notes = loadNotes();

  const newNotes = removeNoteByTitle(notes, title);

  if (newNotes.length === notes.length) {
    console.log(chalk.yellow.bold("A note with that title was not found. Try again."));
  } else {
    console.log(chalk.green.bold("Successfully removed note!"));
    saveNotes(newNotes);
  }
};

const saveNotes = function (notes) {
  const dataJson = JSON.stringify(notes);

  fs.writeFileSync('notes.json', dataJson);
}

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

const listNotes = function () {
  try {
    console.log(chalk.blue('Your notes:'));
    const notes = loadNotes();
    notes.forEach(note => printNote(note));
  } catch (e) {
    console.error(e);
  }
}

const printNote = function ({ title, body }) {
  console.log(chalk.blue(`${title}: ${body}`));
};

const readNote = function (title) {
  try {
    const notes = loadNotes();
    const note = getNoteByTitle(notes, title);

    if (!note) {
      console.error(chalk.red.bold('Note not found.'));
      return;
    }

    printNote(note);
  } catch (e) {
    console.error(e);
  }
};

const removeNoteByTitle = (notes, title) =>
  notes.filter(note => note.title !== title);

function sanitizeTitle(title) {
  return title.trim().toLowerCase();
}

function getNoteByTitle(notes, title) {
  return notes.find(note => sanitizeTitle(note.title) === sanitizeTitle(title));
}

module.exports = { addNote, removeNote, listNotes, readNote };


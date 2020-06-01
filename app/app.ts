import * as readline from 'readline';

import Messages from './messages';
import Directory from './directory';
import Document from './document';

const dir = new Directory();
const tools = 'Command: :q! = exit, :w = save as, :x! = save';
const screen = 'Text Editor\nChoose an option:\n 1) Create a new file\n 2) Open file \n 3) Remove file\n 4) Close editor\n\n ';

const myInterface = readline.createInterface(process.stdin, process.stdout);

function renderInterface(file: Document, message: string) {
  /* clear screen */
  process.stdout.write('\x1Bc');

  if (file.getName() === '') {
    console.log('File Untitled');
  } else {
    console.log(`File name: ${file.getName()}`);
  }

  console.log(tools);

  if (message !== null) console.log(message);
  console.log(file.getContent());
}

function saveAs(file: Document) {
  // eslint-disable-next-line consistent-return
  myInterface.question(Messages.requestFileName, (name: string) => {
    if (!name) return renderInterface(file, Messages.fileNotSaved);

    if (file.exist(name)) {
      /* question replace name */
      myInterface.question(Messages.replaceFileName, (res: string) => {
        if (res === 'y') {
          file.saveAs(name);
          renderInterface(file, Messages.fileSaved);
        } else {
          renderInterface(file, Messages.fileNotSaved);
        }
      });
    } else {
      file.saveAs(name);
      renderInterface(file, Messages.fileSaved);
    }
  });
}

function save(file: Document) {
  const hasName = file.hasName();

  if (hasName) {
    file.save();
    renderInterface(file, Messages.fileSaved);
  } else {
    myInterface.question(Messages.requestFileName, (name: string) => {
      if (!name) return save(file);
      file.saveAs(name);
      renderInterface(file, Messages.fileSaved);
    });
  }
}

function readCommands(file: Document) {
  myInterface.on('line', (input) => {
    switch (input.trim()) {
      case ':q!':
        myInterface.removeAllListeners('line');
        mainScreen();
        break;

      case ':w':
        saveAs(file);
        break;

      case ':x!':
        save(file);
        break;

      default:
        file.append(input.trim());
    }
  });
}

function createFile() {
  const file: Document = new Document(dir.getPath());
  renderInterface(file, '');
  readCommands(file);
}

function openFile(file: Document, name: string) {
  file.open(name);
  renderInterface(file, '');
  readCommands(file);
}

function removeFile(file: Document, name: string) {
  file.remove(name);
  console.log(Messages.fileDelete);
  mainScreen();
}

function showFilesInDir(callback: (file: Document, name: string) => void) {
  const file: Document = new Document(dir.getPath());

  dir.getFilesInDir();
  // eslint-disable-next-line consistent-return
  myInterface.question(`\n${Messages.requestFileName}`, (name:string) => {
    if (name && file.exist(name)) return callback(file, name);

    console.log(Messages.fileNotFount);
    setTimeout(() => {
      myInterface.removeAllListeners('line');
      mainScreen();
    }, 1500);
  });
}

function mainScreen() {
  /* clear screen */
  process.stdout.write('\x1Bc');

  myInterface.question(screen, (res: string) => {
    switch (res.trim()) {
      case '1':
        createFile();
        break;

      case '2':
        showFilesInDir(openFile);
        break;

      case '3':
        showFilesInDir(removeFile);
        break;

      case '4':
        myInterface.close();
        break;

      default: mainScreen();
    }
  });
}


mainScreen();

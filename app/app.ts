import * as readline from 'readline';

import Mesagges from './messages';
import Directory from './directory';
import Document from './document';

const dir = new Directory();
const tools = 'Command: :q! = exit, :w = save as, :x! = save';
const screen = 'Text Editor\nChoose an option:\n 1) Create a new file\n 2) Open file \n 3) Close editor\n';
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
  myInterface.question(Mesagges.requestFileName, (name: string) => {
    if (!name) return renderInterface(file, Mesagges.fileNotSaved);

    if (file.exist(name)) {
      console.log(Mesagges.fileExists, name, 'pepe');
      myInterface.question(Mesagges.replaceFileName, (res) => {
        if (res === 'y') {
          file.saveAs(name);
          renderInterface(file, Mesagges.fileSaved);
        } else {
          renderInterface(file, Mesagges.fileNotSaved);
        }
      });
    } else {
      file.saveAs(name);
      renderInterface(file, Mesagges.fileSaved);
    }
  });
}

function save(file: Document) {
  const hasName = file.hasName();

  if (hasName) {
    file.save();
    renderInterface(file, Mesagges.fileSaved);
  } else {
    myInterface.question(Mesagges.requestFileName, (name = 'untitle') => {
      file.saveAs(name);
    });
    renderInterface(file, Mesagges.fileSaved);
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

function openFileInterface() {
  const file: Document = new Document(dir.getPath());

  dir.getFilesInDir();
  // eslint-disable-next-line consistent-return
  myInterface.question(Mesagges.requestFileName, (name:string) => {
    if (!!name && file.exist(name)) return openFile(file, name);

    console.log(Mesagges.fileNotFount);
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
        openFileInterface();
        break;

      case '3':
        myInterface.close();
        break;

      default: mainScreen();
    }
  });
}


mainScreen();

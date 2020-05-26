import * as readline from 'readline';
import Mesagges from './messages';
import Directory from './directory';
import Document from './document';

const dir = new Directory();
const tools: string = `Command: :q! = exit, :w = save as, :x! = save`;
const screen: string = `Text Editor\nChoose an option:\n 1) Create a new file\n 2) Open file \n 3) Close editor\n`;
let myInterface = readline.createInterface(process.stdin, process.stdout);

function mainScreen(){
  /* clear screen */ 
  process.stdout.write('\x1Bc');
  
  myInterface.question(screen, res => {
     switch(res.trim()){
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
  })
}

function createFile(){
  let file: Document = new Document(dir.getPath());

  renderInterface(file, '');
  readCommands(file); 
}


function openFileInterface(){
   let file: Document = new Document(dir.getPath());

   dir.getFilesInDir();
   myInterface.question(Mesagges.requestFileName, name => {
     if(file.exist(name)){
       openFile(file, name);
     } else {
       console.log(Mesagges.fileNotFount);
       setTimeout(() => {
        myInterface.removeAllListeners('line');
        mainScreen();
       }, 1500)
     }
   })
}

function openFile(file: Document, name: string){
  file.open(name);

  renderInterface(file, '');
  readCommands(file)
}

function renderInterface(file: Document, message: string){
  process.stdout.write('\x1Bc');

  (file.getName() === '') ? console.log('File Untitled') : console.log(`File name: ${file.getName()}`);

  console.log(tools);

  if(message !== null ) console.log(message);
  console.log(file.getContent());
}

function readCommands(file: Document){
  myInterface.on('line', input =>{
    switch(input.trim()){
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
  })
}

function saveAs(file: Document) {
  myInterface.question(Mesagges.requestFileName, name => {
    if(file.exist(name)){
      console.log(Mesagges.fileExists);
      myInterface.question(Mesagges.replaceFileName, res => {
        
        if(res === 'y'){
        
          file.saveAs(name);
          renderInterface(file, Mesagges.fileSaved);
        
        } else{
          renderInterface(file, Mesagges.fileNotSaved);
        }
      })
    } else{ 
      file.saveAs(name);
      renderInterface(file, Mesagges.fileSaved);
    }
  })
}

function save(file: Document) {
  let hasName = file.hasName();

  if(hasName){
    file.save();
    renderInterface(file, Mesagges.fileSaved);
  }else {
    myInterface.question(Mesagges.requestFileName, name => {
      file.saveAs(name);
    });
    renderInterface(file, Mesagges.fileSaved);

  }
}
  mainScreen();

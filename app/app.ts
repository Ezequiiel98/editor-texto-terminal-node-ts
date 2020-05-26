import * as readline from 'readline';
import Mesagges from './messages';
import Directory from './directory';
import Document from './document';

let myInterface = readline.createInterface(process.stdin, process.stdout);

const tools: string = `Command: :q = exit, :sa = save as, :s = save`;

const screen: string = `Text Editor\n  Choose an option:\n 1) Create a new file\n 2) Open file \n 3) Close editor`;

function mainScreen(){
  /* clear screen */ 
  process.stdout.write('\033c');
  
}

mainScreen();


"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = __importStar(require("readline"));
var messages_1 = __importDefault(require("./messages"));
var directory_1 = __importDefault(require("./directory"));
var document_1 = __importDefault(require("./document"));
var dir = new directory_1.default();
var tools = "Command: :q! = exit, :w = save as, :x! = save";
var screen = "Text Editor\nChoose an option:\n 1) Create a new file\n 2) Open file \n 3) Close editor\n";
var myInterface = readline.createInterface(process.stdin, process.stdout);
function mainScreen() {
    /* clear screen */
    process.stdout.write('\x1Bc');
    myInterface.question(screen, function (res) {
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
function createFile() {
    var file = new document_1.default(dir.getPath());
    renderInterface(file, '');
    readCommands(file);
}
function openFileInterface() {
    var file = new document_1.default(dir.getPath());
    dir.getFilesInDir();
    myInterface.question(messages_1.default.requestFileName, function (name) {
        if (file.exist(name)) {
            openFile(file, name);
        }
        else {
            console.log(messages_1.default.fileNotFount);
            setTimeout(function () {
                myInterface.removeAllListeners('line');
                mainScreen();
            }, 1500);
        }
    });
}
function openFile(file, name) {
    file.open(name);
    renderInterface(file, '');
    readCommands(file);
}
function renderInterface(file, message) {
    process.stdout.write('\x1Bc');
    (file.getName() === '') ? console.log('File Untitled') : console.log("File name: " + file.getName());
    console.log(tools);
    if (message !== null)
        console.log(message);
    console.log(file.getContent());
}
function readCommands(file) {
    myInterface.on('line', function (input) {
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
function saveAs(file) {
    myInterface.question(messages_1.default.requestFileName, function (name) {
        if (file.exist(name)) {
            console.log(messages_1.default.fileExists);
            myInterface.question(messages_1.default.replaceFileName, function (res) {
                if (res === 'y') {
                    file.saveAs(name);
                    renderInterface(file, messages_1.default.fileSaved);
                }
                else {
                    renderInterface(file, messages_1.default.fileNotSaved);
                }
            });
        }
        else {
            file.saveAs(name);
            renderInterface(file, messages_1.default.fileSaved);
        }
    });
}
function save(file) {
    var hasName = file.hasName();
    if (hasName) {
        file.save();
        renderInterface(file, messages_1.default.fileSaved);
    }
    else {
        myInterface.question(messages_1.default.requestFileName, function (name) {
            file.saveAs(name);
        });
        renderInterface(file, messages_1.default.fileSaved);
    }
}
mainScreen();

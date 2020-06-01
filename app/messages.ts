interface MessagesInterface {
  fileSaved: string,
  fileNotSaved: string,
  requestFileName: string,
  fileNotFount: string,
  fileExists: string,
  replaceFileName: string,
  fileDelete: string
}

const Messages: MessagesInterface = {
  fileSaved: 'File saved successfully',
  fileNotSaved: 'The file was not saved, you can edit it',
  requestFileName: '* Name file: ',
  fileNotFount: 'The file doesnt exist',
  fileExists: 'The file  already exists',
  replaceFileName: 'Do you want to replace the file name? (y/n) ',
  fileDelete: 'The file deleted successfully',
};

export default Messages;

interface Messages {
  fileSaved: string,
  fileNotSaved: string,
  requestFileName: string,
  fileNotFount: string,
  fileExists: string,
  replaceFileName: string
}

const messages: Messages = {
  fileSaved:  'File saved successfully',
  fileNotSaved: 'The file was not saved, you can edit it',
  requestFileName: '* Name file: ',
  fileNotFount: 'The file doesnt exist',
  fileExists: 'The file  already exists',
  replaceFileName: 'Do you want to replace the file name? (y/n) '

}

export default messages;

interface Messages {
  fileSaved: string,
  fileNotSaves: string,
  requestFileName: string,
  fileNotFount: string,
  fileExists: string
}

const messages: Messages = {
  fileSaved:  'File saved successfully',
  fileNotSaves: 'The file was not saved, you can edit it',
  requestFileName: '* Name file ',
  fileNotFount: 'The file doesnt exist',
  fileExists: 'The file  already exists'
}

module.exports = messages;

import * as fs from 'fs';
import * as path from 'path';


class Directory {
  private _path: string;
  private _nameDir: string;

  constructor(){
    this._path = __dirname;
    this._nameDir = 'docs';
    this.createDirectory();
  }
   
  private createDirectory(){
    this._path = path.join(this._path, this._nameDir)
    
    if(fs.existsSync(this._nameDir)){
      console.log('The directory already exists');
    } else{
      fs.mkdirSync(this._nameDir);
    }
  }

  getPath(): string{
    return this._path;
  }

  getShortPath(): string{
    const paths = path.parse(this._path);
    let delimiter: string = (paths.dir.indexOf('/') < 0  ) ? '\\' : '/' ;
     
    return `${paths.root}...${delimiter}${paths.name}`;
  }
  
  getFilesInDir(): void{
   const files = fs.readdirSync(this._path);
   
   console.log(`*Ubication: ${this.getShortPath()}`)
   files.forEach(file => console.log(file)) 
  }
}

module.exports = Directory;

import * as fs from 'fs';
import * as path from 'path';

class Directory {
  private _path: string;

  private _nameDir: string;

  constructor() {
    this._path = __dirname;
    this._nameDir = 'Documents';
    this.createDirectory();
  }

  createDirectory(): void{
    this._path = path.join(this._path, this._nameDir);

    if (fs.existsSync(this._path)) {
      console.log('The directory already exists');
    } else {
      fs.mkdirSync(this._path);
    }
  }

  getPath(): string {
    return this._path;
  }

  getShortPath(): string {
    const paths = path.parse(this._path);
    const delimiter: string = path.sep;
    const dirs: Array<string> = paths.dir.split(delimiter);
    const shortPath: string = path.join(dirs[dirs.length - 1], dirs[dirs.length - 2], paths.name);

    return `.${delimiter}${shortPath}`;
  }

  getFilesInDir(): void{
    const files = fs.readdirSync(this._path);

    console.log(`\n* Ubication: ${this.getShortPath()}\n`, '\n\tFILES');

    if (files.length <= 0) console.log('\tDirectory is empty\n');

    files.forEach((file, index) => console.log(`\t${(files.length - 1) === index ? '└─' : '├─'} ${file}`));
  }
}

export default Directory;

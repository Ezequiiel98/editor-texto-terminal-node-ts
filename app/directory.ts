import * as fs from 'fs';
import * as path from 'path';

class Directory {
  private _path: string;

  private _nameDir: string;

  constructor() {
    this._path = __dirname;
    this._nameDir = 'docs';
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
    const delimiter: string = (paths.dir.indexOf('/') < 0) ? '\\' : '/';

    return `${paths.root}...${delimiter}${paths.name}`;
  }

  getFilesInDir(): void{
    const files = fs.readdirSync(this._path);

    console.log(`*Ubication: ${this.getShortPath()}`);
    process.stdout.write('\n\tFILES\n');

    if (files.length <= 0) console.log('\t Directory is empty');

    files.forEach((file, index) => console.log(`\t${(files.length - 1) === index ? '└─' : '├─'} ${file}`));
  }
}

export default Directory;

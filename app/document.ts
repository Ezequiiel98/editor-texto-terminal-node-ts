import * as fs from 'fs';
import * as os from 'os';

class Document {
  private _content: string;

  private _isSaved: boolean;

  private _filename: string;

  private _dir: string;

  constructor(dir: string) {
    this._content = '';
    this._isSaved = false;
    this._filename = '';
    this._dir = dir;
  }

  exist(name: string): boolean {
    return fs.existsSync(`${this._dir}/${name}`);
  }

  append(text: string): void{
    this._content += os.EOL + text;
    this._isSaved = false;
  }

  saveAs(name: string): void{
    fs.writeFileSync(`${this._dir}/${name}`, `${this._content}\n`);

    this._isSaved = true;
    this._filename = name;
  }

  save(): void{
    fs.writeFileSync(`${this._dir}/${this._filename}`, `${this._content}\n`);

    this._isSaved = true;
  }

  getContent(): string {
    return this._content;
  }

  hasName(): boolean {
    return this._filename !== '';
  }

  getName(): string {
    return this._filename;
  }

  isSaved(): boolean {
    return this._isSaved;
  }

  open(name: string): string {
    this._content = fs.readFileSync(`${this._dir}/${name}`, 'utf-8');
    this._filename = name;
    this._isSaved = true;
    return this._content;
  }
}

export default Document;

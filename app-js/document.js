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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var os = __importStar(require("os"));
var Document = /** @class */ (function () {
    function Document(dir) {
        this._content = '';
        this._isSaved = false;
        this._filename = '';
        this._dir = dir;
    }
    Document.prototype.exist = function (name) {
        return fs.existsSync(this._dir + "/" + name);
    };
    Document.prototype.append = function (text) {
        this._content += os.EOL + text;
        this._isSaved = false;
    };
    Document.prototype.saveAs = function (name) {
        fs.writeFileSync(this._dir + "/" + name, this._content + "\n");
        this._isSaved = true;
        this._filename = name;
    };
    Document.prototype.save = function () {
        fs.writeFileSync(this._dir + "/" + this._filename, this._content + "\n");
        this._isSaved = true;
        this._filename = this._filename;
    };
    Document.prototype.getContent = function () {
        return this._content;
    };
    Document.prototype.hasName = function () {
        return this._filename !== '';
    };
    Document.prototype.getName = function () {
        return this._filename;
    };
    Document.prototype.isSaved = function () {
        return this._isSaved;
    };
    Document.prototype.open = function (name) {
        this._content = fs.readFileSync(this._dir + "/" + name, 'utf-8');
        this._filename = name;
        this._isSaved = true;
        return this._content;
    };
    return Document;
}());
exports.default = Document;

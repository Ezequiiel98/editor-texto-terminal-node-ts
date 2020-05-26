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
var path = __importStar(require("path"));
var Directory = /** @class */ (function () {
    function Directory() {
        this._path = __dirname;
        this._nameDir = 'docs';
        this.createDirectory();
    }
    Directory.prototype.createDirectory = function () {
        this._path = path.join(this._path, this._nameDir);
        if (fs.existsSync(this._nameDir)) {
            console.log('The directory already exists');
        }
        else {
            fs.mkdirSync(this._nameDir);
        }
    };
    Directory.prototype.getPath = function () {
        return this._path;
    };
    Directory.prototype.getShortPath = function () {
        var paths = path.parse(this._path);
        var delimiter = (paths.dir.indexOf('/') < 0) ? '\\' : '/';
        return paths.root + "..." + delimiter + paths.name;
    };
    Directory.prototype.getFilesInDir = function () {
        var files = fs.readdirSync(this._path);
        console.log("*Ubication: " + this.getShortPath());
        files.forEach(function (file) { return console.log(file); });
    };
    return Directory;
}());
module.exports = Directory;

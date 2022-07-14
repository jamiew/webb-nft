"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebbNFT__factory = exports.WebbMultimint__factory = exports.IWebbNFT__factory = exports.Owned__factory = exports.ERC1155TokenReceiver__factory = exports.ERC1155__factory = exports.factories = void 0;
exports.factories = __importStar(require("./factories"));
var ERC1155__factory_1 = require("./factories/ERC1155.sol/ERC1155__factory");
Object.defineProperty(exports, "ERC1155__factory", { enumerable: true, get: function () { return ERC1155__factory_1.ERC1155__factory; } });
var ERC1155TokenReceiver__factory_1 = require("./factories/ERC1155.sol/ERC1155TokenReceiver__factory");
Object.defineProperty(exports, "ERC1155TokenReceiver__factory", { enumerable: true, get: function () { return ERC1155TokenReceiver__factory_1.ERC1155TokenReceiver__factory; } });
var Owned__factory_1 = require("./factories/Owned__factory");
Object.defineProperty(exports, "Owned__factory", { enumerable: true, get: function () { return Owned__factory_1.Owned__factory; } });
var IWebbNFT__factory_1 = require("./factories/WebbMultimint.sol/IWebbNFT__factory");
Object.defineProperty(exports, "IWebbNFT__factory", { enumerable: true, get: function () { return IWebbNFT__factory_1.IWebbNFT__factory; } });
var WebbMultimint__factory_1 = require("./factories/WebbMultimint.sol/WebbMultimint__factory");
Object.defineProperty(exports, "WebbMultimint__factory", { enumerable: true, get: function () { return WebbMultimint__factory_1.WebbMultimint__factory; } });
var WebbNFT__factory_1 = require("./factories/WebbNFT__factory");
Object.defineProperty(exports, "WebbNFT__factory", { enumerable: true, get: function () { return WebbNFT__factory_1.WebbNFT__factory; } });

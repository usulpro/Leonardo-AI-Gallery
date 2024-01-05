"use strict";
// Path: src/model/types.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresetStyle = exports.GenerationStatus = void 0;
// Enums for ImageGeneration status and presetStyle
var GenerationStatus;
(function (GenerationStatus) {
    GenerationStatus["Complete"] = "COMPLETE";
    GenerationStatus["Pending"] = "PENDING";
    // Additional statuses can be added here
})(GenerationStatus || (exports.GenerationStatus = GenerationStatus = {}));
var PresetStyle;
(function (PresetStyle) {
    PresetStyle["Creative"] = "CREATIVE";
    // More styles will be added after testing with different styles
})(PresetStyle || (exports.PresetStyle = PresetStyle = {}));

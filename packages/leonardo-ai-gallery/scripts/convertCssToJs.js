// scripts/convertCssToJs.js
const fs = require('fs');
const path = require('path');

const cssFilePath = path.resolve(__dirname, '../dist/styles.css');
const jsFilePath = path.resolve(__dirname, '../dist/styles.js');

const cssContent = fs.readFileSync(cssFilePath, 'utf8');
const jsContent = `export default ${JSON.stringify(cssContent)};`;

fs.writeFileSync(jsFilePath, jsContent);

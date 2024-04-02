const path = require('path');
const { processFiles } = require('./src/fileProcessor');
const determineCondition = require('./src/conditionDeterminer');
const { writeCSV, writeJSONCounts } = require('./src/fileWriter');

// Folder path
const folderPath = path.join(__dirname, 'data');

// Extract product data
const products = processFiles(folderPath);

// Determine conditions for each product
products.forEach(product => {
    product.condition = determineCondition(product.shortDescription, product.longDescription);
});

// Creating CSV and JSON files 
writeCSV([['SKU', 'Short Description', 'Long Description', 'Condition'], ...products.map(product => [product.sku, product.shortDescription, product.longDescription, product.condition])]);
writeJSONCounts(products);

console.log('Processing completed. CSV and JSON files generated.');

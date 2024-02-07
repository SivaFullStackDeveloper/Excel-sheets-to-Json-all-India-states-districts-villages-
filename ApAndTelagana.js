const fs = require('fs');
const path = require('path');

function writeJsonToFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
// Function to read JSON files from a directory
function readJsonFiles(directory) {
  const files = fs.readdirSync(directory);

  // Filter only JSON files
  const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');

  // Read and parse each JSON file
  const data = [];
  jsonFiles.forEach(file => {
    const filePath = path.join(directory, file);
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    data.push(...jsonData);
  });

  return data;
}

// Function to filter and sort data based on state
function filterAndSortData(data, state) {
  const filteredData = data.filter(entry => entry.state === state);
  // Sort the filtered data based on some criteria (e.g., district, village)
  const sortedData = filteredData.sort((a, b) => {
    // Add your sorting logic here
    return a.district.localeCompare(b.district) || a.village.localeCompare(b.village);
  });

  return sortedData;
}

// Example usage
const directoryPath = './allcities'; // Replace with the actual path to your JSON files directory
const jsonData = readJsonFiles(directoryPath);

// Filter and sort data for Andhra Pradesh
const andhraPradeshData = filterAndSortData(jsonData, 'Andhra Pradesh');
console.log('Data for Andhra Pradesh:', andhraPradeshData);

// Filter and sort data for Telangana
const telanganaData = filterAndSortData(jsonData, 'Telangana');
console.log('Data for Telangana:', telanganaData);

const andhraPradeshFilePath = './ApAndTelangana.json';
writeJsonToFile(andhraPradeshFilePath, andhraPradeshData);
console.log('Andhra Pradesh data written to ApAndTelangana.json');

// Append Telangana data to the same file

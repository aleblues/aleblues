filePath = 'C:\\Users\\alessio.bocci\\OneDrive - Nivi Spa\\LAVORO\\Conversione CSV a file EXCEL OSPITALETTO analisi AGNESE\\data\\';

//requiring cal.js file
const extractData = require("./extractData.js");
const saveCsv = require("./saveCsv.js");


let activities = {
    codiceFiscaleConducente: [24, 40],
    cognomeConducente: [210 - 1, 234 - 1],
    nomeConducente: [234 - 1, 254 - 1],
    codiceFiscaleProprietario: [24, 40],
    nomeCognomeProprietario: [199, 243],
    importo: [32, 68],
    numeroVerbale: [70, 81],
    dataVerbale: [81, 90],
    targa: [90, 102],
    articoloCDS: [102, 111],
    dataNotifica: [114, 129],
};

//requiring path and fs modules
const fs = require('fs');
//passsing directoryPath and callback function

fs.readdir(filePath, function (err, files) {
    //handling error

    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    //listing all files using forEach
    files.forEach(function (file) {

        //delete csv files 

        // Do whatever you want to do with the file

        fs.readFile(filePath + file, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return
            }

            let csvFile = extractData(data, activities, file);
            saveCsv(filePath + 'output\\' + file, csvFile);
        });

    });
});
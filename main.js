filePath = 'C:\\Users\\aless\\OneDrive - Nivi Spa\\LAVORO\\File nuovi Comuni conversione parsing csv nodejs\\input\\';
let comune = 'generico'

//requiring cal.js file
const extractData = require("./extractData.js");
const extractGenericData = require("./extractGenericData.js");

const saveCsv = require("./saveCsv.js");
let csvFile = ""


let activities = {
    codiceFiscaleConducente: [24, 40],
    cognomeConducente: [210 - 1, 234 - 1],
    nomeConducente: [234 - 1, 254 - 1],
    codiceFiscaleProprietario: [24, 40],
    importo: [32, 68],
    numeroVerbale: [70, 81],
    dataVerbale: [81, 90],
    indirizzo: [56, 86],
    targa: [90, 102],
    articoloCDS: [102, 111],
    dataNotifica: [114, 129],
    maggiorazione: [114, 129],
};

switch (comune) {
    case "generico":
        activities.targa = [68 + 8, 83]
        activities.numeroVerbale = [84, 105]
        activities.dataNotifica = [100, 125]
        activities.articoloCDS = [145, 160]
        activities.dataVerbale = [160, 166]
        activities.indirizzo = [56, 86]
        activities.maggiorazione = [32, 68]
        activities.indirizzoProprietario = [46, 76]
        activities.nomeCognomeProprietario = [199, 243]

        break;
    case "ospedaletti":
        csvFile = extractData(data, activities, file);
        break;
    default:
        csvFile = "No value found";
}

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

            switch (comune) {
                case "generico":
                    csvFile = extractGenericData(data, activities, file);
                    break;
                case "ospedaletti":
                    csvFile = extractData(data, activities, file);
                    break;
                default:
                    csvFile = "No value found";
            }

            saveCsv(filePath + 'output\\' + file, csvFile);
        });

    });
});
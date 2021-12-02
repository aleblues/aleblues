filePath = 'C:\\Users\\alessio.bocci\\OneDrive - Nivi Spa\\LAVORO\\Conversione CSV a file EXCEL OSPITALETTO analisi AGNESE\\data\\';

let activities = {
    codiceFiscaleConducente: [24, 40],
    nomeCognomeConducente: [210 - 1, 254 - 1],
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
const path = require('path');
const fs = require('fs');
//passsing directoryPath and callback function
fs.readdir(filePath, function (err, files) {
    //handling error
    //     files.forEach(function (file) {

    // if (file.split('.')[1]=='csv'){

    //     try {
    //         fs.unlinkSync(filePath+file)
    //         //file removed
    //       } catch(err) {
    //         console.error(err)
    //       }

    // };
    // });

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
            saveCsvData(filePath + 'output\\' + file, csvFile);
        });

    });
});


function extractData(data, activities, fileName) {

    let array = data.split(/\r\n|\n/)

    function Verbale() {
        codiceFiscaleConducente: '';
        nomeCognomeConducente: '';
        codiceFiscaleProprietario: '';
        nomeCognomeProprietario: '';
        importo: '';
        numeroVerbale: '';
        dataVerbale: '';
        targa: '';
        articoloCDS: '';
        dataNotifica: ''
    }

    function NumeroVerbaliPerFile() {
        numeroVerbali: '';
        nomeFile: '';
    }

    let rigaFile = '';

    let finalData = {
        csvData: [],
        dataCount: [

        ]
    }

    let csvData = [];

    var verbale = new Verbale();
    var numeroVerbaliPerFile = new NumeroVerbaliPerFile();
    numeroVerbaliPerFile.numeroVerbale = 0;
    // do-while loops
    let i = 0;
    let x = array.length;

    let numeroVerbali = 0;
    do {
        let line = array[i].substring(0, 2);

        if (line.includes('MGNMLL58E67L206Z'))
            var a = 0;

        // console.log(i + " prima di N2")
        if (line == 'N2') {
            numeroVerbaliPerFile.numeroVerbale += 1;
            // console.log(i + " dentro N2")
            rigaFile = line;

            verbale.codiceFiscaleConducente = String(line == 'N2' ? array[i].substring(activities.codiceFiscaleConducente[0], activities.codiceFiscaleConducente[1]) : '').replace(/\s+/g, ' ').trim()
            verbale.nomeCognomeConducente = String(line == 'N2' ? array[i].substring(activities.nomeCognomeConducente[0], activities.nomeCognomeConducente[1]) : '').replace(/\s+/g, ' ').trim()

            if (array[i].substring(activities.nomeCognomeConducente[0] - 1)[0] == '1' || array[i].substring(activities.nomeCognomeConducente[0] - 1)[0] == '2')
                verbale.nomeCognomeConducente = verbale.nomeCognomeConducente;
            else {
                verbale.nomeCognomeConducente = String(line == 'N2' ? array[i].substring(activities.nomeCognomeConducente[0] - 10, activities.nomeCognomeConducente[1]) : '').replace(/\s+/g, ' ').trim()
                verbale.nomeCognomeConducente = verbale.nomeCognomeConducente.substr(1, verbale.nomeCognomeConducente.length);
            }

            // if (verbale.nomeCognomeConducente.trim().includes('1JAMET'))
            //     break;
        }

        if (line == 'N3') {
            // console.log(i + " dentro  N3")
            rigaFile = line;
            verbale.codiceFiscaleProprietario = String(line == 'N3' ? array[i].substring(activities.codiceFiscaleProprietario[0], activities.codiceFiscaleProprietario[1]) : '').trim();
            verbale.nomeCognomeProprietario = String(line == 'N3' ? array[i].substring(activities.nomeCognomeProprietario[0], activities.nomeCognomeProprietario[1]) : '').trim();
        }

        if (line == 'N4') {

            if (rigaFile == 'N4') {
                i++;
                rigaFile = line;
                continue;
            }
            // if (rigaFile == line) {
            //     console.log(i + " dentro  N4 se rigaFile=line")
            //     csvData.push(verbale);
            //     var verbale = new Verbale();
            //     i++;
            //     continue;
            // } else {

            // console.log(i + " dentro  N4 ")
            //importo
            verbale.importo = String(line == 'N4' ? array[i].substring(activities.importo[0], activities.importo[1]) : '').trim();

            //numeroVerbale
            if (String(line == 'N4' ? array[i].substring(activities.numeroVerbale[0], activities.numeroVerbale[1]) : '').split('/')[0].length <= 5)
                verbale.numeroVerbale = String(line == 'N4' ? array[i].substring(activities.numeroVerbale[0], activities.numeroVerbale[1] - 2) : '').trim();
            else if (String(line == 'N4' ? array[i].substring(activities.numeroVerbale[0], activities.numeroVerbale[1]) : '').split('/')[0].length > 7) {
                verbale.numeroVerbale = String(line == 'N4' ? array[i].substring(activities.numeroVerbale[0], activities.numeroVerbale[1] + 1) : '').trim();
            } else
                verbale.numeroVerbale = String(line == 'N4' ? array[i].substring(activities.numeroVerbale[0], activities.numeroVerbale[1]) : '').trim();

            if (verbale.numeroVerbale.length >= 12 && (verbale.numeroVerbale.substring(3).includes('P') == false || verbale.numeroVerbale.substring(3).includes('V') == false))
                verbale.numeroVerbale = String(line == 'N4' ? array[i].substring(activities.numeroVerbale[0], activities.numeroVerbale[1] + 4) : '').trim();

            if ((String(verbale.numeroVerbale).indexOf('P', 4) + 1) != 0) {
                if ((String(verbale.numeroVerbale).indexOf('P', 4) + 1) != verbale.numeroVerbale.length)
                    verbale.numeroVerbale = verbale.numeroVerbale.split('P')[0] + 'P';
            }
            if ((String(verbale.numeroVerbale).indexOf('V', 4) + 1) != 0) {
                if ((String(verbale.numeroVerbale).indexOf('V', 4) + 1) != verbale.numeroVerbale.length)
                    verbale.numeroVerbale = verbale.numeroVerbale.split('V')[0] + 'V';
            }

            //dataVerbale
            if (String(line == 'N4' ? array[i].substring(activities.numeroVerbale[0], activities.numeroVerbale[1]) : '').split('/')[0].length <= 5)
                verbale.dataVerbale = String(line == 'N4' ? array[i].substring(activities.dataVerbale[0] - 2, activities.dataVerbale[1] - 2) : '').trim();
            else if (String(line == 'N4' ? array[i].substring(activities.numeroVerbale[0], activities.numeroVerbale[1]) : '').split('/')[0].length >= 8)
                verbale.dataVerbale = String(line == 'N4' ? array[i].substring(activities.dataVerbale[0] + 2, activities.dataVerbale[1] + 2) : '').trim();
            else if (typeof (line == 'N4' ? array[i].substring(activities.dataVerbale[0], activities.dataVerbale[1]) : '').split('P')[1] == 'undefined')
                verbale.dataVerbale = String(line == 'N4' ? array[i].substring(activities.dataVerbale[0], activities.dataVerbale[1]) : '').split('P')[0].trim();
            else
                verbale.dataVerbale = String(line == 'N4' ? array[i].substring(activities.dataVerbale[0], activities.dataVerbale[1]) : '').split('P')[1].trim();

            if (verbale.dataVerbale.includes('V ') || verbale.dataVerbale.includes('P '))
                verbale.dataVerbale = String(line == 'N4' ? array[i].substring(activities.dataVerbale[0], activities.dataVerbale[1] + 4) : '').split('P ')[1].trim();


            //targa
            if ((line == 'N4' ? array[i].substring(activities.targa[0], activities.targa[1]) : '').includes('.'))
                verbale.targa = String(line == 'N4' ? array[i].substring(activities.targa[0], activities.targa[1]) : '').split('.')[1].trim();
            else
                verbale.targa = String(line == 'N4' ? array[i].substring(activities.targa[0], activities.targa[1]) : '').trim();

            if (String(verbale.targa).includes(' A'))
                verbale.targa = String(verbale.targa).split(' A')[0].trim()

            if (verbale.targa.length <= 5)
                verbale.targa = String(line == 'N4' ? array[i].substring(activities.targa[0], activities.targa[1] + 4) : '').split('.')[1].trim();

            //articoloCDS
            verbale.articoloCDS = (line == 'N4' ? array[i].substring(activities.articoloCDS[0], activities.articoloCDS[1]) : '').split('D')[0];

            if (String(verbale.articoloCDS).lastIndexOf('.') == verbale.articoloCDS.length)
                verbale.articoloCDS = (line == 'N4' ? array[i].substring(activities.articoloCDS[0], activities.articoloCDS[1] + 3) : '').split('D')[0];

            verbale.articoloCDS = 'Art.' + verbale.articoloCDS.split('.')[1]


            //dataNotifica sottocasi particolari

            if (typeof (line == 'N4' ? array[i].substring(activities.dataNotifica[0], activities.dataNotifica[1]) : '').split('t')[1] == 'undefined')
                verbale.dataNotifica = String(convertData((line == 'N4' ? array[i].substring(activities.dataNotifica[0], activities.dataNotifica[1]) : '').split('t')[0])).trim();
            else
                verbale.dataNotifica = String(convertData((line == 'N4' ? array[i].substring(activities.dataNotifica[0], activities.dataNotifica[1]) : '').split('t')[1])).trim();

            if (verbale.dataNotifica == 'No//') {
                if (array[i].substring(activities.dataNotifica[0], activities.dataNotifica[1]).includes(' ') == true) {
                    verbale.dataNotifica = (line == 'N4' ? array[i].substring(activities.dataNotifica[0], activities.dataNotifica[1]) : '').trim();
                    verbale.dataNotifica = String(convertData(verbale.dataNotifica.substr(verbale.dataNotifica.length - 8)));
                }
            }
            if (verbale.dataNotifica.length != 10)
                verbale.dataNotifica = String(convertData((line == 'N4' ? array[i].substring(activities.dataNotifica[0] - 2, activities.dataNotifica[1]) : ''))).trim();


            //caso in cui ho solo 7 caratteri nella data (devono essere 8)
            if ((line == 'N4' ? array[i].substring(activities.dataNotifica[0], activities.dataNotifica[1]) : '').trim().length == 7) {

                if (typeof (line == 'N4' ? array[i].substring(activities.dataNotifica[0] - 1, activities.dataNotifica[1]) : '').split('t')[1] == 'undefined')
                    verbale.dataNotifica = String(convertData((line == 'N4' ? array[i].substring(activities.dataNotifica[0] - 1, activities.dataNotifica[1]) : '').split('t')[0])).trim();
                else
                    verbale.dataNotifica = String(convertData((line == 'N4' ? array[i].substring(activities.dataNotifica[0] - 1, activities.dataNotifica[1]) : '').split('t')[1])).trim();


            }

            if (rigaFile == 'N2' || rigaFile == 'N3') {
                // console.log(i + " dentro  N4 se rigaFile=line")
                csvData.push(verbale);
                var verbale = new Verbale();
                i++;
                rigaFile = line;

                continue;

            }

        }

        rigaFile = array[i].substring(0, 2);
        i++;

    }
    while (i < x);
    numeroVerbaliPerFile.nomeFile = fileName;
    console.log(numeroVerbaliPerFile);
    return csvData;
};

function saveCsvData(file, csvData) {
    let createCsvWriter = require('csv-writer').createObjectCsvWriter;
    let csvWriter = createCsvWriter({
        path: file + '.csv',
        header: [{
                id: 'codiceFiscaleConducente',
                title: 'CodiceFiscaleConducente'
            },
            {
                id: 'nomeCognomeConducente',
                title: 'NomeCognomeConducente'
            },
            {
                id: 'codiceFiscaleProprietario',
                title: 'CodiceFiscaleProprietario'
            },
            {
                id: 'nomeCognomeProprietario',
                title: 'NomeCognomeProprietario'
            },
            {
                id: 'importo',
                title: 'Importo'
            },
            {
                id: 'numeroVerbale',
                title: 'NumeroVerbale'
            },
            {
                id: 'dataVerbale',
                title: 'DataVerbale'
            },
            {
                id: 'targa',
                title: 'Targa'
            },
            {
                id: 'articoloCDS',
                title: 'ArticoloCDS'
            },
            {
                id: 'dataNotifica',
                title: 'DataNotifica'
            },
        ]
    });

    csvWriter
        .writeRecords(csvData)
        .then(() => console.log('The CSV file was written successfully'));
};

function convertData(data) {
    let dd = data.substring(0, 2);
    let MM = data.substring(2, 4);
    let yyyy = data.substring(4, 8);

    return dd + '/' + MM + '/' + yyyy;
};
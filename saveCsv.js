function saveFile(file, csvData) {
    let createCsvWriter = require('csv-writer').createObjectCsvWriter;
    let csvWriter = createCsvWriter({
        path: file + '.csv',
        header: [{
                id: 'codiceFiscaleConducente',
                title: 'CodiceFiscaleConducente'
            },
            {
                id: 'cognomeConducente',
                title: 'CognomeConducente'
            },
            {
                id: 'nomeConducente',
                title: 'NomeConducente'
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

module.exports = saveFile;
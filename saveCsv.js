function saveFile(file, csvData) {
    let createCsvWriter = require('csv-writer').createObjectCsvWriter;

    let csvWriter = createCsvWriter({
        path: file + '.csv',
        fieldDelimiter: ';',
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
                id: 'indirizzo',
                title: 'indirizzoConducente'
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
                id: 'indirizzoProprietario',
                title: 'indirizzoProprietario'
            },
            {
                id: 'importo',
                title: 'Importo'
            },
            {
                id: 'maggiorazione',
                title: 'maggiorazione'
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
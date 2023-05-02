function extract(data, activities, fileName) {

    let array = data.split(/\r\n|\n/)

    let doubleLine = false;

    function Verbale() {
        codiceFiscaleConducente: '';
        nomeConducente: '';
        cognomeConducente: '';
        codiceFiscaleProprietario: '';
        nomeCognomeProprietario: '';
        indirizzoProprietario: '';
        indirizzo: '';
        importo: '';
        maggiorazione: '';
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

        // console.log(i + " prima di N2")
        if (line == 'N2') {
            numeroVerbaliPerFile.numeroVerbale += 1;
            // console.log(i + " dentro N2")
            rigaFile = line;
            verbale.indirizzoProprietario = "";
            verbale.indirizzo =
                String(line == 'N2' ? array[i].substring(activities.indirizzo[0],
                    activities.indirizzo[1]) : '').replace(/\s+/g, ' ').trim()

            verbale.codiceFiscaleConducente = String(line == 'N2' ? array[i].substring(activities.codiceFiscaleConducente[0],
                activities.codiceFiscaleConducente[1]) : '').replace(/\s+/g, ' ').trim()

            verbale.cognomeConducente = String(line == 'N2' ? array[i].substring(activities.cognomeConducente[0], activities.cognomeConducente[1]) : '').replace(/\s+/g, ' ').trim()
            verbale.nomeConducente = String(line == 'N2' ? array[i].substring(activities.nomeConducente[0], activities.nomeConducente[1]) : '').replace(/\s+/g, ' ').trim()


            if (array[i].substring(activities.cognomeConducente[0] - 1)[0] == '2')
                verbale.cognomeConducente = String(line == 'N2' ? array[i].substring(activities.cognomeConducente[0], activities.cognomeConducente[1] + 50) : '').replace(/\s+/g, ' ').trim()
            if (array[i].substring(activities.cognomeConducente[0] - 1)[0] == '1')
                verbale.cognomeConducente = verbale.cognomeConducente;
            if (array[i].substring(activities.cognomeConducente[0] - 1)[0] != 1 &&
                array[i].substring(activities.cognomeConducente[0] - 1)[0] != 2 &&
                array[i].substring(activities.cognomeConducente[0] - 10, activities.cognomeConducente[1]).includes('1')) {
                verbale.cognomeConducente = String(line == 'N2' ? array[i].substring(activities.cognomeConducente[0] - 10,
                    activities.cognomeConducente[1]) : '');
                verbale.cognomeConducente = verbale.cognomeConducente.substr(verbale.cognomeConducente.indexOf('1') + 1, 20).replace(/\s+/g, ' ').trim();
            }
            if (array[i].substring(activities.cognomeConducente[0] - 1)[0] != 1 &&
                array[i].substring(activities.cognomeConducente[0] - 1)[0] != 2 &&
                array[i].substring(activities.cognomeConducente[0] - 10,
                    activities.cognomeConducente[0]).includes('2')) {
                verbale.cognomeConducente = String(line == 'N2' ? array[i].substring(activities.cognomeConducente[0] - 10,
                    activities.cognomeConducente[1]) : '');
                verbale.cognomeConducente = verbale.cognomeConducente.substr(verbale.cognomeConducente.indexOf('2') + 1, 50).replace(/\s+/g, ' ').trim();
            }

            let newString = verbale.cognomeConducente;
            let firstWord = newString.split(' ')[0];

            //tolgo la stringa SAS o SRL e la metto alla fine
            if (newString.split(' ')[0].includes("SAS") ||
                newString.split(' ')[0].includes("SRL")) {

                newString = newString.replace('SAS', '');
                newString = newString.replace('SRL', '');

                // console.log(newString);

                verbale.cognomeConducente = newString + " " + firstWord;

                // console.log(verbale.cognomeConducente);
            }

            if (verbale.codiceFiscaleConducente.length == 11) {
                verbale.nomeConducente = "";
            }

            // if (verbale.codiceFiscaleConducente.trim().includes('02681400020'))
            //   break;

        }

        if (line == 'N3') {
            // console.log(i + " dentro  N3")
            doubleLine = true;
            rigaFile = line;
            verbale.codiceFiscaleProprietario = String(line == 'N3' ? array[i].substring(activities.codiceFiscaleProprietario[0], activities.codiceFiscaleProprietario[1]) : '').trim();
            verbale.nomeCognomeProprietario = String(line == 'N3' ? array[i].substring(activities.nomeCognomeProprietario[0], activities.nomeCognomeProprietario[1]) : '').trim();
            verbale.indirizzoProprietario = String(line == 'N3' ? array[i].substring(activities.indirizzoProprietario[0], activities.indirizzoProprietario[1]) : '').trim();
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
            const pair = Array.from(verbale.importo)
            pair.splice(24, 0, ',')
            verbale.importo = '';
            verbale.importo = pair.join('');


            //targa
            verbale.targa = (line == 'N4' ? array[i].substring(activities.targa[0], activities.targa[1]) : 'NON TROVATA');
            verbale.numeroVerbale = String(line == 'N4' ? array[i].substring(activities.numeroVerbale[0], activities.numeroVerbale[1]) : '').trim();
            verbale.numeroVerbale = verbale.numeroVerbale.slice(0, verbale.numeroVerbale.indexOf(" n"))

            //console.log(verbale.targa)
            console.log(verbale.targa.length)
            console.log(verbale.targa)
            if (verbale.targa != null) {
                if (verbale.targa.length == 6) {

                    verbale.numeroVerbale = String(line == 'N4' ? array[i].substring(activities.numeroVerbale[0] + 1, activities.numeroVerbale[1] + 1) : '').trim();
                    verbale.numeroVerbale = verbale.numeroVerbale.slice(0, verbale.numeroVerbale.indexOf(" n"))
                }
                if (verbale.targa.length == 5) {
                    verbale.numeroVerbale = String(line == 'N4' ? array[i].substring(activities.numeroVerbale[0] + 2, activities.numeroVerbale[1] + 2) : '').trim();
                    verbale.numeroVerbale = verbale.numeroVerbale.slice(0, verbale.numeroVerbale.indexOf(" n"))
                }
                if (verbale.targa.length == 7) {
                    verbale.numeroVerbale = String(line == 'N4' ? array[i].substring(activities.numeroVerbale[0], activities.numeroVerbale[1]) : '').trim();
                    verbale.numeroVerbale = verbale.numeroVerbale.slice(0, verbale.numeroVerbale.indexOf(" n"))
                }
            }

            //dataVerbale
            verbale.dataVerbale = (line == 'N4' ? array[i].substring(activities.dataVerbale[0], activities.dataVerbale[1]) : 'NON TROVATA');
            let tempDataVerbale = verbale.dataVerbale;
            verbale.dataVerbale = tempDataVerbale.slice(0, 2) +
                '/' + tempDataVerbale.slice(2, 4) +
                '/' + '20' +
                tempDataVerbale.slice(4, 6);

            //articoloCDS
            verbale.articoloCDS = (line == 'N4' ? array[i].substring(activities.articoloCDS[0], activities.articoloCDS[1]) : '').split('D')[0];

            // if (String(verbale.articoloCDS).lastIndexOf('.') == verbale.articoloCDS.length)
            //     verbale.articoloCDS = (line == 'N4' ? array[i].substring(activities.articoloCDS[0], activities.articoloCDS[1] + 3) : '').split('D')[0];

            // verbale.articoloCDS = 'Art.' + verbale.articoloCDS.split('.')[1]

            // if ((verbale.articoloCDS).length <= 4) {
            //     var begin = array[i].indexOf(verbale.targa) + (verbale.targa).length + 1;
            //     verbale.articoloCDS = (line == 'N4' ? array[i].substring(begin, begin + 9 + 3) : '').split('D')[0];
            // }

            // if (verbale.codiceFiscaleConducente.trim().includes('00001930130'))
            //     break;

            //dataNotifica sottocasi particolari
            verbale.dataNotifica = (line == 'N4' ?
                array[i].substring(activities.dataNotifica[0], activities.dataNotifica[1]) : '');

            verbale.dataNotifica = verbale.dataNotifica.slice(verbale.dataNotifica.indexOf(":") + 1, verbale.dataNotifica.length).trim()
            // if (typeof (line == 'N4' ? array[i].substring(activities.dataNotifica[0], activities.dataNotifica[1]) : '').split('t')[1] == 'undefined')
            //     verbale.dataNotifica = String(convertData((line == 'N4' ? array[i].substring(activities.dataNotifica[0], activities.dataNotifica[1]) : '').split('t')[0])).trim();
            // else
            //     verbale.dataNotifica = String(convertData((line == 'N4' ? array[i].substring(activities.dataNotifica[0], activities.dataNotifica[1]) : '').split('t')[1])).trim();

            // if (verbale.dataNotifica == 'No//') {
            //     if (array[i].substring(activities.dataNotifica[0], activities.dataNotifica[1]).includes(' ') == true) {
            //         verbale.dataNotifica = (line == 'N4' ? array[i].substring(activities.dataNotifica[0], activities.dataNotifica[1]) : '').trim();
            //         verbale.dataNotifica = String(convertData(verbale.dataNotifica.substr(verbale.dataNotifica.length - 8)));
            //     }
            // }
            // if (verbale.dataNotifica.length != 10)
            //     verbale.dataNotifica = String(convertData((line == 'N4' ? array[i].substring(activities.dataNotifica[0] - 2, activities.dataNotifica[1]) : ''))).trim();


            //caso in cui ho solo 7 caratteri nella data (devono essere 8)
            // if ((line == 'N4' ? array[i].substring(activities.dataNotifica[0], activities.dataNotifica[1]) : '').trim().length == 7) {

            //     if (typeof (line == 'N4' ? array[i].substring(activities.dataNotifica[0] - 1, activities.dataNotifica[1]) : '').split('t')[1] == 'undefined')
            //         verbale.dataNotifica = String(convertData((line == 'N4' ? array[i].substring(activities.dataNotifica[0] - 1, activities.dataNotifica[1]) : '').split('t')[0])).trim();
            //     else
            //         verbale.dataNotifica = String(convertData((line == 'N4' ? array[i].substring(activities.dataNotifica[0] - 1, activities.dataNotifica[1]) : '').split('t')[1])).trim();
            // }

            //prendo la maggiorazione
            let secondN4Line = array[i + 1].substring(0, 2);
            if (secondN4Line == 'N4') {
                verbale.maggiorazione = String(line == 'N4' ? array[i + 1].substring(activities.maggiorazione[0], activities.maggiorazione[1]) : '').trim();
                const pair = Array.from(verbale.maggiorazione)
                pair.splice(24, 0, ',')
                verbale.maggiorazione = '';
                verbale.maggiorazione = pair.join('');
            }

            //caso in cui non esiste il numero della targa
            if (!array[i].substring(69, 81).includes('Targa')) {
                console.log(array[i].substring(01, 444))
                // console.log(!array[i].substring(69, 81).includes('targa'))
                verbale.targa = '';
                verbale.dataVerbale = (line == 'N4' ? array[i].substring(activities.dataVerbale[0] - 14, activities.dataVerbale[1] - 14) : 'NON TROVATA');
                //dataNotifica sottocasi particolari
                verbale.dataNotifica = (line == 'N4' ?
                    array[i].substring(activities.dataNotifica[0], activities.dataNotifica[1]) : '');
                verbale.dataNotifica = verbale.dataNotifica.slice(verbale.dataNotifica.indexOf(":") + 1, verbale.dataNotifica.length).trim()
                verbale.numeroVerbale = String(line == 'N4' ? array[i].substring(activities.numeroVerbale[0], activities.numeroVerbale[1]) : '').trim();
                verbale.numeroVerbale = verbale.numeroVerbale.slice(0, verbale.numeroVerbale.indexOf(" n"))
            }

            if (rigaFile == 'N2' || rigaFile == 'N3') {
                // console.log(i + " dentro  N4 se rigaFile=line")
                if (doubleLine) {
                    doubleLine = false;

                    csvData.push(verbale);
                    csvData.push(verbale);

                } else {
                    csvData.push(verbale);
                }

                doubleLine = false;
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

module.exports = extract;

function convertData(data) {
    let dd = data.substring(0, 2);
    let MM = data.substring(2, 4);
    let yyyy = data.substring(4, 8);

    return dd + '/' + MM + '/' + yyyy;
};

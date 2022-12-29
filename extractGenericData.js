function extract(data, activities, fileName) {

    let array = data.split(/\r\n|\n/)

    function Verbale() {
        codiceFiscaleConducente: '';
        nomeConducente: '';
        cognomeConducente: '';
        codiceFiscaleProprietario: '';
        nomeCognomeProprietario: '';
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


            if (verbale.codiceFiscaleConducente.length == 11) {
                verbale.nomeConducente = "";
            }

            // if (verbale.codiceFiscaleConducente.trim().includes('02681400020'))
            //   break;

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
            const pair = Array.from(verbale.importo)
            pair.splice(24, 0, ',')
            verbale.importo = '';
            verbale.importo = pair.join('');


            //targa
            verbale.targa = (line == 'N4' ? array[i].substring(activities.targa[0], activities.targa[1]) : 'NON TROVATA');


            // if ((line == 'N4' ? array[i].substring(activities.targa[0], activities.targa[1]) : '').includes('.'))
            //     verbale.targa = String(line == 'N4' ?
            //         array[i].substring(activities.targa[0], activities.targa[1]) : '').split('.')[1].trim();
            // else
            //     verbale.targa = String(line == 'N4' ?
            //         array[i].substring(activities.targa[0], activities.targa[1]) : '').trim();

            // if (String(verbale.targa).includes(' A'))
            //     verbale.targa = String(verbale.targa).split(' A')[0].trim()

            // if (verbale.targa.length <= 5)
            //     verbale.targa = String(line == 'N4' ?
            //         array[i].substring(activities.targa[0], activities.targa[1] + 4) : '').split('.')[1].trim();


            //numeroVerbale

            verbale.numeroVerbale = String(line == 'N4' ? array[i].substring(activities.numeroVerbale[0], activities.numeroVerbale[1]) : '').trim();
            verbale.numeroVerbale = verbale.numeroVerbale.slice(0, verbale.numeroVerbale.indexOf(" n"))

            //dataVerbale
            verbale.dataVerbale = (line == 'N4' ? array[i].substring(activities.dataVerbale[0], activities.dataVerbale[1]) : 'NON TROVATA');
            // else if (String(line == 'N4' ? array[i].substring(activities.numeroVerbale[0], activities.numeroVerbale[1]) : '').split('/')[0].length >= 8)
            //     verbale.dataVerbale = String(line == 'N4' ? array[i].substring(activities.dataVerbale[0] + 2, activities.dataVerbale[1] + 2) : '').trim();
            // else if (typeof (line == 'N4' ? array[i].substring(activities.dataVerbale[0], activities.dataVerbale[1]) : '').split('P')[1] == 'undefined')
            //     verbale.dataVerbale = String(line == 'N4' ? array[i].substring(activities.dataVerbale[0], activities.dataVerbale[1]) : '').split('P')[0].trim();
            // else
            //     verbale.dataVerbale = String(line == 'N4' ? array[i].substring(activities.dataVerbale[0], activities.dataVerbale[1]) : '').split('P')[1].trim();

            // if (verbale.dataVerbale.includes('V ') || verbale.dataVerbale.includes('P '))
            //     verbale.dataVerbale = String(line == 'N4' ? array[i].substring(activities.dataVerbale[0], activities.dataVerbale[1] + 4) : '').split('P ')[1].trim();


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

module.exports = extract;

function convertData(data) {
    let dd = data.substring(0, 2);
    let MM = data.substring(2, 4);
    let yyyy = data.substring(4, 8);

    return dd + '/' + MM + '/' + yyyy;
};
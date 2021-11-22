filePath = 'C:\\Users\\alessio.bocci\\OneDrive - Nivi Spa\\LAVORO\\Conversione CSV a file EXCEL OSPITALETTO analisi AGNESE\\data\\';

let activities = 
    {codiceFiscaleConducente:[24,40],
    nomeCognomeConducente: [210-1,254-1],
    codiceFiscaleProprietario:[24,40],
    nomeCognomeProprietario:[199,243],
    importo:[32,68],
    numeroVerbale:[70,81],
    dataVerbale:[81,90],
    targa:[90,102],
    articoloCDS:[102,111],
    dataNotifica:[114,129],
    };

//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//passsing directoryPath and callback function
fs.readdir(filePath , function (err, files) {
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

        fs.readFile(filePath + file, 'utf8' , (err, data) => {
            if (err) {
              console.error(err);
              return
            }
        
            let csvFile = extractData (data,activities);
            saveCsvData (filePath + 'output\\'+ file, csvFile);
        });

    });
});



function extractData(data,activities) {

    let array = data.split(/\r\n|\n/)
    
    let codiceFiscaleConducente = '';
    let nomeCognomeConducente ='';
    let codiceFiscaleProprietario = '';
    let nomeCognomeProprietario ='';
    let importo ='';
    let numeroVerbale='';
    let dataVerbale ='';
    let targa ='';
    let articoloCDS ='';
    let dataNotifica ='';
    
    function Verbale () 
      {
      codiceFiscaleConducente,
      nomeCognomeConducente,
      codiceFiscaleProprietario,
      nomeCognomeProprietario,
      importo,
      numeroVerbale,
      dataVerbale,  
      targa,
      articoloCDS,
      dataNotifica
    }
    
    let rigaFile = '';
    let csvData = [];
    
    var verbale = new Verbale();
    // do-while loops
    let i =0;
    let x = array.length;
    do{
        let line = array[i].substring(0,2);
    
        if (line=='N2')
        { 
          rigaFile = line;
          verbale.codiceFiscaleConducente = (line=='N2' ? array[i].substring(activities.codiceFiscaleConducente[0],activities.codiceFiscaleConducente[1]):'');
          verbale.nomeCognomeConducente = (line=='N2' ? array[i].substring(activities.nomeCognomeConducente[0],activities.nomeCognomeConducente[1]):'');
        }
        
        if (line=='N3')
        { 
          rigaFile = line;
          verbale.codiceFiscaleProprietario = (line=='N3' ? array[i].substring(activities.codiceFiscaleProprietario[0],activities.codiceFiscaleProprietario[1]):'');
          verbale.nomeCognomeProprietario = (line=='N3' ? array[i].substring(activities.nomeCognomeProprietario[0],activities.nomeCognomeProprietario[1]):'');
        }nomeCognomeProprietario
        
        if (line=='N4')
        { 
          if (rigaFile == line){
          csvData.push (verbale);
          var verbale = new Verbale();
          i++;
          continue;
          }
          else{
            verbale.importo = (line=='N4' ? array[i].substring(activities.importo[0],activities.importo[1]):'');
            verbale.numeroVerbale = (line=='N4' ? array[i].substring(activities.numeroVerbale[0],activities.numeroVerbale[1]):'');
            verbale.dataVerbale = (line=='N4' ? array[i].substring(activities.dataVerbale[0],activities.dataVerbale[1]):'');
            verbale.targa = (line=='N4' ? array[i].substring(activities.targa[0],activities.targa[1]):'').split('Tg.')[1];
            verbale.articoloCDS = (line=='N4' ? array[i].substring(activities.articoloCDS[0],activities.articoloCDS[1]):'').split('D')[0];
            if (typeof(line=='N4' ? array[i].substring(activities.dataNotifica[0],activities.dataNotifica[1]):'').split('t')[1]=='undefined')
                verbale.dataNotifica = convertData((line=='N4' ? array[i].substring(activities.dataNotifica[0],activities.dataNotifica[1]):'').split('t')[0]);
            else
                verbale.dataNotifica = convertData((line=='N4' ? array[i].substring(activities.dataNotifica[0],activities.dataNotifica[1]):'').split('t')[1]);
          }
        }
    
        rigaFile = array[i].substring(0,2);
        i++;
    
    } while(i<x);
    
    return csvData;
    };
    
    function saveCsvData(file,csvData) {
        let createCsvWriter = require('csv-writer').createObjectCsvWriter;
        let csvWriter = createCsvWriter({
            path: file + '.csv',
            header: [
                { id: 'codiceFiscaleConducente', title: 'CodiceFiscaleConducente' },
                { id: 'nomeCognomeConducente', title: 'NomeCognomeConducente' },
                { id: 'codiceFiscaleProprietario', title: 'CodiceFiscaleProprietario' },
                { id: 'nomeCognomeProprietario', title: 'NomeCognomeProprietario' },
                { id: 'importo', title: 'Importo' },
                { id: 'numeroVerbale', title: 'NumeroVerbale' },
                { id: 'dataVerbale', title: 'DataVerbale' },
                { id: 'targa', title: 'Targa' },
                { id: 'articoloCDS', title: 'ArticoloCDS' },
                { id: 'dataNotifica', title: 'DataNotifica' },
            ]
        });
    
        csvWriter
            .writeRecords(csvData)
            .then(() => console.log('The CSV file was written successfully'));
    };

    function convertData (data) {
        let dd = data.substring(0,2);
        let MM = data.substring(2,4);
        let yyyy = data.substring(4,8);

        return dd+'/'+MM+'/'+yyyy;
    };
    




filePath = 'C:\\Users\\alessio.bocci\\OneDrive - Nivi Spa\\LAVORO\\Conversione CSV a file EXCEL OSPITALETTO analisi AGNESE\\'

const fs = require('fs')

fs.readFile(filePath + '000002017', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

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

let verbale = {
  codiceFiscaleConducente,
  nomeCognomeConducente,
  codiceFiscaleProprietario,
  nomeCognomeProprietario,
  importo,
  numeroVerbale,
  dataVerbale,  
  targa,
  articoloCDS,
  dataNotifica,
}

let rigaFile = '';
let csvData = [];

// do-while loops
let i =0;
let x = array.length;
do{

    let line = array[i].substring(0,2);

    if (line=='N2')
    { 
      rigaFile = line;
      verbale.codiceFiscaleConducente = (line=='N2' ? array[i].substring(25-1,41-1) : '');
      verbale.nomeCognomeConducente = (line=='N2' ? array[i].substring(210-1,254-1) : '');
    }
    
    if (line=='N3')
    { 
      rigaFile = line;
      verbale.codiceFiscaleProprietario = (line=='N3' ? array[i].substring(25,41) : '');
      verbale.nomeCognomeProprietario = (line=='N3' ? array[i].substring(200,244) : '');
    }
    
    if (line=='N4')
    { 
      if (rigaFile == line){
      csvData.push (verbale);
      i++;
      continue;
      }
      else{
        verbale.importo = (line=='N4' ? array[i].substring(33,69) : '');
        verbale.numeroVerbale = (line=='N4' ? array[i].substring(71,82) : '');
        verbale.dataVerbale = (line=='N4' ? array[i].substring(82,91) : '');
        verbale.targa = (line=='N4' ? array[i].substring(91,103) : '');
        verbale.articoloCDS = (line=='N4' ? array[i].substring(103,112) : '');
        verbale.dataNotifica = (line=='N4' ? array[i].substring(115,130) : '');
      }
    }

    rigaFile = array[i].substring(0,2);

    i++;

} while(i<x);

console.log(csvData)

let createCsvWriter = require('csv-writer').createObjectCsvWriter;
let csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'codiceFiscaleConducente', title: 'CodiceFiscaleConducente'},
    {id: 'nomeCognomeConducente', title: 'NomeCognomeConducente'},
    {id: 'codiceFiscaleProprietario', title: 'CodiceFiscaleProprietario'},
    {id: 'nomeCognomeProprietario', title: 'NomeCognomeProprietario'},
    {id: 'importo', title: 'Importo'},
    {id: 'numeroVerbale', title: 'NumeroVerbale'},
    {id: 'dataVerbale', title: 'DataVerbale'},
    {id: 'targa', title: 'Targa'},
    {id: 'articoloCDS', title: 'ArticoloCDS'},
    {id: 'dataNotifica', title: 'DataNotifica'},
  ]
});

  csvWriter
  .writeRecords(csvData)
  .then(()=> console.log('The CSV file was written successfully'));
}

)
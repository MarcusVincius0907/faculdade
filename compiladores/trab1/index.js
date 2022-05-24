
const {log} = require('./log');
const fs = require('fs');

const {lexicalAnalysis} = require('./lexicalAnalysis');
const {syntaxAnalisys} = require('./syntaxAnalisys')

async function main(){
  console.log('Iniciando análise');
  try{

    const respLexical = await lexicalAnalysis('test.c', log, fs).then(e => e);

    if(!respLexical) {
      console.log('Lexema não foi criado. Fim do processo.');
      return;
    }

    const respSyntax = syntaxAnalisys(respLexical);
    if(respSyntax){
      console.log('Nenhuma falha encontrada.');
    }

    console.log('Fim do processo.');
    return;

    
    
  }catch(e){
    log("ERRO GENÉRICO", `ocorreu um erro no processo ${e}`);
    console.log('Fim do processo.');
    return;
  }
}

main();
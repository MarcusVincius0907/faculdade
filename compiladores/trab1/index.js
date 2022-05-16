
const {log} = require('./log');
const readline = require('readline');
const fs = require('fs');
const {tokens} = require('./tokens');


const {lexicalAnalysis} = require('./lexicalAnalysis');

async function main(){
  console.log('Iniciando análise');
  await lexicalAnalysis('test.cpp', log, readline, fs, tokens).then(e => e);
  console.log('Finalizando análise');
}

main();
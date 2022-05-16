async function lexicalAnalysis(file, log, readline, fs, tokens){
  return new Promise((res, rej) => {
    try{
      const myInterface = readline.createInterface({
        input: fs.createReadStream(file)
      });
    
      
      let lineno = 0;
      myInterface.on('line',  (line) => {
    
        lineno++;
    
        console.log('Line number ' + lineno + ': ' + line);
    
        for (let i = 0; i < line.length; i++) {
          let item = line.charAt(i);
          if(!tokens.includes(item)){
            console.log('não faz parte da linguagem', item);
            log("ERRO LEXICO", `${item} não faz parte da linguagem. Encontra-se na linha ${lineno}, coluna ${i+1} `);
          }
        }
    
      });
    }catch(e){
      log("ERRO GENÉRICO", `ocorreu um erro no processo ${e}`);
    }
    res(true);
  })
}

module.exports = {
  lexicalAnalysis
}
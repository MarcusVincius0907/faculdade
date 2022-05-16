async function syntaxAnalisys(file, log, readline, fs, tokens){
  return new Promise((res, rej) => {
    try{
    
    }catch(e){
      log("ERRO GENÉRICO", `ocorreu um erro no processo ${e}`);
    }
    res(true);
  })
}

function lineBreak(currentChar, previousChar){
  if(previousChar);
}

module.exports = {
  syntaxAnalisys
}
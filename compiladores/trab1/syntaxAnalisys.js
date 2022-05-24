const categories = require('./categories');
const {log} = require('./log');

function syntaxAnalisys(lexeme){
  
  try{
    return processLexeme(lexeme);
  }catch(e){
    log("ERRO GENÉRICO", `ocorreu um erro no processo ${e}`);
    return false;
  }
    
}

function processLexeme(lexeme){
  let successInProcess = true;
  lexeme.forEach((row, index) => {
    let orderTokens = row.tokens.sort( (a,b)=> a.indexInicio - b.indexInicio);
    if(!processRow(orderTokens)) {
      successInProcess = false;
      log("ERRO SINTÁTICO", `Encontra-se na linha ${index+1}`);
    }
  });

  return successInProcess;
}

function processRow(tokens){
  if(tokens.length < 2) return true;

  let rowValid = true;

  for (let i = 0; i < tokens.length; i++) {
    try{
      if(tokens[i+1]){
        let current = tokens[i];
        let next = tokens[i+1];
  
        if(!applyRules(current, next)) rowValid = false;
  
      }    
    }catch(e){
      break;
    }
  }

  return rowValid;

}

function applyRules(value1, value2){

  if(
    (value1.tipo === categories.whiteSpaceLable) ||
    (value2.tipo === categories.whiteSpaceLable)
  ) return true;
  
  if(
    (value1.tipo === categories.literalValueLable) && 
    (
      value2.tipo === categories.mathOperation.lable ||
      value2.tipo === categories.closePrioritySymbol.lable
    )
  ) return true;

  if(
    (value1.tipo === categories.identifierSymbol.lable) && 
    ( 
      value2.tipo === categories.attributionSymbol.lable || 
      value2.tipo === categories.mathOperation.lable || 
      value2.tipo === categories.openPrioritySymbol.lable || 
      value2.tipo === categories.closePrioritySymbol.lable

    )
  ) return true;

  if(
    (value1.tipo === categories.keywordLable) &&
    (value2.tipo === categories.identifierSymbol.lable)
  ) return true;

  if(
    (value1.tipo === categories.mathOperation.lable) &&
    (
      (value2.tipo === categories.literalValueLable) ||
      (value2.tipo === categories.identifierSymbol.lable) ||
      (value2.tipo === categories.closePrioritySymbol.lable)
    )
  ) return true;

  if(
    (value1.tipo === categories.attributionSymbol.lable) &&
    (
      (value2.tipo === categories.literalValueLable) ||
      (value2.tipo === categories.identifierSymbol.lable) ||
      (value2.tipo === categories.closePrioritySymbol.lable)
    )
  ) return true;

  if(
    (value1.tipo === categories.openPrioritySymbol.lable) &&
    (
      (value2.tipo === categories.closePrioritySymbol.lable)||
      (value2.tipo === categories.identifierSymbol.lable) ||
      (value2.tipo === categories.keywordLable) ||
      (value2.tipo === categories.literalValueLable) 
    )
  ) return true;

  if(
    (value1.tipo === categories.closePrioritySymbol.lable) &&
    (
      (value2.tipo === categories.semiColonSymbol.lable) ||
      (value2.tipo === categories.openCurlyBreaketsSymbol.lable)
    )
  ) return true;

  if(value2.tipo === categories.commentsLabel) return true;

  if(
    (value2.tipo === categories.semiColonSymbol.lable) &&
    (
      value1.tipo === categories.identifierSymbol.lable ||
      value1.tipo === categories.closePrioritySymbol.lable ||
      value1.tipo === categories.literalValueLable
    )
  ) return true;

}


module.exports = {
  syntaxAnalisys
}
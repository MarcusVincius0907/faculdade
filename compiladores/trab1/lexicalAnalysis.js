const categories = require('./categories');


async function lexicalAnalysis(file, log, fs){
  
  try{

    const hasInvalidChar = await lookForInvalidChar(file, log, fs).then(e => e);

    if(!hasInvalidChar){
      try {
        const data = fs.readFileSync(file, 'utf8');
        return createLexeme(data);
      } catch (e) {
        console.log(e);
        throw e;
      }
    } else return null;


  }catch(e){
    log("ERRO GENÉRICO", `ocorreu um erro no processo ${e}`);
  }
  
}

async function lookForInvalidChar(file, log, fs){

  return await new Promise(async (res, rej) => {
    let hasInvalidChar = false;

    const data = fs.readFileSync(file, 'utf8');
    const lines = data.split('\r\n');
    lines.forEach((line,index) => {
      for (let i = 0; i < line.length; i++) {
        let item = line.charAt(i);
        if(!categories.grammar.includes(item)){
          hasInvalidChar = true;
          log("ERRO LEXICO", `${item} não faz parte da linguagem. Encontra-se na linha ${index+1}, coluna ${i+1} `);
        }
      }
    })

    res(hasInvalidChar);
  })
  

}

function createLexeme(data){
  const lexeme = [];
  const lines = data.split('\r\n');

  try{
    
    lines.forEach((line,index) => {
      
      const newRow = {rowNumber: index, tokens: []}

      let tokens = [];

      let lineProcessed = line;

      let resp = checkComments(lineProcessed);
      if(resp.tokens.length > 0) tokens = [...tokens,...resp.tokens];
      lineProcessed = resp.newLineProcessed;

      resp = checkIsWhiteSpaces(lineProcessed);
      if(resp.tokens.length > 0) tokens = [...tokens,...resp.tokens];
      lineProcessed = resp.newLineProcessed;
      
      //resp = checkIsLineBreak(line);
      //if(resp.length > 0) tokens = [...tokens,...resp];

      //lib
      resp = check(lineProcessed, categories.libSymbols);
      if(resp.tokens.length > 0) tokens = [...tokens,...resp.tokens];
      lineProcessed = resp.newLineProcessed;
      
      //string values
      resp = check(lineProcessed, categories.stringLiteralValue);
      if(resp.tokens.length > 0) tokens = [...tokens,...resp.tokens];
      lineProcessed = resp.newLineProcessed;

      resp = checkIsKeyword(lineProcessed);
      if(resp.tokens.length > 0) tokens = [...tokens,...resp.tokens];
      lineProcessed = resp.newLineProcessed;

      //float values
      resp = check(lineProcessed, categories.floatLiteralValue);
      if(resp.tokens.length > 0) tokens = [...tokens,...resp.tokens];
      lineProcessed = resp.newLineProcessed;

      //integer values
      resp = check(lineProcessed, categories.intLiteralValue);
      if(resp.tokens.length > 0) tokens = [...tokens,...resp.tokens];
      lineProcessed = resp.newLineProcessed;

      //boolean values
      resp = check(lineProcessed, categories.booleanLiteralValue);
      if(resp.tokens.length > 0) tokens = [...tokens,...resp.tokens];
      lineProcessed = resp.newLineProcessed;
      
      //math operation
      resp = check(lineProcessed, categories.mathOperation);
      if(resp.tokens.length > 0) tokens = [...tokens,...resp.tokens];
      lineProcessed = resp.newLineProcessed;

      //attribution
      resp = check(lineProcessed, categories.attributionSymbol);
      if(resp.tokens.length > 0) tokens = [...tokens,...resp.tokens];
      lineProcessed = resp.newLineProcessed;
      
      //semicolon
      resp = check(lineProcessed, categories.semiColonSymbol);
      if(resp.tokens.length > 0) tokens = [...tokens,...resp.tokens];
      lineProcessed = resp.newLineProcessed;

      //comma
      resp = check(lineProcessed, categories.commaSymbol);
      if(resp.tokens.length > 0) tokens = [...tokens,...resp.tokens];
      lineProcessed = resp.newLineProcessed;

      resp = checkOpenCloseSymbols(lineProcessed);
      if(resp.tokens.length > 0) tokens = [...tokens,...resp.tokens];
      lineProcessed = resp.newLineProcessed;

      //identifier
      resp = check(lineProcessed, categories.identifierSymbol);
      if(resp.tokens.length > 0) tokens = [...tokens,...resp.tokens];
      lineProcessed = resp.newLineProcessed;
      
      newRow.tokens = tokens;
      lexeme.push(newRow);
  
    });

    return lexeme;

  }catch(e){
    console.log('Error processing line', e);
    throw e;
  }

}

function checkIsWhiteSpaces(lineProcessed){
  let tokens = [];
  let newLineProcessed = lineProcessed;

  categories.whiteSpacesChars.forEach(key => {
    
    while(matches = newLineProcessed.match(key.regex)){
      tokens.push({
        valor: key.value,
        tipo: key.lable,
        indexInicio: newLineProcessed.indexOf(key.value),
        size: key.value.length
      })

      newLineProcessed = replaceLine(key.value, newLineProcessed);

    }
  })

  return {tokens,newLineProcessed};

}

function checkIsKeyword(lineProcessed){

  let tokens = [];
  let newLineProcessed = lineProcessed;

  categories.keywords.forEach(key => {

    while(matches = newLineProcessed.match(key.regex)){
      tokens.push({
        valor: matches[0],
        tipo: key.lable,
        indexInicio: newLineProcessed.indexOf(matches[0]),
        size: matches[0].length
      })
  
      newLineProcessed = replaceLine(matches[0], newLineProcessed)
    }
    
  })

  return {tokens, newLineProcessed};
}

function checkComments(lineProcessed){
  let tokens = [];
  let newLineProcessed = lineProcessed;

  categories.comments.forEach(key => {
    

    while(matches = newLineProcessed.match(key.regex)){

      let arr = lineProcessed.split(key.value);
      let firstPart = arr[0];
      arr.shift();
      let secondPart = key.value + arr.join('');
      
      tokens.push({
        valor: secondPart,
        tipo: key.lable,
        indexInicio: newLineProcessed.indexOf(matches[0]),
        size: secondPart.length
      })
  
      newLineProcessed = firstPart + secondPart.replace(/./g, 'ç');
    }

    
  })

  return {tokens, newLineProcessed};
}

function checkOpenCloseSymbols(lineProcessed){
  const props = [
    "openPrioritySymbol",
    "closePrioritySymbol",
    "openCurlyBreaketsSymbol",
    "closeCurlyBreaketsSymbol",
    "openSquareBreaketsSymbol",
    "closeSquareBreaketsSymbol",
  ]

  let tokens = [];
  let newLineProcessed = lineProcessed;

  props.forEach(prop => {
    
    while(matches = newLineProcessed.match(categories[prop].regex)){
      tokens.push({
        valor: matches[0],
        tipo: categories[prop].lable,
        indexInicio: newLineProcessed.indexOf(matches[0]),
        size: matches[0].length
      })
  
      newLineProcessed = replaceLine(matches[0], newLineProcessed);
    }

  });
  

  return {tokens, newLineProcessed};

}

function check(lineProcessed, type){
  let tokens = [];
  let newLineProcessed = lineProcessed;

  while(matches = newLineProcessed.match(type.regex)){
    tokens.push({
      valor: matches[0],
      tipo: type.lable,
      indexInicio: newLineProcessed.indexOf(matches[0]),
      size: matches[0].length
    })

    newLineProcessed = replaceLine(matches[0], newLineProcessed);
  }

  return {tokens, newLineProcessed};
}

function replaceLine(value, line){
  let count = value.length;
  let newLine = line;
  let symbol = '';

  for(let i = 0; i < count; i++){
    symbol += 'ç';
  }

  newLine = line.replace(value, symbol);

  return newLine;
  
}

module.exports = {
  lexicalAnalysis
}
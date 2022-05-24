const grammar = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHJKLMNOPQRSTUVXWYZ[\]^_abcdefghijklmnopqrstuvxwyz{|}~ \n\r\n\t`;
const intValueType = {lable: 'keyword', value:"int", regex: /\b(int)\b/g}
const floatValueType = {lable: 'keyword', value:"float", regex:/\b(float)\b/g}
const doubleValueType = {lable: 'keyword', value:"double", regex:/\b(double)\b/g}
const stringValueType = {lable: 'keyword', value:"string", regex:/\b(string)\b/g}
const booleanValueType = {lable: 'keyword', value:"bool", regex:/\b(bool)\b/g}
const intLiteralValue = {lable: 'literalValue' ,value:'0', regex:/\b[+-]?\d+\b/g}
const floatLiteralValue = {lable: 'literalValue' ,value:'0.0', regex:/[+-]?\d+(\.\d+)/g}
const doubleLiteralValue = {lable: 'literalValue' ,value:'0.0', regex:/[+-]?\d+(\.\d+)/g}
const stringLiteralValue = {lable: 'literalValue' ,value:"0", regex:/(["'])(?:(?=(\\?))\2.)*?\1/g}
const booleanLiteralValue = {lable: 'literalValue' , value: 'true', regex: /\b(true)\b|\b(false)\b/g }
const mathOperation = {lable: 'mathOperation', value:'+', regex: /[+*\/-]/g}
const attributionSymbol = {lable: 'attributionSymbol', value:"=", regex: /[=]/g}
const openPrioritySymbol = {lable: 'openPrioritySymbol', value:"(", regex: /[(]/g}
const closePrioritySymbol = {lable: 'closePrioritySymbol', value:")", regex: /[)]/g}
const openCurlyBreaketsSymbol = {lable: 'openCurlyBreaketsSymbol', value: '{', regex: /[{]/g}
const closeCurlyBreaketsSymbol = {lable: 'closeCurlyBreaketsSymbol', value: '}', regex: /[}]/g}
const openSquareBreaketsSymbol = {lable: 'openSquareBreaketsSymbol', value: '[', regex: /[\[]/g}
const closeSquareBreaketsSymbol = {lable: 'closeSquareBreaketsSymbol', value: ']', regex: /[\]]/g}
const semiColonSymbol = {lable: 'semiColonSymbol', value: ';', regex: /[;]/g}
const commaSymbol = {lable: 'commaSymbol', value:',', regex: /[,]/g}
const identifierSymbol = {lable: 'identifierSymbol', value:'a', regex:/[a-zA-z#$_][\w\d]*/g}
const libSymbols = {lable: 'libSymbols', value: '<>', regex: /<.+>/i }
const comments = [{lable:'comments' ,value:'//', regex: /\/\//g}]
const commentsLabel = 'comments';
const whiteSpacesChars = [{lable: 'whiteSpace',value:"\t", regex:/\t/g} , {lable: 'whiteSpace',value:" ", regex:/ /}]
const literalValueLable = 'literalValue';
const keywordLable = 'keyword';
const whiteSpaceLable = 'whiteSpace';
const lineBreakerChars = ["\n" , "\r\n"]
const whiteSpaceSusbstitute = 'ç';
const scapeChars = "\\"
const keywords = [
  intValueType ,
	floatValueType ,
	doubleValueType ,
	stringValueType ,
  booleanValueType
]


module.exports = {
  grammar,
  intValueType,
  floatValueType,
  doubleValueType,
  stringValueType,
  booleanValueType,
  intLiteralValue,
  floatLiteralValue,
  doubleLiteralValue,
  stringLiteralValue,
  booleanLiteralValue,
  mathOperation,
  attributionSymbol,
  openPrioritySymbol,
  closePrioritySymbol,
  openCurlyBreaketsSymbol,
  closeCurlyBreaketsSymbol,
  openSquareBreaketsSymbol,
  closeSquareBreaketsSymbol,
  semiColonSymbol,
  commaSymbol,
  identifierSymbol,
  libSymbols,
  comments,
  whiteSpacesChars,
  lineBreakerChars,
  whiteSpaceSusbstitute,
  scapeChars,
  keywords,

  literalValueLable,
  keywordLable,
  whiteSpaceLable,
  commentsLabel,
}
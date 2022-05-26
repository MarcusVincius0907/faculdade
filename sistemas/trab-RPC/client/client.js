const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


async function main(){
  console.log('Iniciando o programa.');
  const status = await askQuestions();
  console.log('Finalizando o programa com:', status);
}

async function askQuestions(){

  return new Promise((res, rej) => {
    try{

      const operations = ['+', '-', '*', '/'];
  
      let operation = null;
      let value1 = null;
      let value2 = null;
  
      const question1 = `Digite a operação
        "+" => soma
        "-" => subtração
        "*" => multiplicação
        "/" => divisão
      `;
  
      const question2 = `Digite o primeiro valor:`;
  
      const question3 = `Digite o segundo valor:`;
  
      rl.question(question1, (input1) => {
  
        console.log(`Operação: "${input1}" `);
  
        let inputIsValid = false;
  
        operations.forEach(op => {
          if(op == input1) inputIsValid = true;
        })
  
        if(!inputIsValid) {
          throw `O valor digitado não é uma operação ${input1}`
        }
  
        operation = input1;
  
        rl.question(question2, (input2) => {
  
          if(isNaN(input2)){
            throw  `O valor digitado não é um número ${input2}`
          }
      
          value1 = input2;
  
          rl.question(question3, (input3) => {
        
            if(isNaN(input3)){
              throw `O valor digitado não é um número ${input3}`
            }
        
            value2 = input3;
        
            rl.close();
            res('sucesso');
          });
      
      
        });
  
  
      });
  
      
      
  
    }catch(e){
      console.log(`Houve uma falha no programa: `, e);
      res('erro')
    }
  })

  

}

main();
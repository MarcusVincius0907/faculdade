const readline = require('readline')
const {calculate} = require('./rpc');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


async function main(){
  console.log('Iniciando o programa.');
  askQuestions()
  .then(res => {
    console.log(res);
    console.log('Finalizando o programa com sucesso');
    rl.close();
  })
  .catch(err => {
    console.log('Finalizando o programa com erro: ', err);
    rl.close();
  })
  
}

async function askQuestions(){

  return new Promise((res, rej) => {
    try{

      const operations = ['+', '-', '*', '/'];
  
      let operation = null;
      let firstNumber = null;
      let secondNumber = null;
  
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
          rej(`O valor digitado não é uma operação ${input1}`);
          return;
        }
  
        operation = input1;
  
        rl.question(question2, (input2) => {
  
          if(isNaN(input2)){
            rej(`O valor digitado não é um número ${input2}`);
            return;
          }
      
          firstNumber = input2;
  
          rl.question(question3, async (input3) => {
        
            if(isNaN(input3)){
              rej(`O valor digitado não é um número ${input3}`);
              return;
            }
        
            secondNumber = input3;
            
            //calling RPC function
            const resp = await calculate({operation, firstNumber: `${firstNumber}`, secondNumber: `${secondNumber}`});
        
            rl.close();
            res('Resultado: ' + resp);
          });
      
      
        });
  
  
      });
  
      
      
  
    }catch(e){
      rej(`Falha no processo ${e}`)
    }
  })

  

}


main();
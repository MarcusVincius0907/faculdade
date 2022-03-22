document.body.addEventListener("submit", function(event){
  event.preventDefault()
});


/* IMC logic */
const inputAltura = document.querySelector('#inputAltura')
const inputPeso = document.querySelector('#inputPeso')

function calcularIMC(){
  let altura = inputAltura.value ?? 0;
  let peso = inputPeso.value ?? 0;
  if(validateInput(peso, altura)){
    let result = Number((peso / (altura*altura)).toFixed(2))
    statusIMC(result);
  }else{
    Swal.fire(`Atenção!`, `Insira valores válidos.`, 'error')
  }
}

function statusIMC(value){
  let message = ''
  

  if(value < 18.5){
    message = 'Magreza'
  }else if(value >= 18.5 && value <= 24.99){
    message = 'Normal'
  }else if(value >= 25 && value <= 29.99){
    message = 'Sobrepeso'
  }else if(value >= 30 && value <= 39.99){
    message = 'Obesidade'
  }else if(value >= 40){
    message = 'Obesidade Grave'
  }else{
    message = 'Não identificado'
  }

  Swal.fire(`Seu IMC é de ${value}`, `Classificação: ${message} `, 'success')

  
}

function validateInput(peso, altura){
  if((altura && altura > 0) &&  (peso && peso > 0)) return true;
  return false;
}

/* IMC logic */

/* CPF validation */

const inputCPF = document.querySelector('#inputCPF');

function validarCPF(){
  let cpf = inputCPF.value;
  if(cpf && cpf > 0){
    cpf = cpf.toString()
    if(cpf.length == 11)
      return true 
  }

  return false

}

function enviar(){
  if(validarCPF()){
    Swal.fire(`Sucesso!`, `Informações enviadas com sucesso. `, 'success')
  }else{
    alert('Atenção CPF inválido')
    inputCPF.classList.add('border-cRed')
    inputCPF.focus();
    inputCPF.select();
  }
}


/* CPF validation */
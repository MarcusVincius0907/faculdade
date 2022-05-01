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


/* API */
const API_URL = 'https://app.professordaniloalves.com.br/api/v1';

const form = document.querySelector('#form');

async function submitData(){
  const data = {
    nomeCompleto: form[0].value,
    email: form[1].value,
    dataNascimento: form[2].value,
    sexo: form[3].value,
    cpf: form[4].value,
    cep: form[5].value,
    numeroLogradouro: form[6].value,
    logradouro: form[7].value,
    cidade: form[8].value,
    uf: form[9].value,
  }
  console.log(data);
  try{
    
    const resp = await fetch(`${API_URL}/cadastro`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN':' '
      },
    })
    .then(res => {
      if(res.ok){
        return res.json()
      }
      return Promise.reject(res)
    })
  
    const content =  resp
  
    console.log('content',content );
  }catch(e){
    const errorResp = await e.json()
    console.log('error ', errorResp);
    Swal.fire(`Erro!`, `${errorResp.message} `, 'error')
  }

  
  
  
}


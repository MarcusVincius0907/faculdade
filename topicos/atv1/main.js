document.body.addEventListener("submit", function(event){
  event.preventDefault()
});

function init(){
  renderUFList()
}

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

const formFields1 = [
  'nomeCompleto',
  'email',
  'dataNascimento',
  'sexo',
  'cpf',
  'cep',
  'numeroLogradouro',
  'logradouro',
  'cidade',
  'uf',
]

async function submitData(){

  if(!form[11].checked){
    Swal.fire(`Atenção!`, `Você deve aceitar os termos para proceguir `, 'warning')
    return;
  }

  //possui id
  if(form[10].value && isEditting){
    editarCadastro();
    return;
  }

  resetErrorsInput(formFields1);

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

    Swal.fire(`Sucesso!`, `${resp.message} `, 'success')
    form.reset()
  
  }catch(e){

    const errorResp = await e.json()

    console.log('error ', errorResp);

    if(errorResp && errorResp.errors) setErrorsInput(errorResp.errors);

    Swal.fire(`Erro!`, `${errorResp.message} `, 'error')

  }

}

function setErrorsInput(errors){

  for (var [key, value] of Object.entries(errors)) {

    let msgs = ''
    value.forEach(msg => {
      msgs += msg
    });

    const spanError = document.querySelector(`.${key} > .errorMsg`);
    spanError.classList.remove('hidden');
    spanError.innerHTML = msgs;

    const inputBorder = document.querySelector(`.${key} > div > input`)? document.querySelector(`.${key} > div > input`) : document.querySelector(`.${key} > select`)
    inputBorder.classList.remove('border-cGreen')
    inputBorder.classList.add('border-red-500')

  }

  /* if(errors.nomeCompleto){

    let msgs = ''
    errors.nomeCompleto.forEach(msg => {
      msgs += msg
    });

    const spanError = document.querySelector('.nomeCompleto > span');
    spanError.classList.remove('hidden');
    spanError.innerHTML = msgs;

    const inputBorder = document.querySelector('.nomeCompleto > input');
    inputBorder.classList.remove('border-cGreen')
    inputBorder.classList.add('border-red-500')

  }
  if(errors.email);
  if(errors.dataNascimento);
  if(errors.sexo);
  if(errors.cpf);
  if(errors.cep);
  if(errors.numeroLogradouro);
  if(errors.logradouro);
  if(errors.cidade);
  if(errors.uf); */
}

function resetErrorsInput(formFields){
 formFields.forEach(el => {
  const spanError = document.querySelector(`.${el} > .errorMsg`);
  spanError.classList.add('hidden');

  const inputBorder = document.querySelector(`.${el} > div > input`)? document.querySelector(`.${el} > div > input`) : document.querySelector(`.${el} > select`)
  inputBorder.classList.add('border-cGreen')
  inputBorder.classList.remove('border-red-500')
 })
}

/* CEP */

async function getAddress(){
  const cep = form[5].value;

  if(!cep) return;

  try{
    
    const resp = await fetch(`${API_URL}/endereco/${cep}`, {
      method: 'GET',
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

    Swal.fire(`Sucesso!`, `CEP encontrado! `, 'success')
    form[7].value = resp.logradouro
    form[8].value = resp.localidade
    form[9].value = resp.uf

  
  }catch(e){

    const errorResp = await e.json()

    console.log('error ', errorResp);

    Swal.fire(`Erro!`, `${errorResp.message} `, 'error')

  }

}

async function renderUFList(){
  try{
    
    const resp = await fetch(`${API_URL}/endereco/estados`, {
      method: 'GET',
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

    let elements = `<option value="" selected>Selecione uma opção</option>`;
    resp.forEach(el => {
      elements += `<option value="${el.uf}">${el.nome}</option>` 
    }) 
    
    form[9].innerHTML = elements;

  }catch(e){

    const errorResp = await e.json()

    Swal.fire(`Erro!`, `${errorResp.message} `, 'error')

  }
}

/* IMC API */
const imcForm = document.querySelector('#imcForm');
const formFields2 = [
  'altura',
  'peso',
  
]

async function sendIMCData(){
  resetErrorsInput(formFields2)
  try{

    const data = {
      altura: imcForm[0].value,
      peso: imcForm[1].value
    }
    
    const resp = await fetch(`${API_URL}/imc/calcular`, {
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

    Swal.fire(`Sucesso!`, `${resp.message} `, 'success')
    

  }catch(e){

    const errorResp = await e.json()

    console.log('error ', errorResp);

    if(errorResp && errorResp.errors) setErrorsInput(errorResp.errors);

    Swal.fire(`Erro!`, `${errorResp.message} `, 'error')

  }
}

/* CPF validation */

let isEditting = false;

async function checkCPF(){
  const cpf = form[4].value;
  if(!cpf || isEditting) return;

  try{
    
    const resp = await fetch(`${API_URL}/cadastro/${cpf}`, {
      method: 'GET',
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

    modalCPFCadastrado(resp);
  
  }catch(e){

    const errorResp = await e.json()

    if(errorResp.message === "Documento não cadastrado") return;

    console.log('error ', errorResp);

    Swal.fire(`Erro!`, `${errorResp.message} `, 'error')

  }

}

const modalCPFCadastrado = (userData) => {
  Swal.fire({
    title: 'Esse CPF já foi cadastrado!',
    html:'<p>Nesse caso, você pode excluir ou editar seus dados.</p>',
    showDenyButton: true,
    confirmButtonText: 'Editar',
    denyButtonText: 'Excluir',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      // editar dados
      modoEditar(userData);
    } else if (result.isDenied) {
      // Excluir dados
      excluirCadastro(userData.cpf);
    } else if (result.isDismissed){
      modalCPFCadastrado(userData);
    }
  })
}

const excluirCadastro = async (cpf) => {
  if(!cpf) return;

  try{
    
    const resp = await fetch(`${API_URL}/cadastro/${cpf}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN':' '
      },
    })
    .then(res => {
      if(res.ok){
        return;
      }
      return Promise.reject(res)
    })

    Swal.fire(`Sucesso!`, `Dados deletados com sucesso! `, 'success')
    form.reset();
  
  }catch(e){

    console.log(e);

    const errorResp = await e.json()

    console.log('error ', errorResp);

    Swal.fire(`Erro!`, `${errorResp.message} `, 'error')

  }
}


const editarCadastro = async() => {

  try{

    resetErrorsInput(formFields1);

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
      id: form[10].value,
    }

    const resp = await fetch(`${API_URL}/cadastro`, {
      method: 'PUT',
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

    isEditting = false;
    form.reset();
    Swal.fire(`Sucesso!`, `Dados editados com sucesso! `, 'success')
  
  }catch(e){

    const errorResp = await e.json()

    console.log('error ', errorResp);

    if(errorResp && errorResp.errors) setErrorsInput(errorResp.errors);

    Swal.fire(`Erro!`, `${errorResp.message} `, 'error')

  }
}

const modoEditar = (data) => {
 
  form[0].value = data.nomeCompleto,
  form[1].value = data.email,
  form[2].value = data.dataNascimento,
  form[3].value = data.sexo,
  form[4].value = data.cpf,
  form[5].value = data.cep,
  form[6].value = data.numeroLogradouro,
  form[7].value = data.logradouro,
  form[8].value = data.cidade,
  form[9].value = data.uf,
  form[10].value = data.id

  isEditting = true;
  
}

/* init */
init()
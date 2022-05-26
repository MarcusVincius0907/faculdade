const express = require('express');
const cors = require("cors");
const app = express()
const path = require('path');
const PORT = process.env.PORT || 3001;

app.use('/static', express.static(__dirname + '/client/static'))

app.listen(PORT, () => {
  console.log(`o servidor está de pé em: http://localhost:${PORT}`)
})

//parar poder receber arquivos json
app.use(express.json());

//habilitando cors
app.use(cors());

app.post('/calculate', (req, res) => {

  console.log('cliente: ',req.body);

  try{
    const { value1, value2, operation } = req.body;
    let result = 0;
  
    if(operation === '+'){
      result = value1 + value2;
    }else if(operation === '-'){
      result = value1 - value2;
    }else if(operation === '*'){
      result = value1 * value2;
    }else if(operation === '/'){
      result = value1 / value2;
    }else{
      return res.json({status: 'error', result: 'operation not recognized'}) 
    }
  
    return res.json({status: 'ok', result})
  }catch(e){
    return res.json({status: 'error', result: 'unexpected error'})  
  }

  

})



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/' + 'index.html'))
})

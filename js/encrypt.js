const inputText = document.getElementById('input-text');
const btnEncrypt = document.getElementById('btn-encrypt');
const btnDecrypt = document.getElementById('btn-decrypt');
const Resultado = document.getElementById('output-text');
const btnCopy = document.getElementById('btn-copy');
const letras ='^[a-z !ñ]+$';

document.addEventListener('DOMContentLoaded', () => {
  btnEncrypt.addEventListener('click', encrypt);
  btnDecrypt.addEventListener('click', decrypt);
  btnCopy.addEventListener('click', copyText);
});

function encrypt(e){
  e.preventDefault();
  let text = inputText.value;
  if (text.match(letras)!=null){
  //Reemplazamos cada letra por la siguiente letra en el alfabeto
    Resultado.value = text.replace(/[a-z]/gi, 
      function(letra) {
      if (letra === "z") return "a";
      if (letra === "Z") return "A";
      return String.fromCharCode(letra.charCodeAt(0) + 1);
    }); 
  } else {
    mostrarError('Solo se permiten letras minusculas, sin acentos'); 
    return;
  }  
}

function decrypt(e) {
  e.preventDefault();
  let text = Resultado.value;
  if (text.match(letras)!=null){
    Resultado.value = text.replace(/[a-z]/gi, function(letra) {
      if (letra === "a") return "z";
      if (letra === "A") return "Z";
      return String.fromCharCode(letra.charCodeAt(0) - 1);
    });
  } else {
    mostrarError('Solo se permiten letras minusculas, sin acentos');
    return;
  }  
}

function mostrarError(message) {
  const error = document.querySelector('.error');
  
  if(!error) {
      const container = document.getElementById('form');
      const divMessage = document.createElement('div');
      divMessage.classList.add('error');
  
      divMessage.textContent = message;            
      container.appendChild(divMessage);
      
      setTimeout(()=> {
          divMessage.remove();
      }, 3000);
  }
}

function copyText(e) {
    e.preventDefault(); 
    const message = Resultado.value;
    navigator.clipboard.writeText(message);
}
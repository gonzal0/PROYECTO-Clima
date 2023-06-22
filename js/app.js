const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () =>{
   formulario.addEventListener('submit', buscarClima);
})
function buscarClima(e){
    e.preventDefault();

    //validando informacion
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
    
    mostrarError('Ambos campos son obligatorios');

      return;
    }
     
    //consultando la Api
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje){
     const alerta = document.querySelector('.bg-red-100');
     
     if(!alerta){
         
       //crear alerta
       const alerta = document.createElement('div');
       alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-3', 'py-4', 'rounded',
       'max-w-nd', 'mx-auto', 'mt-6','text-center');

       alerta.innerHTML = `<strong class="font-bold"> Error! </strong>
       <span class="block">${mensaje}</span>
       `;

        container.appendChild(alerta);


        //se elimine la alerte despues de 5 segundos
        setTimeout(() => {
            alerta.remove();
        }, 5000);
     }

}//fin mostrar error


function consultarAPI(ciudad, pais){

   const appId = 'f540b51585fb559fa57970d16442936d';
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}, ${pais}&appid=${appId}
    `;
    Spinner();//spinner 
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHtml();//limpiar el html
            if (datos.cod === "404") {
                mostrarError('ciudad no encontrada');
                return;
            }

            //imprime respuesta en el html
            mostrarClima(datos)
        });

}
  function mostrarClima(datos) {
      const {name, main: { temp, temp_max, temp_min} } = datos;
      const centigrados = kelvinCentigrados(temp);
      const max = kelvinCentigrados(temp_max);
      const min = kelvinCentigrados(temp_min);

      const nombreCiudad = document.createElement('p');
      nombreCiudad.textContent = `Clima en ${name}`;
      nombreCiudad.classList.add('font-bold', 'text-2xl');

      const actual = document.createElement('p');
      actual.innerHTML = `${centigrados} &#8451`;
      actual.classList.add('font-bold','text-6xl');

      const tempMaxima = document.createElement('p');
      tempMaxima.innerHTML = `Max: ${max} &#8451`;
      tempMaxima.classList.add('text-lx');

      const tempMinima = document.createElement('p');
      tempMinima.innerHTML = `Min: ${min} &#8451`;
      tempMinima.classList.add('text-xl');

      const resultadoDiv = document.createElement('div');
      resultadoDiv.classList.add('text-center', 'text-white');
      resultadoDiv.appendChild(nombreCiudad);
      resultadoDiv.appendChild(actual);
      resultadoDiv.appendChild(tempMaxima);
      resultadoDiv.appendChild(tempMinima);
      
      resultado.appendChild(resultadoDiv);
    }
    const kelvinCentigrados = grados => parseInt(grados - 273.15);



    function limpiarHtml() {
        while(resultado.firstChild) {
            resultado.removeChild(resultado.firstChild);
        }
    }

    function Spinner(){
      
      limpiarHtml();
      const divSpinner = document.createElement('div');
      divSpinner.classList.add('sk-fading-circle');
      divSpinner.innerHTML = `
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
      `;
      resultado.appendChild(divSpinner);
    }

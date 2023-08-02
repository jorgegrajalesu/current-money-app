// declarar variables para capturar el dato 
let rate1 = document.querySelector('.rate1');
let rate2 = document.querySelector('.rate2');
let resultBtn = document.querySelector('.result');
let selects = document.querySelectorAll('.options select');
let sel1 = selects[0];
let sel2 = selects[1];
let inputs = document.querySelectorAll('.input input');
let inpt1 = inputs[0];
let inpt2 = inputs[1];

let rates ={};
let requestUrl = "https://api.exchangerate.host/latest?base=USD";

// función async
/**
 * await dice que hay que esperar que tome la respuesta de la api requestUrl
 */

// llamar la función fetchRates
fetchRates();

async function fetchRates(){
    let res = await fetch(requestUrl);
    res = await res.json();
    rates = res.rates;
    // utilizar la funcion populateOptions
    populateOptions();
}

// función tradicional
/**
 * funcion para las opciones 
 */
function populateOptions() {
    let val = '';
    Object.keys(rates).forEach(code =>{
        let str =`<option value="${code}">${code}</option>`;
        // incrementar el option
        // val = val + str;
        val += str;
    })
    // mostrar las opciones
    selects.forEach((s)=> (s.innerHTML = val));
    
}
// crear la función para hacer la conversión 
/**
 * 
 * @param {Number} val valor de conversion
 * @param {Number} fromCurr moneda inicial 
 * @param {Number} toCurr   moneda convertir
 */
function convert(val,fromCurr,toCurr) {
    // declarar variables de ambito local
    let v = (val/rates[fromCurr]) * rates[toCurr];
    let v1 = v.toFixed(3);
    // validar con if ternario
    return v1 == 0.0 ? v1.toFixed(5) : v1;

}

// funcion para los select
function displayRate() {
    // declarar variables de ambito local
    let v1 = sel1.value;
    let v2 = sel2.value;

    let val = convert(1,v1, v2);
    // imprimir en elemento html
    rate1.innerHTML = `1 ${v1} equals `;
    rate2.innerHTML = `${val} ${v2}`;
    
}

// listener y el evento click, con una función de flecha

resultBtn.addEventListener("click", ()=>{
    let fromCurr = sel1.value;
    let fromVal = parseFloat(inpt1.value);
    let toCurr = sel2.value;

    // validar si no hay un valor
    if (isNaN(fromVal)) {
        alert("Ingresa un número, por favor");
        
    }else{
        let cVal = convert(fromVal,fromCurr,toCurr);
        inpt2.value = cVal;
    }

});

selects.forEach(s => s.addEventListener("change",displayRate));

document.querySelector('.swap').addEventListener("click",()=>{
    let in1 = inpt1.value;
    let in2 = inpt2.value;
    let op1 = sel1.value;
    let op2 = sel2.value;

    inpt2.value = in1;
    inpt1.value = in2;

    sel2.value = op1;
    sel1.value = op2;

    // llamar la función 
    displayRate();
});



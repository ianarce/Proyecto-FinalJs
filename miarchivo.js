//DECLARACION DE UNA CLASE
class Moneda{
    constructor(Denominacion){
        this.Denominacion=Denominacion
       
    }
}

//AGREGAR LAS OPCIONES A LOS INPUST ITERANDO EL JSON
function agregarBanderas(){
    URLJSON = "monedas.json"
    $.getJSON(URLJSON,function(datos,estado){
        if (estado === "success"){
            let datosMonedas = datos
            for(const datos of datosMonedas){
                $("#input1").append(`<option value="${datos.cc}">${datos.cc}</option>`)
                $("#input2").append(`<option value="${datos.cc}">${datos.cc}</option>`)
            }
        }
    }
)
}

//OCULTAMOS EL RESULTADO
$("#resultado").hide()

//CAMBIAR LA BANDERA AL HACER CHANGE

const URLBANDERAS ="img/currency-flags-master/src/flags/"
function cambiarBandera(){
   let opcion1 = $("#input1").val()
   let opcion2 = $("#input2").val()
   
    $("#img1").attr({"src":URLBANDERAS+opcion1.toLowerCase()+".png","alt":opcion1})
    $("#img2").attr({"src":URLBANDERAS+opcion2.toLowerCase()+".png","alt":opcion1})
    $("")
   
}

//DEFINIMOS LA URL DEL API 
const URL =" https://api.exchangerate-api.com/v4/latest/"

//VALIDAR LOS VALORES A CONVERTIR 
function Convertir(){
   let opcion1 = $("#input1").val()
   let opcion2 = $("#input2").val()
   let valor = $("#valorIn").val()
   $("#resultado").hide()

   const URLMONEDA = URL + opcion1
//HACER UNA LLAMADA AJAX PARA USAR EL API DE DIVISAS
   $.getJSON(URLMONEDA,(data,estado) =>{
       if (estado === "success"){
           const taza = data.rates[opcion2]
           
           let valorFinal = taza*valor
           $("#resultado").fadeIn(900)
           $("#resultado").html(`El cambio es ${valorFinal.toFixed(3)} ${opcion2}`)

       }
   }
   )
}


//AGREGAR FUNCION PARA GUARDAR MONEDA AL LOCAL STORAGE  
function guardarFavorito() {
    let monedaFavoritaInput = document.getElementById("input2")
    let monedaFavoritaSelec = monedaFavoritaInput.options[monedaFavoritaInput.selectedIndex].text;
    let monedaFavorita = new Moneda (monedaFavoritaSelec)
    console.log(monedaFavorita)
    localStorage.setItem("moneda",JSON.stringify(monedaFavorita))
}

//AGREGAR FUNCION PARA CARGAR LA MONEDA DEL LOCAL STORAGE
function cargarFavorito(){
    let monedaFavorita = JSON.parse(localStorage.getItem("moneda"))
    valorOptenido = monedaFavorita.Denominacion
    $("#input2").val(valorOptenido)  
    $("#img2").attr({"src":URLBANDERAS+valorOptenido.toLowerCase()+".png","alt":valorOptenido})
}


//AGREGAR EVENTOS AL BOTON
$(document).ready(function(){
    agregarBanderas()
    $("#enviar").click(Convertir);
    $("#añadir").click(guardarFavorito);
    $("#cargar").click(cargarFavorito);
    $("#input1 , #input2").change(cambiarBandera)
})


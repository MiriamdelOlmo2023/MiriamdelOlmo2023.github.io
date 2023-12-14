//////Declaración de clases//////
class Piloto {
  constructor(nombre, dorsal, escuderia, ritmo, experiencia, totalVueltas, puntos) {
    this.nombre = nombre;
    this.dorsal = dorsal;
    this.escuderia = escuderia;
    this.ritmo = ritmo;
    this.experiencia = experiencia;
    this.distRecorrida = 0;
    this.vueltaRapida = 0;
    this.carreraFinalizada = false;
    this.totalVueltas = 0;
    this.puntos = null;
  }
}

class Monoplaza {
  constructor(escuderia, colorCorporativo, marcaMotorista, potencia, degradacion, manejo, id) {
    this.escuderia = escuderia;
    this.colorCorporativo = colorCorporativo;
    this.marcaMotorista = marcaMotorista;
    this.potencia = potencia;
    this.degradacion = degradacion;
    this.manejo = manejo;
    this.id = id;
  }
}

class Circuito {
  constructor(nombre, distTotal){
    this.nombre = nombre;
    this.distTotal = distTotal;
  }
}

//////Declaración de variables//////
var circuito = new Circuito("Isla Tortuga", 100);
var comprobarCarreraTerminada = false;

const lstPilotos = [
  new Piloto("Max Verstappen", 1, "Red Bull", 96, 92),
  new Piloto("Checo Pérez", 11, "Red Bull", 90, 93),
  new Piloto("Charles Leclerc", 16, "Ferrari", 93, 91),
  new Piloto("Carlos Sainz Jr", 55, "Ferrari", 92, 89),
  new Piloto("George Russell", 63, "Mercedes", 91, 88),
  new Piloto("Lewis Hamilton", 44, "Mercedes", 90, 97),
  new Piloto("Fernando Alonso", 14, "Aston Martin", 94, 98),
  new Piloto("Lance Stroll", 18, "Aston Martin", 86, 80),
  new Piloto("Esteban Ocon", 31, "Alpine", 83, 85),
  new Piloto("Pierre Gasly", 10, "Alpine", 82, 84),
  new Piloto("Lando Norris", 4, "McLaren", 88, 89),
  new Piloto("Oscar Piastri", 81, "McLaren", 76, 75),
  new Piloto("Valteri Bottas", 77, "Alfa Romeo", 82, 89),
  new Piloto("Guanyu Zhou", 24, "Alfa Romeo", 79, 79),
  new Piloto("Kevin Magnussen", 20, "Haas", 81, 84),
  new Piloto("Niko Hulkenberg", 27, "Haas", 83, 85),
  new Piloto("Yuki Tsunoda", 22, "AlphaTauri", 78, 79),
  new Piloto("Nick de Vries", 21, "AlphaTauri", 70, 71),
  new Piloto("Alex Albon", 23, "Williams", 81, 87),
  new Piloto("Logan Sargeant", 2, "Williams", 65, 66)
];

const lstMonoplazas = [
  new Monoplaza("Red Bull", "Azul oscuro", "Honda", 94, 67, 90, 1),
  new Monoplaza("Red Bull", "Azul oscuro", "Honda", 94, 67, 90, 1),
  new Monoplaza("Ferrari", "Rojo", "Ferrari", 89, 74, 87, 1),
  new Monoplaza("Ferrari", "Rojo", "Ferrari", 89, 74, 87, 1),
  new Monoplaza("Mercedes", "Gris", "Mercedes", 88, 70, 82, 1),
  new Monoplaza("Mercedes", "Gris", "Mercedes", 88, 70, 82, 1),
  new Monoplaza("Aston Martin", "Verde", "Mercedes", 85, 72, 85, 1),
  new Monoplaza("Aston Martin", "Verde", "Mercedes", 85, 72, 85, 1),
  new Monoplaza("Alpine", "Azul claro", "Renault", 80, 81, 83, 1),
  new Monoplaza("Alpine", "Azul claro", "Renault", 80, 81, 83, 1),
  new Monoplaza("McLaren", "Naranja", "Mercedes", 81, 83, 75, 1),
  new Monoplaza("McLaren", "Naranja", "Mercedes", 81, 83, 75, 1),
  new Monoplaza("Alfa Romeo", "Granate", "Ferrari", 72, 83, 81, 1),
  new Monoplaza("Alfa Romeo", "Granate", "Ferrari", 72, 83, 81, 1),
  new Monoplaza("Haas", "Blanco", "Ferrari", 72, 83, 81, 1),
  new Monoplaza("Haas", "Blanco", "Ferrari", 72, 83, 81, 1),
  new Monoplaza("AlphaTauri", "Negro", "Honda", 73, 71, 74, 1),
  new Monoplaza("AlphaTauri", "Negro", "Honda", 73, 71, 74, 1),
  new Monoplaza("Williams", "Azul", "Mercedes", 65, 80, 71, 1),
  new Monoplaza("Williams", "Azul", "Mercedes", 65, 80, 71, 1),
];

//////Declaración de funciones//////
function mostrarTabla(){
  var table = document.getElementById("pilotos-list");
  var tableBody = table.getElementsByTagName("tbody")[0];

  for(var i=0; i<lstPilotos.length; i++){
    
    var row = tableBody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);
    var cell10 = row.insertCell(9);
    var cell11 = row.insertCell(10);

    cell1.innerHTML = lstPilotos[i].nombre;
    cell2.innerHTML = lstPilotos[i].dorsal;
    cell3.innerHTML = lstPilotos[i].escuderia;
    cell4.innerHTML = lstMonoplazas[i].escuderia;
    cell5.innerHTML = lstMonoplazas[i].potencia;
    cell6.innerHTML = lstMonoplazas[i].marcaMotorista;
    cell7.innerHTML = lstMonoplazas[i].potencia;
    cell8.innerHTML = lstPilotos[i].carreraFinalizada ? "Finalizada" : "No finalizada";;

    var progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    progressBar.style.width = (lstPilotos[i].distRecorrida<0 ? "0" : lstPilotos[i].distRecorrida)+ "%";
    cell9.appendChild(progressBar);

    cell10.innerHTML = lstPilotos[i].vueltaRapida;
    cell11.innerHTML = lstPilotos[i].totalVueltas;

    if(comprobarCarreraTerminada && document.getElementById("btn2div").hidden == true){//MOSTRAR COLUMNA DE PUNTOS
      var cell12 = row.insertCell(11);
      cell12.innerHTML = lstPilotos[i].puntos;
    }
  }

  if(comprobarCarreraTerminada && document.getElementById("btn2div").hidden == true){//cambiar color celda cabecera
    var thead = table.getElementsByTagName("thead")[0];
    var ultimaCelda = thead.rows[thead.rows.length - 1].insertCell(-1);
    ultimaCelda.style.backgroundColor = "#323539";
    ultimaCelda.style.border = "none";
  }
}

function vaciarTabla(nombreTabla) {
  var table = document.getElementById(nombreTabla);
  var tableBody = table.getElementsByTagName("tbody")[0];

  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
}


function turnos(){
  //MODIFICAR TEXTO DEL BOTON
  if(document.getElementById("btn1div").hidden == false){
    document.getElementById("btn2div").hidden = false;
    document.getElementById("btn1div").hidden = true;
  } else if(document.getElementById("btn2div").hidden == false && comprobarCarreraTerminada){
    document.getElementById("btn3div").hidden = false;
    document.getElementById("btn2div").hidden = true;
  }
  

  if(!comprobarCarreraTerminada){
    comprobarCarreraTerminada = true;
    for(var i = 0; i<lstPilotos.length; i++){
      generarVuelta(i);//GENERAMOS VUELTA POR CADA PILOTO
      if(!lstPilotos[i].carreraFinalizada){//COMPROBAMOS SI LA CARRERA HA TERMINADO
        comprobarCarreraTerminada = false;
      }
    }
    vaciarTabla("pilotos-list");
    mostrarTabla();

    if(comprobarCarreraTerminada){
      document.getElementById("btn3div").hidden = false;
      document.getElementById("btn2div").hidden = true;
    }
  }else {//SI LA CARRERA HA TERMINADO
    document.getElementById("btn3div").hidden = true;//esconder boton al mostrar clasificacion



    //ORDENAMOS LOS PILOTOS
    //según mayor distancia recorrida y menor número de vueltas totales
    lstPilotos.sort((a, b) => {
      if (b.distRecorrida !== a.distRecorrida) {
        return b.distRecorrida - a.distRecorrida;
      } else {
        if (a.totalVueltas !== b.totalVueltas) {
          return a.totalVueltas - b.totalVueltas;
        } else {
          return b.vueltaRapida - a.vueltaRapida;
        }
      }
    });

    //reparto de puntos
    var ganadorVuelta = 0;
    var vueltaRapida = 0;

    for (var i = 0; i < lstPilotos.length; i++) {

      if (lstPilotos[i].vueltaRapida > vueltaRapida) {
        
        vueltaRapida = lstPilotos[i].vueltaRapida;
        ganadorVuelta = i;
      }
    }
    
    document.getElementById("vueltarapida").innerHTML = lstPilotos[ganadorVuelta].nombre + ", " + lstPilotos[ganadorVuelta].vueltaRapida;

    for(var i = 0; i<10; i++){//RECORREMOS LOS 10 PRIMEROS
      lstPilotos[i].puntos = 0;
      
      if(lstPilotos[i].nombre == lstPilotos[ganadorVuelta].nombre){//en caso de ser el ganador de la vuelta rápida le sumamos un punto
        lstPilotos[i].puntos = 1;
      }
      
      switch(i){//SUMAMOS PUNTOS DEPENDIENDO DE LA POSICION
        case 0:
          lstPilotos[i].puntos = "Puntos: " + (lstPilotos[i].puntos += 25);
            break;
        case 1:
          lstPilotos[i].puntos = "Puntos: " + (lstPilotos[i].puntos += 18);
            break;
        case 2:
          lstPilotos[i].puntos = "Puntos: " + (lstPilotos[i].puntos += 15);
            break;
        case 3:
          lstPilotos[i].puntos = "Puntos: " + (lstPilotos[i].puntos += 12);
            break;
        case 4:
          lstPilotos[i].puntos = "Puntos: " + (lstPilotos[i].puntos += 10);
            break;
        case 5:
          lstPilotos[i].puntos = "Puntos: " + (lstPilotos[i].puntos += 8);
            break;
        case 6:
          lstPilotos[i].puntos = "Puntos: " + (lstPilotos[i].puntos += 6);
            break;
        case 7:
          lstPilotos[i].puntos = "Puntos: " + (lstPilotos[i].puntos += 4);
            break;
        case 8:
          lstPilotos[i].puntos = "Puntos: " + (lstPilotos[i].puntos += 2);
            break;
        case 9:
          lstPilotos[i].puntos = "Puntos: " + (lstPilotos[i].puntos += 1);
            break;
      }
      //mostrar top 10
      var table = document.getElementById("pilotos-ganadores");
      var tableBody = table.getElementsByTagName("tbody")[0];
      var row = tableBody.insertRow();
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);

      cell0.innerHTML = lstPilotos[i].nombre;
      cell1.innerHTML = lstPilotos[i].dorsal;
      cell2.innerHTML = lstPilotos[i].escuderia;
    }

    tablaEscuderias()//mostrar tabla escuderias
    document.getElementById("podium").hidden = false;
    vaciarTabla("pilotos-list");
    mostrarTabla();
  }
}

function generarVuelta(i){
  if(!lstPilotos[i].carreraFinalizada){
    var numAle = Math.floor(Math.random() * 101);
    
    if(numAle>=10 && numAle<=20){ //entre 10 y 20, se restará 1 punto a la distancia
      lstPilotos[i].distRecorrida -=1;
    } else if(numAle>=1 && numAle<=5){  //entre 1 y 5, carrera finalizada
      lstPilotos[i].carreraFinalizada = true;
    } else {

      var distTurno = parseInt(5*((2*lstPilotos[i].ritmo+3*lstPilotos[i].experiencia+4*lstMonoplazas[i].potencia+2*lstMonoplazas[i].manejo)/(5*lstMonoplazas[i].degradacion+2*numAle)));
      lstPilotos[i].distRecorrida = parseInt(lstPilotos[i].distRecorrida) + distTurno;
      lstPilotos[i].totalVueltas++;
      
      if(distTurno > lstPilotos[i].vueltaRapida){
        lstPilotos[i].vueltaRapida = distTurno;
      }

      if(lstPilotos[i].distRecorrida>=100){
        lstPilotos[i].distRecorrida = 100;
        lstPilotos[i].carreraFinalizada = true;
      }
      
    }
  }
  // Actualiza la barra de progreso
  var progressBar = document.querySelectorAll(".progress-bar")[i]; // Encuentra la barra de progreso correspondiente
  var porcentajeRecorrido = (lstPilotos[i].distRecorrida / 100) * 100; // Calcula el porcentaje de recorrido
  progressBar.style.width = porcentajeRecorrido + "%"; // Actualiza el ancho de la barra de progreso

}

function tablaEscuderias(){

  var escuderias = ["Red Bull", "Ferrari", "Mercedes", "Aston Martin", "Alpine", "McLaren", "Alfa Romeo", "Haas", "AlphaTauri", "Williams"];
  var table = document.getElementById("escuderia-ganadores");
  var tableBody = table.getElementsByTagName("tbody")[0];

  for(var j = 0; j<escuderias.length; j++){
    var row = tableBody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = escuderias[j];
    cell2.innerHTML = 0;
    for(var i = 0; i<lstPilotos.length; i++){
      if(lstPilotos[i].escuderia == escuderias[j] && lstPilotos[i].puntos != null){
        var partes = lstPilotos[i].puntos.split(":");
        var numero = parseInt(partes[1].trim());
        cell2.innerHTML = parseInt(cell2.innerHTML) + numero;
      }
    }
  }
}


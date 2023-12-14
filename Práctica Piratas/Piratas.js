class Navio {
    constructor(nombre, capitan) {
        this.nombre = nombre;
        this.capitan = capitan;
        this.duracion = 100;
    }
}

class Barco extends Navio {
    constructor(nombre, capitan, duracion) {
        super(nombre, capitan, duracion);
        this.cantidad = Math.floor(Math.random() * 4) + 2; // Aleatorio entre 2 y 5
        this.tripulacion = null;
        this.tipo = "Barco";
    }
}

class Bombardero extends Navio {
    constructor(nombre, capitan, duracion) {
        super(nombre, capitan, duracion);
        this.potencia = Math.floor(Math.random() * 31) + 30; // Aleatorio entre 30 y 60
        this.tipo = "Bombardero";
    }
}

class Pirata {
    constructor(nombre) {
        this.nombre = nombre;
        this.municion;
    }
}

class Pistolero extends Pirata {
    constructor(nombre) {
        super(nombre);
        this.disparo = Math.floor(Math.random() * 5) + 6; //Aleatorio entre 6 y 10
        this.ataque = Math.floor(Math.random() * 10) + 1; //Aleatorio entre 1 y 10
        this.tipo = "Pistolero";
    }
}

class Artillero extends Pirata {
    constructor(nombre) {
        super(nombre);
        this.disparo = Math.floor(Math.random() * 4) + 3; // Aleatorio entre 3 y 6
        this.ataque = Math.floor(Math.random() * 11) + 10; // Aleatorio entre 10 y 20
        this.tipo = "Artillero";
    }
}

class Cañonero extends Pirata {
    constructor(nombre) {
        super(nombre);
        this.disparo = Math.floor(Math.random() * 3) + 1; // Aleatorio entre 1 y 3
        this.ataque = Math.floor(Math.random() * 21) + 20; // Aleatorio entre 20 y 40
        this.tipo = "Cañonero";
    }
}

const listaPiratas = [
    new Artillero("Golderos"),
    new Artillero("Jose María"),
    new Artillero("Sergio"),

    new Cañonero("Palacios"),
    new Cañonero("Antonio"),
    new Cañonero("Carlos"),

    new Pistolero("Alberto"),
    new Pistolero("Javier"),
    new Pistolero("Pablo")
];

var listaPiratasSeleccionados;
var barcoCreado;
var navio1, navio2;

function ocultarDivs(){
    
    document.getElementById("visualizarPiratas").hidden = true;
    document.getElementById("añadirPirata").hidden = true;
    document.getElementById("eliminarPirata").hidden = true;
    document.getElementById("simularBatalla").hidden = true;
}

function visualizarPiratas() {
    ocultarDivs();
    document.getElementById("visualizarPiratas").hidden = false;
    document.getElementById("visError").innerHTML="";

    //CREAR TABLA
    var table = document.getElementById("visualizarPiratasTabla");
    var tableBody = table.getElementsByTagName("tbody")[0];
    
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    if(listaPiratas.length>0){
        for (var i = 0; i < listaPiratas.length; i++) {//RECORREMOS LA LISTA Y MOSTRAMOS LOS PIRATAS
            var row = tableBody.insertRow();

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            cell1.innerHTML = listaPiratas[i].nombre;
            cell2.innerHTML = listaPiratas[i].tipo;
        }
    } else {
        document.getElementById("visError").innerHTML="No hay registros";
        var tableh = table.getElementsByTagName("thead")[0];
    
        while (tableh.firstChild) {
            tableh.removeChild(tableh.firstChild);
        }
    }
}

function añadirPiratasMostrar(){
    ocultarDivs();
     //MOSTRAR DIV AÑADIR PIRATAS
     document.getElementById("añadirPirata").hidden = false;
}

function añadirPirata(){
    
    if(document.getElementById("nombreNuevoPirata").value != null){
        switch(document.getElementById("añadirPirataSelect").value){
            case "Artillero":
                listaPiratas.push(new Artillero(document.getElementById("nombreNuevoPirata").value));
                break;
            case "Pistolero":
                listaPiratas.push(new Pistolero(document.getElementById("nombreNuevoPirata").value));
                break;
            case "Cañonero":
                listaPiratas.push(new Cañonero(document.getElementById("nombreNuevoPirata").value));
                break;
            default:
                break;
        }

        document.getElementById("nombreNuevoPirata").value = "";//Vaciamos el placeholder
    }
}

function eliminarPirata() {
    ocultarDivs();
    document.getElementById("eliminarPirata").hidden = false;
    document.getElementById("elimError").innerHTML="";

    var table = document.getElementById("eliminarPiratasTabla");
    var tableBody = table.getElementsByTagName("tbody")[0];

    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    if(listaPiratas.length>0){

        for (var i = 0; i < listaPiratas.length; i++) {
            var row = tableBody.insertRow();

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            cell1.innerHTML = listaPiratas[i].nombre;
            cell2.innerHTML = listaPiratas[i].tipo;
            //Añade el botón eliminar en una celda de cada fila
            var button = document.createElement("button");
            button.textContent = "Eliminar";
            
            (function (i) {
                button.addEventListener("click", function () {//En caso de seleccionar el botón
                    listaPiratas.splice(i, 1);//borramos el pirata en la posición i
                    eliminarPirata();//Volvemos a crear la tabla
                });
            })(i);

            cell3.appendChild(button);
        }
    } else {
        document.getElementById("elimError").innerHTML="No hay registros";
        var tableh = table.getElementsByTagName("thead")[0];
    
        while (tableh.firstChild) {
            tableh.removeChild(tableh.firstChild);
        }
    }
}

function simularBatalla() {
    //Ocultar y vaciar
    ocultarDivs();
    document.getElementById("simularBatalla").hidden = false;
    document.getElementById("primerP").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("mostrarVS").hidden = true;
    barcoCreado=false;
    borrarTablasBarcos("tabla1");
    borrarTablasBarcos("tabla2");


    if(listaPiratas.length>=2){
        listaPiratasSeleccionados = Array.from(listaPiratas);//Copia el array original para poder ir borrando los piratas ya elegidos
        navio1 = crearBarco("1");

        if(barcoCreado){
            navio2 = crearBarco("2");

            if(barcoCreado){
                barcosCreados();//Mostramos todo de nuevo
            }
        }        
    } else {
        piratasInsuficientes();//Mostrar alerta
    }
}

function piratasInsuficientes(){
    document.getElementById("primerP").innerHTML = "No hay piratas suficientes para llevar a cabo la simulación, añade más piratas o vuelve a intentarlo."
    document.getElementById("mostrarVS").hidden = true;
    document.getElementById("batalla").hidden = true;
    barcoCreado = false;
    borrarTablasBarcos("tabla1");
    borrarTablasBarcos("tabla2");
}

function barcosCreados(){
    document.getElementById("mostrarVS").hidden = false;
    document.getElementById("batalla").hidden = false;
    document.getElementById("primerP").innerHTML = "";
    document.getElementById("vs").innerHTML="VS";
}

function borrarTablasBarcos(tabla){
    var table = document.getElementById(tabla);
    var tableBody = table.getElementsByTagName("tbody")[0];
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
    var tableHead = table.getElementsByTagName("thead")[0];
        while (tableHead.firstChild) {
            tableHead.removeChild(tableHead.firstChild);
        }

    document.getElementById("vs").innerHTML="";
}

function crearBarco(num) {
    //Crear tabla
    var table = document.getElementById("tabla" + num);

    var tableHead = table.getElementsByTagName("thead")[0];
    var row = tableHead.insertRow();
    var cellh1 = row.insertCell(0);
    var cellh2 = row.insertCell(1);
    cellh1.innerHTML = "Tipo";
    cellh2.innerHTML = "Capitan";

    var lanzarMoneda = Math.random() < 0.5;//Elegir que tipo de navío crear
    var navio;

    switch (lanzarMoneda) {
        case true://CREA BOMBARDERO
            if (listaPiratasSeleccionados.length >= 1) {
                var aleCapitan = Math.floor(Math.random() * listaPiratasSeleccionados.length);
                var capitan = listaPiratasSeleccionados[aleCapitan];
                listaPiratasSeleccionados.splice(aleCapitan, 1);
                navio = new Bombardero("Bombardero " + num, capitan);

                //mostrar bombardero
                var cellh3 = row.insertCell(2);
                cellh3.innerHTML = "Potencia";

                var tableBody = table.getElementsByTagName("tbody")[0];
                var row = tableBody.insertRow();
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);

                cell1.innerHTML = navio.tipo;
                cell2.innerHTML = navio.capitan.nombre;
                cell3.innerHTML = navio.potencia;
                barcoCreado = true;
            } else {
                barcoCreado = false;
                piratasInsuficientes();
            }
            break;

        case false://CREA BARCO
            var aleCapitan = Math.floor(Math.random() * listaPiratasSeleccionados.length);
            var capitan = listaPiratasSeleccionados[aleCapitan];
            listaPiratasSeleccionados.splice(aleCapitan, 1);
            navio = new Barco("Barco " + num, capitan);

            if (navio.cantidad <= listaPiratasSeleccionados.length) {
                var listaPiratasdelNavio = [];
                //Asignamos piratas
                for (var i = 0; i < navio.cantidad; i++) {
                    var alePirata = Math.floor(Math.random() * listaPiratasSeleccionados.length);
                    var pirataSeleccionado = listaPiratasSeleccionados[alePirata];
                    listaPiratasdelNavio.push(pirataSeleccionado);
                    listaPiratasSeleccionados.splice(alePirata, 1);
                }
                navio.tripulacion = listaPiratasdelNavio;

                //Asignar munición
                for (var i = 0; i < listaPiratasdelNavio.length; i++) {
                    listaPiratasdelNavio[i].municion = listaPiratasdelNavio[i].disparo;
                }

                //mostrar barco
                var cellh3 = row.insertCell(2);
                cellh3.innerHTML = "Piratas";

                var tableBody = table.getElementsByTagName("tbody")[0];
                var row = tableBody.insertRow();
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);

                cell1.innerHTML = navio.tipo;
                cell2.innerHTML = navio.capitan.nombre;
                cell3.innerHTML = navio.cantidad;
                barcoCreado = true;
            } else {
                barcoCreado = false;
                piratasInsuficientes();
            }
            break;
    }
    return navio;
}

function empezar(){
    if(barcoCreado){
        var contador = Math.floor(Math.random() * 2) + 1;
        while(navio1.duracion > 0 && navio2.duracion > 0){
            var daño, navio;
            contador++;//usa un contador para ir asignando turnos

            if(contador%2 == 0){
                navio = navio1;
            } else{
                navio = navio2;
            }

            switch(navio.tipo){
                case "Bombardero":
                    daño = navio.potencia;
                    break;

                case "Barco":
                    daño = 0;
                    for (var i = 0; i < navio.tripulacion.length; i++) {
                        if(navio.tripulacion[i].municion>0){
                            daño += navio.tripulacion[i].ataque;
                        }
                    }
                    break;
            }

            if(contador%2 == 0){
                navio2.duracion = navio2.duracion - daño;
            } else {
                navio1.duracion = navio1.duracion - daño;
            }
        }
        
        if(navio1.duracion>navio2.duracion){
            document.getElementById("resultado").innerHTML = "Ha ganado el primer barco con " + navio1.duracion + "hp restantes.";
        } else {
            document.getElementById("resultado").innerHTML = "Ha ganado el segundo barco con " + navio2.duracion + "hp restantes.";
        }
        document.getElementById("batalla").hidden = true;
    }
}

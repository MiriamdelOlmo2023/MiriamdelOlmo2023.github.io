class Circuito {
    constructor(nombre, img) {
        this.nombre = nombre;
        this.img = img;
    }
}

class Yoshi {
    constructor(nombre, img, aceleracion, velocidad, experiencia, cuota = 0, distRecorrida = 0) {
        this.nombre = nombre;
        this.img = img;
        this.aceleracion = aceleracion;
        this.velocidad = velocidad;
        this.experiencia = experiencia;
        this.cuota = cuota;
        this.distRecorrida = distRecorrida;
    }
}

class Carrera {
    constructor(fecha, hora, circuito, yoshis, id, terminada = false, clasificados = [], ganado = 0) {
        this.fecha = fecha;
        this.hora = hora;
        this.circuito = circuito;
        this.yoshis = yoshis;
        this.id = id;
        this.terminada = terminada;
        this.clasificados = clasificados;
        this.ganado = ganado;
    }
}

class Apuesta {
    constructor(nombre, cant, id) {
        this.nombre = nombre;
        this.cant = cant;
        this.id = id;
    }
}

const circuitoslst = [];
const yoshislst = [];
const carreraslst = [];
const apuestaslst = [];

var idCarrera = 0;
var numCarreraSeleccionada = 0;
var saldo;

const generarAceleracion = () => Math.random();
const generarVelocidad = () => Math.floor(Math.random() * (30 - 10 + 1)) + 10;
const generarExperiencia = () => Math.floor(Math.random() * 5) + 1;
const generarCuotaMercado = (yoshi) => (yoshi.aceleracion * 3) + (yoshi.velocidad * 2) + (yoshi.experiencia * 0.6);


const model = {
    crearCircuitos: function() {
        circuitoslst.push(new Circuito("Boo Lake", "circuitos/boolake.png"));
        circuitoslst.push(new Circuito("Castillo de Bowser", "circuitos/bowsercastle.png"));
        circuitoslst.push(new Circuito("Broken Pier", "circuitos/brokenpier.png"));
        circuitoslst.push(new Circuito("Isla Cheep Cheep", "circuitos/cheepcheepisland.png"));
        circuitoslst.push(new Circuito("Cheeseland", "circuitos/cheeseland.png"));
        circuitoslst.push(new Circuito("Donut Plains", "circuitos/donutplains.png"));
        circuitoslst.push(new Circuito("Lake Side Park", "circuitos/lakesidepark.png"));
        circuitoslst.push(new Circuito("Circuito Luigi", "circuitos/luigicircuit.png"));
        circuitoslst.push(new Circuito("Circuito Mario", "circuitos/mariocircuit.png"));
        circuitoslst.push(new Circuito("Circuito Peach", "circuitos/peachcircuit.png"));
        circuitoslst.push(new Circuito("Senda Arcoiris", "circuitos/rainbowroad.png"));
        circuitoslst.push(new Circuito("Ribbon Road", "circuitos/ribbonroad.png"));
        circuitoslst.push(new Circuito("Playa Shy Guy", "circuitos/shyguybeach.png"));
        circuitoslst.push(new Circuito("Desierto Yoshi", "circuitos/yoshidesert.png"));
    },

    crearYoshis: function() {
        const elementos = [
            "birdoAmarillo", "birdoAzulClaro", "birdoAzulOscuro", "birdoRojo", "birdoRosa", "birdoVerde",
            "huesitos", "koopaAzulAlado", "koopaNaranjaAlado", "koopaRojo", "koopaRojoAlado", "koopaVerde",
            "yoshiAmarillo", "yoshiAzulClaro", "yoshiAzulOscuro", "yoshiDorado", "yoshiGrisVerde", "yoshiHuevo",
            "yoshiMarron", "yoshiMorado", "yoshiNaranja", "yoshiNegro", "yoshiReno", "yoshiRojo", "yoshiRosa",
            "yoshiRosaOscuro", "yoshiVerde"
        ];
    
        elementos.forEach((elemento) => {
            const palabras = elemento.split(/(?=[A-Z])/);
            const nombre = palabras.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            const img = `source/yoshis/${elemento}.png`;
            const aceleracion = generarAceleracion();
            const velocidad = generarVelocidad();
            const experiencia = generarExperiencia();
    
            const nuevoYoshi = new Yoshi(nombre, img, aceleracion, velocidad, experiencia);
            nuevoYoshi.cuota = (generarCuotaMercado(nuevoYoshi)).toFixed(2);

            yoshislst.push(nuevoYoshi);
        });
    },

    crearCarrera: function() {
        var fechaActual = new Date();
        var fecha = new Date();
        var hora = {
            horas: Math.floor(Math.random() * 24),
            minutos: Math.floor(Math.random() * 60),
        };

        if (hora.horas < fechaActual.getHours() || (hora.horas === fechaActual.getHours() && hora.minutos < fechaActual.getMinutes())) {
            fecha.setDate(fecha.getDate() + 1);
        }

        var circuitoAleatorio = circuitoslst[Math.floor(Math.random() * circuitoslst.length)];

        var yoshisDisponibles = [...yoshislst];
        var yoshisAleatorios = [];

        for (var i = 0; i < 8; i++) {
            var indiceAleatorio = Math.floor(Math.random() * yoshisDisponibles.length);
            var yoshiAleatorio = yoshisDisponibles.splice(indiceAleatorio, 1)[0];
            yoshisAleatorios.push(yoshiAleatorio);
        }
        idCarrera++;
        var nuevaCarrera = new Carrera(fecha, hora, circuitoAleatorio, yoshisAleatorios, idCarrera);
        carreraslst.push(nuevaCarrera);
    },

    crearApuesta: function() {
        var select = document.getElementById("listaYoshis");
        var cant = document.getElementById("cantApostado");
        var cantidadApostada = parseInt(cant.innerHTML);
    
        if (select.value === "") {
            alert("Por favor, selecciona un yoshi antes de confirmar la apuesta.");
            return false;
        } else if (isNaN(cantidadApostada) || cantidadApostada <= 0) {
            alert("Por favor, ingresa una cantidad válida para apostar.");
            return false;
        } else {
            var nombreYoshi = select.options[select.selectedIndex].text;
            var idCarrera = carreraslst[numCarreraSeleccionada].id;
            var apuesta = new Apuesta(nombreYoshi, cantidadApostada, idCarrera);

            model.guardarOActualizarApuesta(apuesta);
    
            return true;
        }
    },
    
    guardarOActualizarApuesta: function(apuesta) {
        var index = apuestaslst.findIndex(function(ap) {
            return ap.id === apuesta.id;
        });
    
        if (index !== -1) {
            apuestaslst[index].nombre = apuesta.nombre;
            apuestaslst[index].cant = apuesta.cant;
        } else {
            apuestaslst.push(apuesta);
        }
    
        return true;
    },
    
    

    actualizarSaldo: function(nuevoSaldo) {
        saldo = nuevoSaldo;
        view.actualizarSaldo(saldo);
    },

    eliminarApuesta: function(id) {
        apuestaslst = apuestaslst.filter(function(apuesta) {
            return apuesta.id !== id;
        });
    }

};

const view = {
    actualizarReloj: function() {
        var miFecha = new Date();
        var texto = document.getElementById("reloj");
        var mins = miFecha.getMinutes()<10? "0"+miFecha.getMinutes() : miFecha.getMinutes();
        texto.innerHTML ="Hora actual: " + miFecha.getHours() + ":" + mins;
    },
    mostrarCarreras: function() {
        // Ordenar carreras por fecha y hora
        carreraslst.sort(function(a, b) {
            // Compara las fechas primero
            if (a.fecha < b.fecha) return -1;
            if (a.fecha > b.fecha) return 1;
    
            // Si las fechas son iguales, compara las horas
            if (a.hora.horas < b.hora.horas) return -1;
            if (a.hora.horas > b.hora.horas) return 1;
    
            // Si las horas son iguales, compara los minutos
            if (a.hora.minutos < b.hora.minutos) return -1;
            if (a.hora.minutos > b.hora.minutos) return 1;
    
            // Si las fechas, horas y minutos son iguales, no hay cambios en el orden
            return 0;
        });
    
        for (var i = 0; i < 5; i++) {
            var botonCarrera = document.getElementById("btncarrera" + (i + 1));
            if (botonCarrera) {
                var carrera = carreraslst[i];
    
                var dia = carrera.fecha.getDate();
                var mes = carrera.fecha.getMonth() + 1;
                var fechaFormateada = (dia < 10 ? "0" : "") + dia + "/" + (mes < 10 ? "0" : "") + mes;
    
                var hora = carrera.hora.horas < 10 ? "0" + carrera.hora.horas : carrera.hora.horas;
                var minutos = carrera.hora.minutos < 10 ? "0" + carrera.hora.minutos : carrera.hora.minutos;
    
                botonCarrera.innerHTML = carrera.circuito.nombre + " - " + hora + ":" + minutos + " (" + fechaFormateada + ")";
            }
        }
    },

    llenarTablaYoshis: function(carrera) {
        var tabla = document.getElementById("tablaCarreras");
        var tbody = tabla.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';

        carrera.yoshis.forEach(function(yoshi, index) {
            var newRow = tbody.insertRow(tbody.rows.length);

            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);
            var cell5 = newRow.insertCell(4);
            var cell6 = newRow.insertCell(5);

            cell1.innerHTML = `<img src="${yoshi.img}" width="50" height="50">`;
            cell2.innerHTML = yoshi.nombre;
            cell3.innerHTML = yoshi.aceleracion.toFixed(2);
            cell4.innerHTML = yoshi.velocidad;
            cell5.innerHTML = yoshi.experiencia;
            cell6.innerHTML = yoshi.cuota;
        });
    },

    modificarSeleccionado: function(num) {
        numCarreraSeleccionada = num;
        var carrera = carreraslst[num];
        document.getElementById("nombreCircuito").innerHTML = carrera.circuito.nombre;
        var imgCircuito = document.getElementById("imgCircuito");

        imgCircuito.src = "source/"+carrera.circuito.img;
    
        for (var i = 1; i <= 5; i++) {
            var btn = document.getElementById("btncarrera" + i);
            btn.classList.remove("seleccionado");
        }
        num++;
        var btnSeleccionado = document.getElementById("btncarrera" + num);
        btnSeleccionado.classList.add("seleccionado");
        document.getElementById("cantApostado").innerHTML = 0;
        document.getElementById("divApuesta").hidden = true;
        document.getElementById("btnApuesta").innerHTML = "REALIZAR APUESTA";
    },

    mostrarApuesta: function(yoshiSeleccionado) {
        document.getElementById("divApuesta").hidden = false;
        const selectElement = document.getElementById('listaYoshis');
        const cantApostadoElement = document.getElementById('cantApostado');

        selectElement.innerHTML = "";

        var carrera = carreraslst[numCarreraSeleccionada];
        carrera.yoshis.forEach(function (yoshi, index) {
            const option = document.createElement('option');
            option.value = index;
            option.text = yoshi.nombre;
            selectElement.add(option);
        });

        if (yoshiSeleccionado) {
            var apuestaExistente = apuestaslst.find(apuesta => apuesta.id === carrera.id);
            var yoshiEnCarrera = carrera.yoshis.find(y => y.nombre === apuestaExistente.nombre);

            selectElement.value = carrera.yoshis.indexOf(yoshiEnCarrera);
            cantApostadoElement.innerHTML = apuestaExistente.cant || 0;
        } else {
            cantApostadoElement.innerHTML = 0;
        }
    },


    apuesta50: function() {

        document.getElementById("cantApostado").innerHTML = 50 + parseInt(document.getElementById("cantApostado").innerHTML);
    },

    apuesta10: function() {

        document.getElementById("cantApostado").innerHTML = parseInt(document.getElementById("cantApostado").innerHTML) - 10;
    },

    apuestaResto: function(resto) {

        document.getElementById("cantApostado").innerHTML = resto + parseInt(document.getElementById("cantApostado").innerHTML);
    },

    confirmar: function() {
        document.getElementById("cantApostado").innerHTML = 0;
        document.getElementById("divApuesta").hidden = true;
        view.modificarBotonApuesta();
    },

    cancelar: function() {

        document.getElementById("cantApostado").innerHTML = 0;
        document.getElementById("divApuesta").hidden = true;
    },

    actualizarSaldo: function(saldo) {
        document.getElementById("saldo").innerHTML = "SALDO: " + saldo;
    },

    openModalIngresar: function() {
        document.getElementById('modalIngresar').style.display = 'block';
        document.getElementById('modal-overlayIngresar').style.display = 'block';
    },

    closeModalIngresar: function() {
        document.getElementById('modalIngresar').style.display = 'none';
        document.getElementById('modal-overlayIngresar').style.display = 'none';
    },

    openModalRetirar: function() {
        document.getElementById('modalRetirar').style.display = 'block';
        document.getElementById('modal-overlayRetirar').style.display = 'block';
    },

    closeModalRetirar: function() {
        document.getElementById('modalRetirar').style.display = 'none';
        document.getElementById('modal-overlayRetirar').style.display = 'none';
    },

    openModalClasificacion: function() {
        document.getElementById('modalClasificacion').style.display = 'block';
        document.getElementById('modal-overlayClasificacion').style.display = 'block';
        var listaClasificados = document.getElementById("listaClasificados");
        listaClasificados.innerHTML = "";
        //mostrar clasificados
        for (var i = 0; i < 3; i++) {
            var nuevoElemento = document.createElement("li");
            nuevoElemento.appendChild(document.createTextNode(carreraslst[numCarreraSeleccionada].clasificados[i].nombre));
            listaClasificados.appendChild(nuevoElemento);
            document.getElementById("p"+(i+1)).src = carreraslst[numCarreraSeleccionada].clasificados[i].img;
        }
        document.getElementById("ganado").innerHTML = "Has ganado " + carreraslst[numCarreraSeleccionada].ganado;
    },

    closeModalClasificacion: function() {
        document.getElementById('modalClasificacion').style.display = 'none';
        document.getElementById('modal-overlayClasificacion').style.display = 'none';
        controller.eliminarCarrera();
        document.getElementById("empezar").innerHTML = "EMPEZAR CARRERA";
    },

    modificarBotonApuesta: function() {
        document.getElementById("btnApuesta").innerHTML = "EDITAR APUESTA";
    },

    inicializarApuesta: function(cant, yoshi) {
        document.getElementById("cantApostado").innerHTML = cant;

    },

    modificarBotonEmpezarCarrera: function(carreraTerminada) {
        if(carreraTerminada){
            document.getElementById("empezar").innerHTML = "VER CLASIFICACION";
        } else {
            document.getElementById("empezar").innerHTML = "EMPEZAR CARRERA";
        }
    },

    resaltarFilaTabla: function (selectedYoshiIndex) {
        const tabla = document.getElementById('tablaCarreras');
        const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    
        // Desmarcar filas previamente resaltadas
        for (let i = 0; i < filas.length; i++) {
            filas[i].classList.remove('resaltado');
        }
    
        // Resaltar la fila correspondiente al yoshi seleccionado
        if (selectedYoshiIndex !== "") {
            filas[selectedYoshiIndex].classList.add('resaltado');
        }
    }
};

const controller = {
    init: function() {
        setInterval(view.actualizarReloj, 1000);
        model.crearCircuitos();
        model.crearYoshis();
        this.crearCarreras();
        model.actualizarSaldo(controller.cogerSaldo());
        
        //EVENT LISTENERS
        const ingresar = document.getElementById("comprar");
        ingresar.addEventListener("click", function() {
            view.openModalIngresar();
        });

        const aceptarIngresar = document.getElementById("aceptarIngresar");
        aceptarIngresar.addEventListener("click", function() {
            controller.acceptIngresar();
        });

        const retirar = document.getElementById("retirar");
        retirar.addEventListener("click", function() {
            view.openModalRetirar();
        });

        const aceptarRetirar = document.getElementById("aceptarRetirar");
        aceptarRetirar.addEventListener("click", function() {
            controller.acceptRetirar();
        });

        const btnCarrera1 = document.getElementById("btncarrera1");
        btnCarrera1.addEventListener("click", function() {
            view.llenarTablaYoshis(carreraslst[0]);
            view.modificarSeleccionado(0);
            if(controller.comprobarApuestaCarrera(0)){
                view.modificarBotonApuesta();
            }
            if(carreraslst[numCarreraSeleccionada].terminada == true) {
                view.modificarBotonEmpezarCarrera(true);
            } else {
                view.modificarBotonEmpezarCarrera(false);
            }
        });

        const btnCarrera2 = document.getElementById("btncarrera2");
        btnCarrera2.addEventListener("click", function() {
            view.llenarTablaYoshis(carreraslst[1]);
            view.modificarSeleccionado(1);
            if(controller.comprobarApuestaCarrera(1)){
                view.modificarBotonApuesta();
            }
            if(carreraslst[numCarreraSeleccionada].terminada == true) {
                view.modificarBotonEmpezarCarrera(true);
            } else {
                view.modificarBotonEmpezarCarrera(false);
            }
        });

        const btnCarrera3 = document.getElementById("btncarrera3");
        btnCarrera3.addEventListener("click", function() {
            view.llenarTablaYoshis(carreraslst[2]);
            view.modificarSeleccionado(2);
            if(controller.comprobarApuestaCarrera(2)){
                view.modificarBotonApuesta();
            }
            if(carreraslst[numCarreraSeleccionada].terminada == true) {
                view.modificarBotonEmpezarCarrera(true);
            } else {
                view.modificarBotonEmpezarCarrera(false);
            }
        });

        const btnCarrera4 = document.getElementById("btncarrera4");
        btnCarrera4.addEventListener("click", function() {
            view.llenarTablaYoshis(carreraslst[3]);
            view.modificarSeleccionado(3);
            if(controller.comprobarApuestaCarrera(3)){
                view.modificarBotonApuesta();
            }
            if(carreraslst[numCarreraSeleccionada].terminada == true) {
                view.modificarBotonEmpezarCarrera(true);
            } else {
                view.modificarBotonEmpezarCarrera(false);
            }
        });

        const btnCarrera5 = document.getElementById("btncarrera5");
        btnCarrera5.addEventListener("click", function() {
            view.llenarTablaYoshis(carreraslst[4]);
            view.modificarSeleccionado(4);
            if(controller.comprobarApuestaCarrera(4)){
                view.modificarBotonApuesta();
            }
            if(carreraslst[numCarreraSeleccionada].terminada == true) {
                view.modificarBotonEmpezarCarrera(true);
            } else {
                view.modificarBotonEmpezarCarrera(false);
            }
        });

        const btnApuesta = document.getElementById("btnApuesta");
        btnApuesta.addEventListener("click", function () {
            controller.realizarOEditarApuesta();
            const selectedYoshiIndex = document.getElementById("listaYoshis").value;
            view.resaltarFilaTabla(selectedYoshiIndex);
        });
        
        const apuesta50 = document.getElementById("50");
        apuesta50.addEventListener("click", () => {
            if (controller.cogerSaldo() >= 50) {
                view.apuesta50();
                model.actualizarSaldo(controller.cogerSaldo()-50);
            } else {
                window.alert("Saldo insuficiente")
            }
        });

        const apuesta10 = document.getElementById("10");
        apuesta10.addEventListener("click", function() {
            if (parseInt(document.getElementById("cantApostado").innerHTML) > 10) {
                view.apuesta10();
                model.actualizarSaldo(controller.cogerSaldo()+10);
            } else {
                window.alert("Apuesta insuficiente")
            }
        });

        const apuestaResto = document.getElementById("resto");
        apuestaResto.addEventListener("click", function() {
            view.apuestaResto(controller.cogerSaldo());
            model.actualizarSaldo(0);
        });

        const confirmar = document.getElementById("confirmar");
        confirmar.addEventListener("click", function() {
            var apuestaCorrecta = model.crearApuesta();
            if (apuestaCorrecta){
                view.confirmar();
            }
        });

        const empezar = document.getElementById("empezar");
        empezar.addEventListener("click", function() {
            if(carreraslst[numCarreraSeleccionada].terminada == false) {
                controller.generarCarrera();
            } else {
                view.openModalClasificacion();
            }
            
        });

        const selectElement = document.getElementById('listaYoshis');
        selectElement.addEventListener('change', function () {
            const selectedYoshiIndex = this.value;
            view.resaltarFilaTabla(selectedYoshiIndex);
        });

    },

    crearCarreras: function() {
        if (carreraslst.length < 5 || carreraslst.length === 0) {
            model.crearCarrera();
            this.crearCarreras();
        } else {
            view.mostrarCarreras();
            //mostramos la primera carrera por defecto
            view.llenarTablaYoshis(carreraslst[0]);
            view.modificarSeleccionado(0);
        }
    },

    cogerSaldo: function() {
        var saldoTexto = document.getElementById("saldo").innerHTML;
        var saldoNumero = parseInt(saldoTexto.split(":")[1].trim(), 10);
        return saldoNumero;
    },

    acceptRetirar: function() {
        var cant = document.getElementById("inputRetirarFichas").value;
        var saldo = controller.cogerSaldo();
        if(!isNaN(cant) &&  cant<=saldo && cant != ""){
            model.actualizarSaldo(saldo-cant);
            view.closeModalRetirar();
        } else {
            window.alert("Ingresa un número válido");
        }    
    },

    acceptIngresar: function() {
        var cant = document.getElementById("inputIngresarFichas").value;
        if(!isNaN(cant) && cant != ""){
            model.actualizarSaldo(controller.cogerSaldo()+parseInt(cant));
            view.closeModalIngresar();
        } else {
            window.alert("Ingresa un número válido");
        }    
    },

    comprobarApuestaCarrera: function(num) {
        var carreraId = carreraslst[num].id;
        var apuestaMismoID = apuestaslst.find(function(apuesta) {
            return apuesta.id === carreraId;
        });
        
        if (apuestaMismoID) {
            var yoshiSeleccionado = yoshislst.find(function(yoshi) {
                return yoshi.nombre === apuestaMismoID.nombre;
            });
    
            view.inicializarApuesta(apuestaMismoID.cant, yoshiSeleccionado);
            view.modificarBotonApuesta();
            
            return true;
        } else {
            return false;
        }
    },
    
    realizarOEditarApuesta: function() {
        var carreraId = carreraslst[numCarreraSeleccionada].id;
    
        var apuestaExistente = apuestaslst.find(function (apuesta) {
            return apuesta.id === carreraId;
        });
    
        if (apuestaExistente) {
            var yoshiSeleccionado = yoshislst.find(function (yoshi) {
                return yoshi.nombre === apuestaExistente.nombre;
            });
    
            view.mostrarApuesta(yoshiSeleccionado);
        } else {
            view.mostrarApuesta();
        }
    },

    generarCarrera: function() {
        var carrera = carreraslst[numCarreraSeleccionada];
        while (!carrera.terminada) {//turno
            for (var i = 0; i < carrera.yoshis.length; i++) {//avanza cada yoshi
                carrera.yoshis[i].distRecorrida = carrera.yoshis[i].distRecorrida + (Math.random() * carrera.yoshis[i].cuota + 1);
                if (carrera.yoshis[i].distRecorrida >= 1000) {//si alguno ha llegado a la meta
                    carrera.clasificados.push(carrera.yoshis[i]);//guardamos el yoshi que haya cruzado la meta
                    carrera.yoshis[i].distRecorrida = 0;
                }
            }
            if (Array.isArray(carrera.clasificados) && carrera.clasificados.length >= 3) {
                carrera.terminada = true;
            }
        }
    
        var apuestaCarrera = apuestaslst.find(function(apuesta) {
            return apuesta.id === carrera.id;
        });

        var nombresClasificados = [];

        if (carrera.clasificados.length >= 3) {
            nombresClasificados = carrera.clasificados.slice(0, 3).map(yoshi => yoshi.nombre);
        }

        if(apuestaCarrera){
            if (nombresClasificados.includes(apuestaCarrera.nombre)) {
                var premio = parseInt(apuestaCarrera.cant);
                if (nombresClasificados[0] === apuestaCarrera.nombre) {//primer premio
                    premio = premio * 3;
                    model.actualizarSaldo(controller.cogerSaldo() + (premio));
                } else if (nombresClasificados[1] === apuestaCarrera.nombre) {//segundo premio
                    premio = premio * 2;
                    model.actualizarSaldo(controller.cogerSaldo() + (premio));
                } else if (nombresClasificados[2] === apuestaCarrera.nombre) {//tercer premio
                    premio = premio * 1;
                    model.actualizarSaldo(controller.cogerSaldo() + (premio));
                }
                carreraslst[numCarreraSeleccionada].ganado = premio;
            }
        }
        view.modificarBotonEmpezarCarrera(true);
    },

    eliminarCarrera: function() {

        carreraslst.splice(numCarreraSeleccionada, 1);
        controller.crearCarreras();
    }
};

controller.init();

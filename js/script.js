const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonFuego = document.getElementById('boton-fuego');
const botonAgua = document.getElementById('boton-agua');
const botonTierra = document.getElementById('boton-tierra');
const botonReiniciar = document.getElementById('boton-reiniciar')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const inputHipodoge = document.getElementById('hipodoge');
const inputCapipepo = document.getElementById('capipepo');
const inputRatigueya = document.getElementById('ratigueya');
const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const sectionMensajes = document.getElementById('resultado');
const ataqueDelJugador = document.getElementById('ataqueDelJugador');
const ataqueDelEnemigo = document.getElementById('ataqueDelEnemigo');


let ataqueJugador 
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego(){
    
    sectionSeleccionarAtaque.style.display= 'none'
    sectionReiniciar.style.display= 'none'
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}


function seleccionarMascotaJugador(){
    
    sectionSeleccionarAtaque.style.display = 'flex'
    
    sectionSeleccionarMascota.style.display= 'none'
    



   if(inputHipodoge.checked){
    spanMascotaJugador.innerHTML ='Hipodoge';
    } else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML ='Capipepo';    
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML ='Ratigueya';
    }else {
        alert('Selecciona una mascota');
    }

    seleccionarMascotaEnemigo()
    

}
function seleccionarMascotaEnemigo(){
    let mascotaAleatorio = aleatorio(1,3);
    

    if(mascotaAleatorio==1){
        spanMascotaEnemigo.innerHTML = 'Hipodoge';

    }else if(mascotaAleatorio==2){
        spanMascotaEnemigo.innerHTML = 'Capipepo';
    }else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya';
    }
}

function ataqueFuego(){
    ataqueJugador = 'Fuego'
    ataqueAleatorioEnemigo()
}
function ataqueAgua(){
    ataqueJugador = 'Agua'
    ataqueAleatorioEnemigo()
}
function ataqueTierra(){
    ataqueJugador = 'Tierra'
    ataqueAleatorioEnemigo()
}
function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,3)

    if(ataqueAleatorio == 1){
        ataqueEnemigo = 'Fuego'
    }else if (ataqueAleatorio == 2){
        ataqueEnemigo = 'Agua'
    }else {
        ataqueEnemigo = 'Tierra'
    }
    combate()

}

function combate(){
    

    if(ataqueEnemigo==ataqueJugador){
        crearMensaje('Empate')

    }else if(ataqueJugador== 'FUEGO' && ataqueEnemigo== 'TIERRA'){
        crearMensaje('Ganaste')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else if(ataqueJugador== 'AGUA' && ataqueEnemigo== 'FUEGO'){
        crearMensaje('Ganaste')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else if(ataqueJugador== 'TIERRA' && ataqueEnemigo== 'AGUA'){
        crearMensaje('Ganaste')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else{
        crearMensaje('Perdiste')
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas();

}
function revisarVidas(){
    if(vidasEnemigo == 0){
        crearMensajeFinal('Felicitaciones! Ganaste')
    }else if (vidasJugador == 0){
        crearMensajeFinal('Lo siento, Perdiste')

    }
}

function crearMensaje(resultado){
    

    
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueDelJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueDelEnemigo;

    //let parrafo = document.createElement('p');
    //parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador +', las mascotas del enemigo atacó con ' + ataqueEnemigo +'- '+ resultado;
    
    nuevoAtaqueDelJugador.appendChild(nuevoAtaqueDelJugador);
    nuevoAtaqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}
function crearMensajeFinal(resultadoFinal){
   
    
   
    sectionMensajes.innerHTML = resultadoFinal;
    

    
    botonFuego.disabled = true
    
    botonAgua.disabled = true
    
    botonTierra.disabled = true
    
    sectionReiniciar.style.display= 'block'
}

function reiniciarJuego(){
    location.reload()
}


function aleatorio(min,max){
    return Math.floor(Math.random()*(max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego)


const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota');

const botonReiniciar = document.getElementById('boton-reiniciar')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const sectionMensajes = document.getElementById('resultado');
const ataqueDelJugador = document.getElementById('ataqueDelJugador');
const ataqueDelEnemigo = document.getElementById('ataqueDelEnemigo');
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

let mokepones = []

let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo 
let inputRatigueya
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua 
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let ataqueJugador = []
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
};

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 3);
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 3);
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 3);

hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
);
capipepo.ataques.push(
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    
);
ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
);

mokepones.push(hipodoge,capipepo,ratigueya)

/*mokepones.push(hipodoge,capipepo,ratigueya)*/

function iniciarJuego(){
    
    sectionSeleccionarAtaque.style.display= 'none'
    mokepones.forEach((mokepon)=>{
        opcionDeMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre}/>
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>`

        contenedorTarjetas.innerHTML += opcionDeMokepones;
        let inputHipodoge = document.getElementById('Hipodoge');
        let inputCapipepo = document.getElementById('Capipepo');
        let inputRatigueya = document.getElementById('Ratigueya');
    })
    sectionReiniciar.style.display= 'none'
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    
    botonReiniciar.addEventListener('click', reiniciarJuego)
}


function seleccionarMascotaJugador(){
    
    sectionSeleccionarAtaque.style.display = 'flex'
    
    sectionSeleccionarMascota.style.display= 'none'
    

   if(inputHipodoge.checked){
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador=inputHipodoge.id;
    } else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id; 
        mascotaJugador=inputCapipepo.id;   
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id;
        mascotaJugador=inputRatigueya.id;
    }else {
        alert('Selecciona una mascota');
    }
    extraerAtaques(mascotaJugador)

    seleccionarMascotaEnemigo()

}
function extraerAtaques(mascotaJugador){
    let ataques
    for (let i=0; i < mokepones.length; i++){
        if (mascotaJugador === mokepones[i].nombre) {
            ataques === mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
} 
function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML +=ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego');
    botonAgua = document.getElementById('boton-agua');
    botonTierra = document.getElementById('boton-tierra');
    botones = document.querySelectorAll('.BAtaque')
    
}
function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click', (e)=>{
            if(e.target.textcontent === '🔥'){
                ataqueJugador.push('FUEGO')
                boton.style.background = '#112f58'
                boton.disabled = true
            }else if(e.target.textcontent === '💧'){
                ataqueJugador.push('AGUA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }else {
                ataqueJugador.push('TIERRA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo();
        })
    })
    
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatorio = aleatorio(0, mokepones.length -1);
    

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

    if(ataqueAleatorio == 0 || ataqueAleatorio ==1){
        ataqueEnemigo.push('Fuego')
    }else if (ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('Agua')
    }else {
        ataqueEnemigo.push('Tierra') 
    }
    iniciarPelea()

}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        combate()
    }
}
function indexAmbosOponente(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    
    for (let index = 0; index < ataqueJugador.length; index++){
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponente(index, index)
            crearMensaje('Empate') 
            
        }else if(ataqueJugador[index]== 'FUEGO' && ataqueEnemigo[index]== 'TIERRA'){
            indexAmbosOponente(index, index)
            crearMensaje('Ganaste')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[index]== 'AGUA' && ataqueEnemigo[index]== 'FUEGO'){
            indexAmbosOponente(index, index)
            crearMensaje('Ganaste')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[index]== 'TIERRA' && ataqueEnemigo[index]== 'AGUA'){
            indexAmbosOponente(index, index)
            crearMensaje('Ganaste')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponente(index, index)
            crearMensaje('Perdiste')
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVidas();

}
function revisarVidas(){
    if(victoriasJugador == victoriasEnemigo){
        crearMensajeFinal('Esto fue un Empate')
    }else if (victoriasJugador > victoriasEnemigo){
        
        crearMensajeFinal('Felicitaciones! Ganaste')
    }else{
        crearMensajeFinal('Lo siento, Perdiste')
    }
}

function crearMensaje(resultado){
    

    
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

    //let parrafo = document.createElement('p');
    //parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador +', las mascotas del enemigo atacó con ' + ataqueEnemigo +'- '+ resultado;
    
    nuevoAtaqueDelJugador.appendChild(nuevoAtaqueDelJugador);
    nuevoAtaqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}
function crearMensajeFinal(resultadoFinal){
   
    
   
    sectionMensajes.innerHTML = resultadoFinal;
    
    
    sectionReiniciar.style.display= 'block'
}

function reiniciarJuego(){
    location.reload()
}


function aleatorio(min,max){
    return Math.floor(Math.random()*(max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego)


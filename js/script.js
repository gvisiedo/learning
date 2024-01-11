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
const sectionVerMapa= document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let jugadorId=null
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo 
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
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
let lienzo= mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = '../assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoMapa = 350
if (anchoDelMapa>anchoMaximoMapa){
    anchoDelMapa = anchoMaximoMapa - 20
}
alturaQueBuscamos = anchoDelMapa * 600/800
mapa.width = anchoDelMapa
mapa.height= alturaQueBuscamos
class Mokepon{
    constructor(nombre, foto, vida,fotoMapa){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho=40
        this.alto=40
        this.x=aleatorio(0, mapa.width - this.ancho)
        this.y=aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY= 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
            )
    }
};

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, '../assets/hipodoge.png');
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5,'../assets/capipepo.png');
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5,'../assets/ratigueya.png');

const hipodege_ataques= [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
]

hipodoge.ataques.push(...hipodege_ataques);
hipodogeEnemigo.ataques.push(...hipodege_ataques)
const capipepo_ataques = [
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
]
capipepo.ataques.push(...capipepo_ataques);
capipepoEnemigo.ataques.push(...capipepo_ataques);
const ratigueya_ataques = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
]

ratigueya.ataques.push(...ratigueya_ataques);
ratigueyaEnemigo.ataques.push(...ratigueya_ataques);

mokepones.push(hipodoge,capipepo,ratigueya)

/*mokepones.push(hipodoge,capipepo,ratigueya)*/

function iniciarJuego(){
    
    sectionSeleccionarAtaque.style.display= 'none'
    sectionVerMapa.style.display='none'
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
    unirseAlJuego()
}
function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function(res){
            if(res.ok){
              res.text()
                .then(function (respuesta){
                    console.log(respuesta)
                    jugadorId = respuesta
                })  
            }
        })
}


function seleccionarMascotaJugador(){
    
    //sectionSeleccionarAtaque.style.display = 'flex'
    
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
    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()

    

}
function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            mokepon : mascotaJugador
        })
    } )
    
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

function pintarCanvas(){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
   mascotaJugadorObjeto.pintarMokepon()
   enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
   hipodogeEnemigo.pintarMokepon()
   capipepoEnemigo.pintarMokepon()
   ratigueyaEnemigo.pintarMokepon()
   if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
    revisarColision(hipodogeEnemigo)
    revisarColision(capipepoEnemigo)
    revisarColision(ratigueyaEnemigo)
   }
}
function enviarPosicion(x,y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`,{
        method: "post",
        header:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function ({enemigos}){
                    console.log(enemigos)
                    enemigos.forEach(function(enemigo){
                        const mokeponNombre=enemigo.mokepon.nombre || ""
                        if(mokeponNombre === "Hipodoge"){
                            let hipodogeEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, '../assets/hipodoge.png');
                    
                        }else if (mokeponNombre === "Capipepo"){
                            let capipepoEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5,'../assets/capipepo.png');
                    
                        }else if (mokeponNombre==="Ratigueya"){
                            let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5,'../assets/ratigueya.png');

                        }
                    })
                    
                })
        }
    })
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
    
}
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
    
}
function moverAbajo(){
    mascotaJugadorObjeto.velocidadY= 5
    
}
function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
    
}
function detenerMovimiento(){
   mascotaJugadorObjeto.velocidadX = 0
   mascotaJugadorObjeto.velocidadY = 0 
}

function sePresionoUnaTecla(event){
    switch(event.key){
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
                break
        case 'ArrowRight':
            moverDerecha()
                    break;
        default:
            break;
    }

}
function iniciarMapa(){
    
    mascotaJugadorObjeto= obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}
function obtenerObjetoMascota(){
    for (let i=0; i < mokepones.length; i++){
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y +mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
        ){
            return
        }
        detenerMovimiento()
        clearInterval(intervalo)
        sectionSeleccionarAtaque.style.display = 'flex'
        sectionVerMapa.style.display='none'
        seleccionarMascotaEnemigo(enemigo)
        //alert('Hay Colisión '+ enemigo.nombre)
}
window.addEventListener('load', iniciarJuego)


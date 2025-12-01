// ===============================================
// MUSEO 360° - SISTEMA COMPLETO
// ===============================================

// CONSTANTES
const PANO_WIDTH = 7000; // Ancho total del panorama
const CENTRO = 3500; // Centro del panorama
const PARLANTE_POS = 3200; // Posición del parlante (centrado a la izquierda)
const CARTEL_POS = 4000; // Posición del cartel de navegación (desplazado 250px a la derecha)

// ESTRUCTURA DE DATOS PARA CADA SALA
const datosSalas = {
    'salaCantando': {
        nombre: 'Presentaciones de Canto',
        musica: 'asset/audios/usted.mp3',
        visor360: 'asset/imagenes/Visor-360/salaCantando.jpg',
        cuadros: [
            { src: 'asset/imagenes/fotos/cantando/YO_con_marco_dorado.jpg', x: 300, y: 110, tipo: 'vertical' },
            { src: 'asset/imagenes/fotos/cantando/con_alumnos_dorado.jpg', x: 950, y: 45, tipo: 'grande' },
            { src: 'asset/imagenes/fotos/cantando/yo_rock_con_cuero_cuadro_dorado4.jpg', x: 2000, y: 100, tipo: 'vertical' },
            { src: 'asset/imagenes/fotos/cantando/yo_rock_con_cuero_cuadro_dorado5.jpg', x: 2700, y: 210, tipo: 'pequeño' },
            { src: 'asset/imagenes/fotos/cantando/yo_rock_con_remera_kiss_cuadro_dorado.jpg', x: 4650, y: 50, tipo: 'vertical'},
            { src: 'asset/imagenes/fotos/cantando/yo_rock_con_cuero_cuadro_dorado3.jpg', x: 5500, y: 130, tipo: 'medio' },
            { src: 'asset/imagenes/fotos/cantando/yo_rock_con_Die_cuadro_dorado.jpg', x: 6300, y: 15, tipo: 'grande' }
        ],
        parlante: { x: 6500, y: 30 }
    },

    'salaColegas': {
        nombre: 'Trabajo con Colegas',
        musica: 'asset/audios/endulzameLosOidos.mp3',
        visor360: 'asset/imagenes/Visor-360/salaColegas.jpg',
        cuadros: [
            { src: 'asset/imagenes/fotos/con colegas/yo_con_Oski_cuadro_dorado.jpg', x: 2400, y: 125, tipo: 'medio' },
            { src: 'asset/imagenes/fotos/con colegas/yo_con_chiche_cuadro_dorado.jpg', x: 1350, y: 25, tipo: 'grande' },
            { src: 'asset/imagenes/fotos/con colegas/con_Mati_cuadro_dorado.jpg', x: 4700, y: 100, tipo: 'vertical' },
            { src: 'asset/imagenes/fotos/con colegas/EUROPA_direccion_dorado.jpg', x: 5700, y: 130, tipo: 'grande' }
        ],
        parlante: { x: 6300, y: 30 }
    },

    'salaAlumnos': {
        nombre: 'Trabajo con Alumnos',
        musica: 'asset/audios/saySomethingMati.mp3',
        visor360: 'asset/imagenes/Visor-360/salaAlumnos.jpg',
        cuadros: [
            { src: 'asset/imagenes/fotos/con alumnos/yo_con_Papacho_cuadro_dorado.jpg', x: 4800, y: 45, tipo: 'horizontal' },
            { src: 'asset/imagenes/fotos/con alumnos/Mati_alumno_dorado.jpg', x: 2200, y: 170, tipo: 'grande' },
            { src: 'asset/imagenes/fotos/con alumnos/con_marce.jpg', x: 5800, y: 180, tipo: 'vertical' }
        ],
        parlante: { x: 6400, y: 30 }
    },

    'salaComedia': {
        nombre: 'Comedia Musical',
        musica: 'asset/audios/sabiaEsMama.mp3',
        visor360: 'asset/imagenes/Visor-360/salaComedia.jpg',
        cuadros: [
            { src: 'asset/imagenes/fotos/comedia/europa4.jpg', x: 1300, y: 180, tipo: 'medio' },
            { src: 'asset/imagenes/fotos/comedia/europa3.jpg', x: 2250, y: 100, tipo: 'grande' },
            { src: 'asset/imagenes/fotos/comedia/europa1.jpg', x: 4750, y: 120, tipo: 'horizontal' },
            { src: 'asset/imagenes/fotos/comedia/europa2.jpg', x: 5700, y: 90, tipo: 'grande' }
        ],
        parlante: { x: 6500, y: 30 }
    },

    'salaRadio': {
        nombre: 'Grabaciones de Radio',
        musica: 'asset/audios/RecitadoFinDeAño.mp3',
        visor360: 'asset/imagenes/Visor-360/salaRadio.jpg',
        cuadros: [
            { src: 'asset/imagenes/fotos/radio/yo_en_zoe_cuadro_dorado.jpg', x: 5440, y: 180, tipo: 'vertical' },
            { src: 'asset/imagenes/fotos/radio/yo_radio_sentidos_cuadro_dorado.jpg', x: 1450, y: 190, tipo: 'medio' },
            { src: 'asset/imagenes/fotos/radio/con_centinela_dorado.jpg', x: 4600, y: 90, tipo: 'horizontal' },
            { src: 'asset/imagenes/fotos/radio/con_gus_zabala_dorado.jpg', x: 2250, y: 110, tipo: 'grande' },
            { src: 'asset/imagenes/fotos/radio/Con_Sara_Flores_y_Lucas_Marino-colega_dorado.jpg', x: 600, y: 100, tipo: 'horizontal' },
            { src: 'asset/imagenes/fotos/radio/Con_Walter_Soria-colega_dorado.jpg', x: 6100, y: 120, tipo: 'grande' }
        ],
        parlante: { x: 900, y: 30 }
    }
};

// REFERENCIAS DEL DOM
const transicionPuertaElement = document.getElementById('transicion-puerta');
const museoViewport = document.getElementById('museo-viewport');
const panoSurface = document.getElementById('pano-surface');

let audioActual = null;
let salaActual = null;

// ===============================================
// FUNCIÓN PRINCIPAL: CARGAR SALA
// ===============================================

function cargarSala(idSala) {
    const sala = datosSalas[idSala];
    if (!sala) return;

    // Si es la misma sala, no hacer nada
    if (salaActual === idSala) return;

    salaActual = idSala;

    // Cross-fade directo (sin pantalla negra)
    transicionPuertaElement.style.opacity = '1';

    setTimeout(() => {
        // Limpiar contenido anterior
        panoSurface.innerHTML = '';

        // Detener audio anterior si existe
        if (audioActual) {
            audioActual.pause();
            audioActual = null;
        }

        // Establecer imagen de fondo panorámica (con transición CSS)
        panoSurface.style.backgroundImage = `url(${sala.visor360})`;

        // Crear elementos del museo
        crearTitulo(sala.nombre);
        crearCartelNavegacion(idSala);
        crearCuadros(sala.cuadros);
        crearParlante(sala.musica);

        // Centrar vista en el centro del panorama
        centrarVista();

        // Fade in
        setTimeout(() => {
            transicionPuertaElement.style.opacity = '0';
        }, 300);

    }, 600);
}

// ===============================================
// CREAR ELEMENTOS DEL MUSEO
// ===============================================

function crearTitulo(nombre) {
    const titulo = document.createElement('div');
    titulo.className = 'titulo-sala-cartel';
    titulo.textContent = nombre;
    titulo.style.left = `${CENTRO}px`;
    panoSurface.appendChild(titulo);
}

function crearCartelNavegacion(salaActualId) {
    const cartel = document.createElement('div');
    cartel.className = 'cartel-navegacion';
    cartel.style.left = `${CARTEL_POS}px`;

    const titulo = document.createElement('h3');
    titulo.textContent = 'Otras Salas';
    cartel.appendChild(titulo);

    // Definir salas con sus colores
    const salas = [
        { id: 'salaCantando', nombre: 'Sala Canto' },
        { id: 'salaColegas', nombre: 'Sala Colegas' },
        { id: 'salaAlumnos', nombre: 'Sala Alumnos' },
        { id: 'salaComedia', nombre: 'Sala Comedia' },
        { id: 'salaRadio', nombre: 'Sala Radio' }
    ];

    salas.forEach(sala => {
        const boton = document.createElement('button');
        boton.textContent = sala.nombre;
        boton.setAttribute('data-sala', sala.id); // Para aplicar colores desde CSS
        boton.onclick = () => cargarSala(sala.id);
        
        if (sala.id === salaActualId) {
            boton.disabled = true;
        }
        
        cartel.appendChild(boton);
    });

    panoSurface.appendChild(cartel);
}

function crearCuadros(cuadros) {
    cuadros.forEach((cuadro, index) => {
        const contenedor = document.createElement('div');
        contenedor.className = `cuadro-museo cuadro-${cuadro.tipo}`;
        contenedor.style.left = `${cuadro.x}px`;
        contenedor.style.top = `${cuadro.y}px`;

        const img = document.createElement('img');
        img.src = cuadro.src;
        img.alt = `Cuadro ${index + 1}`;
        img.loading = 'lazy';

        // Manejo de errores de carga
        img.onerror = () => {
            console.warn(`No se pudo cargar: ${cuadro.src}`);
            contenedor.style.display = 'none';
        };

        contenedor.appendChild(img);
        panoSurface.appendChild(contenedor);
    });
}

function crearParlante(urlMusica) {
    const parlante = document.createElement('div');
    parlante.className = 'parlante-museo';
    parlante.style.left = `${PARLANTE_POS}px`; // Posición fija centrada

    // Rejilla decorativa
    const rejilla = document.createElement('div');
    rejilla.className = 'parlante-rejilla';
    parlante.appendChild(rejilla);

    // Indicador visual
    const indicador = document.createElement('div');
    indicador.className = 'audio-indicator';
    indicador.textContent = '♪';
    parlante.appendChild(indicador);

    // Control de audio (SIEMPRE VISIBLE, solo play/pause y volumen)
    const audio = document.createElement('audio');
    audio.src = urlMusica;
    audio.loop = true;
    audio.controls = true;
    audio.volume = 0.5;
    audio.controlsList = 'nodownload noplaybackrate'; // Ocultar descargar y velocidad
    parlante.appendChild(audio);

    // Reproducir automáticamente (puede ser bloqueado por el navegador)
    audio.play().catch(() => {
        console.log('Audio bloqueado. El usuario debe interactuar para reproducir.');
    });

    audioActual = audio;
    panoSurface.appendChild(parlante);
}

// ===============================================
// NAVEGACIÓN Y CONTROLES
// ===============================================

function centrarVista() {
    if (museoViewport) {
        const viewWidth = museoViewport.offsetWidth;
        museoViewport.scrollLeft = CENTRO - (viewWidth / 2);
    }
}

function girarMuseo(cantidad) {
    if (museoViewport) {
        museoViewport.scrollBy({
            left: cantidad,
            behavior: 'smooth'
        });
    }
}

// ===============================================
// SISTEMA DE ARRASTRE (DRAG)
// ===============================================

function iniciarArrastre() {
    let isDown = false;
    let startX;
    let scrollLeft;

    museoViewport.addEventListener('mousedown', (e) => {
        isDown = true;
        museoViewport.style.cursor = 'grabbing';
        startX = e.pageX - museoViewport.offsetLeft;
        scrollLeft = museoViewport.scrollLeft;
    });

    museoViewport.addEventListener('mouseup', () => {
        isDown = false;
        museoViewport.style.cursor = 'grab';
    });

    museoViewport.addEventListener('mouseleave', () => {
        isDown = false;
        museoViewport.style.cursor = 'grab';
    });

    museoViewport.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - museoViewport.offsetLeft;
        const walk = (x - startX) * 2;
        museoViewport.scrollLeft = scrollLeft - walk;
    });

    // Soporte táctil
    museoViewport.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - museoViewport.offsetLeft;
        scrollLeft = museoViewport.scrollLeft;
    });

    museoViewport.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - museoViewport.offsetLeft;
        const walk = (x - startX) * 2;
        museoViewport.scrollLeft = scrollLeft - walk;
        e.preventDefault();
    }, { passive: false });
}

// ===============================================
// LOOP INFINITO 360° - DESACTIVADO (sin rebote)
// ===============================================

// Comentado para evitar el efecto de rebote
// Si querés activarlo más adelante, descomentá esta función
/*
function iniciarLoop360() {
    museoViewport.addEventListener('scroll', () => {
        const maxScroll = PANO_WIDTH - museoViewport.clientWidth;
        
        if (museoViewport.scrollLeft >= maxScroll - 100) {
            museoViewport.scrollLeft = 100;
        }
        
        if (museoViewport.scrollLeft <= 100) {
            museoViewport.scrollLeft = maxScroll - 100;
        }
    });
}
*/

// ===============================================
// INICIALIZACIÓN
// ===============================================

// Hacer funciones globales accesibles desde HTML
window.cargarSala = cargarSala;
window.girarMuseo = girarMuseo;

// Iniciar cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
    cargarSala('salaCantando');
    iniciarArrastre();
    // Loop 360° desactivado para evitar rebote
});
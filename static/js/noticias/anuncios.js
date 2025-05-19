const hayMapa = document.getElementById('map');
let imagenes = [];
//Cargar anuncios
if(!hayMapa){
    imagenes = ["https://i.postimg.cc/j5pKZSSJ/Anuncio1.png","https://i.postimg.cc/nctpmrWy/Anuncio2.png","https://i.postimg.cc/DwvhCDn5/Anuncio3.png"];}
else{
    imagenes = ["https://i.postimg.cc/ncnQpQ53/Anuncio-V1.png","https://i.postimg.cc/Z5GbYGnJ/Anuncio-V2.png","https://i.postimg.cc/BQysNrx2/Anuncio-V3.png"];
}

//imagenes a cambiar
const imagenRandom1 = document.getElementById('randomImage');
const imagenRandom2 = document.getElementById('randomImage1');

//Les asigno una url al azar
const indiceRandomImagenes1 = Math.floor(Math.random()*imagenes.length);
const urlDeImagenRandom1 = imagenes[indiceRandomImagenes1]

const indiceRandomImagenes2 = Math.floor(Math.random()*imagenes.length);
const urldDeImagenRandom2 = imagenes[indiceRandomImagenes2]

//Actualizo la imagen en el source
imagenRandom1.src = urlDeImagenRandom1
imagenRandom2.src = urldDeImagenRandom2

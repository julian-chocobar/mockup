
export class Noticia {
    id;
    titulo;
    descripcion;
    tema;
    fechaPublicacion;
    fotos;
    ubicacion;
    cuerpo; //Como es un prototipo, las noticias son fijas y por lo tanto por el momento no se lo utiliza, se usa fijo/manual en el html

    constructor(id, titulo, descripcion, tema, fechaPublicacion, fotos, ubicacion) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.tema = tema;
        this.fechaPublicacion = fechaPublicacion;
        this.fotos = fotos;
        this.ubicacion = ubicacion;
    }
}
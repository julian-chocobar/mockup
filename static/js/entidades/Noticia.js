
export class Noticia {
    id;
    titulo;
    descripcion;
    tema;
    fechaPublicacion;
    fotos;
    ubicacion;

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
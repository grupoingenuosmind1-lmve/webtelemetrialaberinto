class MotorRender {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.filas = 25;
        this.columnas = 25;
        this.margen = 50;
        this.margen_fondo = 51;

        this.anchoUtil = this.canvas.width - (this.margen * 2);
        this.altoUtil = this.canvas.height - (this.margen * 2);
        this.anchoUtil_fondo = this.canvas.width - (this.margen_fondo * 2);
        this.altoUtil_fondo = this.canvas.height - (this.margen_fondo * 2);

        this.pasoX = this.anchoUtil / (this.columnas - 1);
        this.pasoY = this.altoUtil / (this.filas - 1);

        this.imagenFondo = new Image();
        this.imagenFondo.src = 'fondo.png';

        this.anchoImagen = 55;
        this.altoImagen = 55;

        this.imagenMovel = new Image();
        this.imagenMovel.src = 'robot.png';

        this.imagenMovel.onload = () => {
            const relacionAspecto = this.imagenMovel.naturalHeight / this.imagenMovel.naturalWidth;
            this.altoImagen = this.anchoImagen * relacionAspecto;
        };


        this.posX = this.gridToPxX(0);
        this.posY = this.gridToPxY(0);

        this.targetX = this.posX;
        this.targetY = this.posY;

        this.velocidad = 0.15;
        this.enDestino = true;


        this.render = this.render.bind(this);
        requestAnimationFrame(this.render);

        this.moverA(1, 1);
    }


    gridToPxX(gridX) {
        return this.margen + (gridX * this.pasoX);
    }

    gridToPxY(gridY) {
        return this.margen + (gridY * this.pasoY);
    }

    moverA(gridX, gridY) {
        const xVal = Math.max(0, Math.min(gridX, this.columnas - 1));
        const yVal = Math.max(0, Math.min(gridY, this.filas - 1));

        this.targetX = this.gridToPxX(xVal);
        this.targetY = this.gridToPxY(yVal);
        this.enDestino = false;
    }

    actualizarEstado() {
        const dx = this.targetX - this.posX;
        const dy = this.targetY - this.posY;
        const distancia = Math.hypot(dx, dy);

        if (distancia < 0.5) {
            this.posX = this.targetX;
            this.posY = this.targetY;
            this.enDestino = true;
        } else {
            this.posX += dx * this.velocidad;
            this.posY += dy * this.velocidad;
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.imagenFondo.complete) {
            this.ctx.drawImage(
                this.imagenFondo, 
                this.margen_fondo, 
                this.margen_fondo, 
                this.anchoUtil_fondo, 
                this.altoUtil_fondo
            );
        }

        this.actualizarEstado();

        if (this.imagenMovel.complete) {
            this.ctx.drawImage(
                this.imagenMovel,
                this.posX - (this.anchoImagen / 2),
                this.posY - (this.altoImagen / 2),
                this.anchoImagen,
                this.altoImagen
            );
        }

        requestAnimationFrame(this.render);
    }
}

const renderer = new MotorRender('lienzo');
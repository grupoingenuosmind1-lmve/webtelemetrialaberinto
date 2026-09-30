function parsearCoordenadas(linea) {
    const partes = linea.split(',');
    if (partes.length === 3) {
        const x = parseInt(partes[0], 10);
        const y = parseInt(partes[1], 10);
        const monedas = parseInt(partes[2], 10);
        if (!isNaN(x) && !isNaN(y) && !isNaN(monedas)) {
            return { x, y, monedas };
        }
    }
    return null;
}

const hudMonedas = document.getElementById('hudMonedas');

document.getElementById('conectar').addEventListener('click', async () => {
    try {
        const port = await navigator.serial.requestPort();
        
        await port.open({ 
            baudRate: 115200,
            bufferSize: 8192 
        });

        console.log("Conectado al puerto serie. Esperando datos...");

        const reader = port.readable.getReader();
        const textDecoder = new TextDecoder();
        let buffer = "";

        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                
                if (value) {
                    buffer += textDecoder.decode(value, { stream: true });
                    
                    const lines = buffer.split(/\r?\n/);
                    buffer = lines.pop(); // Retiene fragmentos incompletos

                    for (let i = 0; i < lines.length; i++) {
                        const cleanLine = lines[i].trim();
                        if (cleanLine) {
                            console.log("Serie:", cleanLine);

                            const info = parsearCoordenadas(cleanLine);
                            
                            if (typeof info === "object") {
                                hudMonedas.textContent = `Monedas: ${info.monedas}`

                                renderer.moverA(info.x, info.y);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error durante la lectura del puerto:", error);
        } finally {
            reader.releaseLock();
        }

    } catch (error) {
        console.error("Error al conectar con el puerto serie:", error);
    }
});
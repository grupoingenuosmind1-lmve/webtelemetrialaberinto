# Telemetría Web: Módulo de Visualización en Tiempo Real

Sistema de telemetría web para visualización y monitoreo del recorrido del prototipo en tiempo real.

---

## Plataforma Web

## La aplicación se encuentra desplegada y disponible para su uso en línea: 
>## **URL de acceso:** https://grupoingenuosmind1-lmve.github.io/webtelemetrialaberinto/

> [!IMPORTANT]
> **Requisitos de Compatibilidad y Seguridad:**
> El acceso a la plataforma requiere el uso de navegadores con soporte para la **Web Serial API**, tales como Google Chrome, Microsoft Edge y Opera. Además, el sitio se ejecuta obligatoriamente bajo el protocolo seguro **HTTPS**, requisito indispensable de los entornos web modernos para habilitar la comunicación directa entre el navegador y el hardware local mediante el puerto serie.

---

## Arquitectura del Sistema

La solución está construida bajo una arquitectura modular ligera del lado del cliente, estructurada en los siguientes componentes:

* **`index.html`**: Estructura HTML. Maquetación de la interfaz web y los elementos de visualización.
* **`serial.js`**: Lógica JavaScript. Control del renderizado del mapa y actualización del movimiento del prototipo.
* **`animacion.js`**: Lógica JavaScript. Gestión de la comunicación, recepción asíncrona de datos y parseo de coordenadas.
* **`fondo.png`**: Recurso gráfico en PNG. Imagen de fondo que representa la plantilla o plano del laberinto.
* **`robot.png`**: Recurso gráfico en PNG. Icono del prototipo para señalar su posición en tiempo real sobre el lienzo.

---

## Renderizado dinámico sobre HTML5 Canvas

El núcleo de la representación visual se fundamenta en la API del elemento `<canvas>` de HTML5. El motor de visualización funciona bajo el siguiente ciclo operativo:

1. **Carga y Dibujo de Capas:** En cada fotograma de renderizado, la aplicación limpia el lienzo y superpone la plantilla de fondo (`fondo.png`) garantizando la preservación del aspecto y escala del laberinto.
2. **Transformación de Coordenadas:** Las coordenadas cartesianas $(X, Y)$ recibidas por puerto serie son procesadas mediante `animacion.js` y transformadas a píxeles dentro del espacio del canvas mediante una matriz de mapeo que escala la cuadrícula física al tamaño relativo del elemento web.
3. **Actualización del Sprite:** El icono del prototipo (`robot.png`) es dibujado dinámicamente sobre la posición parseada por intermedio de `serial.js`. El refresco de coordenadas se sincroniza con el ciclo de repintado del navegador utilizando `requestAnimationFrame()`, evitando parpadeos visuales (*flicker*) y garantizando una experiencia fluida durante la demostración en tiempo real.

---

## Instrucciones de Uso

1. Conectar la tarjeta microcontroladora al equipo mediante USB.
2. Abrir la plataforma en un navegador compatible (Chrome/Edge/Opera) bajo HTTPS.
3. Hacer clic en el botón de vinculación e identificar el puerto COM correspondiente.
4. Una vez establecida la conexión, la interfaz comenzará a traducir la telemetría del robot directamente sobre el mapa virtual.

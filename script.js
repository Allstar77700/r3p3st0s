document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para la navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lógica para el formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Previene el envío tradicional del formulario

        // Aquí es donde necesitarías integrar un servicio de terceros o un backend.
        // Ejemplo con Formspree (sin necesidad de backend propio):
        // 1. Ve a Formspree.io, crea una cuenta y genera un endpoint para tu formulario.
        // 2. Reemplaza 'YOUR_FORMSPREE_ENDPOINT_URL' con tu URL de Formspree.

        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Ejemplo de cómo se vería la petición (usando fetch API)
        // OJO: Esta parte NO envía un correo por sí sola. Necesita un backend o servicio.
        fetch('YOUR_FORMSPREE_ENDPOINT_URL', { // <<-- REEMPLAZA ESTO con tu URL de Formspree o tu backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                // Muestra el mensaje de agradecimiento
                thankYouMessage.style.display = 'block';
                // Opcional: Limpia el formulario
                contactForm.reset();
                // Opcional: Oculta el mensaje después de unos segundos
                setTimeout(() => {
                    thankYouMessage.style.display = 'none';
                }, 5000); // Oculta después de 5 segundos
            } else {
                // Manejar errores si la petición no fue exitosa
                alert('Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo más tarde.');
                console.error('Error al enviar el formulario:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error de red o al enviar el formulario:', error);
            alert('No se pudo establecer conexión. Verifica tu conexión a internet o inténtalo más tarde.');
        });

        // Si no usas un servicio como Formspree y solo quieres el mensaje de agradecimiento sin envío real:
        // thankYouMessage.style.display = 'block';
        // contactForm.reset();
        // setTimeout(() => {
        //     thankYouMessage.style.display = 'none';
        // }, 5000);
    });
});
const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_3c8c97w';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar mensaje';
      swal.fire({
        title: `¡Mensaje enviado correctamente!`,
        icon: "sucess",
        confirmButtonColor: "green",
        confirmButtonText: "Acepto",
        
      }) 
    }, (err) => {
      btn.value = 'Enviar mensaje';
      alert(JSON.stringify(err));
    });
    form.reset()
}); 
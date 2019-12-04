function validarNombre(nombre) {
  if (nombre.length === 0) {
    return "Campo NOMBRE debe tener al menos un caracter";
  }
  if (nombre.length >= 50) {
    return "Campo NOMBRE debe tener menos de 50 caracteres";
  }

  if (!/^[a-z]+$/i.test(nombre)) {
    return "Campo NOMBRE solo acepta letras";
  }

  return "";
}

function validarEmail(mail) {
  if (mail.length >= 60) {
    return "Campo EMAIL debe tener menos de 60 caracteres";
  }
  const formatoEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (formatoEmail.test(mail)) {
    return "";
  } else if (mail.length === 0) {
    return "Campo EMAIL no puede estar vacio";
  } else {
    return "Campo EMAIL es invalido";
  }
}

function validarTelefono(telefono) {
  const formatoTelefono = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{3,4})$/;
  if (formatoTelefono.test(telefono)) {
    return "";
  } else if (telefono.length === 0) {
    return "Campo TELEFONO no puede estar vacio";
  } else {
    return "Campo TELEFONO es invalido";
  }
}

function validarFormulario(event) {
  const $form = document.querySelector("#formulario");

  const nombre = $form.nombre.value;
  const mail = $form.mail.value;
  const telefono = $form.telefono.value;

  const errorNombre = validarNombre(nombre);
  const errorEmail = validarEmail(mail);
  const errorTelefono = validarTelefono(telefono);

  const errores = {
    //estos key corresponden al valor de name en html
    nombre: errorNombre,
    mail: errorEmail,
    telefono: errorTelefono
  };

  const exitoso = manejarErrores(errores) === 0;

  if (exitoso) {
    document.querySelector("#exito").classList.add();

    setTimeout(function() {
      window.location.href = "exito.html";
    }, 500);
  }

  event.preventDefault();
}

function manejarErrores(errores) {
  const $errores = document.querySelector("#errores");
  let listaErrores = document.querySelectorAll("#errores li");
  // $errores.innerText = "";
  let cantidadErrores = 0;

  const keys = Object.keys(errores);

  keys.forEach(key => {
    const error = errores[key];
    if (error) {
      cantidadErrores++;
      $form[key].classList.add("error");
      let errorExiste = false;
      listaErrores.forEach(listaError => {
        if (listaError.innerHTML === error) {
          errorExiste = true;
        }
      });
      if (!errorExiste) {
        $form[key].classList.remove("exito");
        let $error = document.createElement("li");
        $error.innerHTML = error;
        $error.className = key;
        $errores.appendChild($error);
      }
    } else {
      $form[key].classList.add("exito");
      listaErrores.forEach(listaError => {
        console.log(listaError);
        if (listaError.className === key) {
          listaError.remove();
        }
      });
    }
  });
  return cantidadErrores;
}

const $form = document.querySelector("#formulario");
$form.onsubmit = validarFormulario;

let nombres = document.getElementById("nombre")
let apellidos = document.getElementById("apellido")
let cedula = document.getElementById("cedula")
let telefono = document.getElementById("telefono")
let especialidad = document.getElementById("especialidad")
// datos de medico
let consultorio = document.getElementById("consultorio")
let correo = document.getElementById("correo")
// datos de paciente
let edad = document.getElementById("edad")
// formulario medico
let formularioMedico = document.getElementById("formularioMedicos")
// formualrio paciente
let formularioPaciente = document.getElementById("formularioPacientes")
// formulario inicio de sesion
let formularioInicioSesion = document.getElementById("formularioInicioSesion")
// formulario inicio de sesion medico
let loginMedico = document.getElementById("login-medico")

// clase madres usuario
class Usuario {
    constructor(nombres, apellidos, cedula, telefono, especialidad) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.cedula = cedula;
        this.telefono = telefono;
        this.especialidad = especialidad;
    }
}

// mostrar datos en listado pacientes
const mostrarPacientes = function () {
    let pacientes = [];
    let cuerpoTabla = document.getElementById("listado-paciente");
    let localPacientes = localStorage.getItem("pacientes");
    if (localPacientes) {
        pacientes = JSON.parse(localPacientes);
    }
    pacientes.forEach((paciente) => {
        let fila = document.createElement("tr");
        let celdaNombres = fila.insertCell();
        let celdaApellidos = fila.insertCell();
        let celdaCedula = fila.insertCell();
        let celdaEdad = fila.insertCell();
        let celdaTelefono = fila.insertCell();
        let celdaEspecialidad = fila.insertCell();
        let celdaMedico = fila.insertCell();
        celdaNombres.textContent = paciente.nombres;
        celdaApellidos.textContent = paciente.apellidos;
        celdaCedula.textContent = paciente.cedula;
        celdaEdad.textContent = paciente.edad;
        celdaTelefono.textContent = paciente.telefono;
        celdaEspecialidad.textContent = paciente.especialidad;
        celdaMedico.textContent = "Sin asignar";
        cuerpoTabla.appendChild(fila);
    });
};
// mostrar listado pacientes
if (window.location.href.endsWith("Listado-paciente.html")) {
    mostrarPacientes();
}


// mostrar datos en listado medicos
const mostrarMedicos = function () {
    let Medicos = [];
    let cuerpoTabla = document.getElementById("listado-medico");
    let localMedicos = localStorage.getItem("Medicos");
    if (localMedicos) {
        Medicos = JSON.parse(localMedicos);
    }
    Medicos.forEach((medico) => {
        let fila = document.createElement("tr");
        let celdaNombres = fila.insertCell();
        let celdaApellidos = fila.insertCell();
        let celdaCedula = fila.insertCell();
        let celdaConsultorio = fila.insertCell();
        let celdaTelefono = fila.insertCell();
        let celdaCorreo = fila.insertCell();
        let celdaEspecialidad = fila.insertCell();
        let celdaMedico = fila.insertCell();
        celdaNombres.textContent = medico.nombres;
        celdaApellidos.textContent = medico.apellidos;
        celdaCedula.textContent = medico.cedula;
        celdaConsultorio.textContent = medico.consultorio;
        celdaTelefono.textContent = medico.telefono;
        celdaCorreo.textContent = medico.correo;
        celdaEspecialidad.textContent = medico.especialidad;
        celdaMedico.textContent = "Sin asignar";
        cuerpoTabla.appendChild(fila);
    });
};

// mostrar listado medico
if (window.location.href.endsWith("Listado-medico.html")) {
    mostrarMedicos();
}

// funcion clase hija paciente
if (window.location.href.endsWith("registro-paciente.html")) {
    formularioPaciente.addEventListener("submit", function (event) {
        event.preventDefault();
        let valorNombres = nombres.value;
        let valorApellidos = apellidos.value;
        let valorCedula = cedula.value;
        let valorEdad = edad.value;
        let valorTelefono = telefono.value;
        let valorEspecialidad = especialidad.value;
        const paciente = new Usuario(
            valorNombres,
            valorApellidos,
            valorCedula,
            valorTelefono,
            valorEspecialidad
        );
        paciente.edad = valorEdad
        let Pacientes = [];
        let localPacientes = localStorage.getItem("pacientes");
        if (localPacientes) {
            Pacientes = JSON.parse(localPacientes);
        }
        Pacientes.push(paciente);
        localStorage.setItem("pacientes", JSON.stringify(Pacientes));
        alert("Paciente registrado con exito");
        location.href="index.html"
    });
}

// funcion con clase hija medico
if (window.location.href.endsWith("registro-medico.html")) {
    formularioMedico.addEventListener("submit", function (event) {
        event.preventDefault();
        let valorNombres = nombres.value;
        let valorApellidos = apellidos.value;
        let valorCedula = cedula.value;
        let valorTelefono = telefono.value;
        let valorEspecialidad = especialidad.value;
        let valorConsultorio = consultorio.value;
        let valorCorreo = correo.value;
        const medico = new Usuario(
            valorNombres,
            valorApellidos,
            valorCedula,
            valorTelefono,
            valorEspecialidad
        );
        medico.consultorio = valorConsultorio
        medico.correo = valorCorreo
        let Medicos = [];
        let localMedicos = localStorage.getItem("Medicos");
        if (localMedicos) {
            Medicos = JSON.parse(localMedicos);
        }
        Medicos.push(medico);
        localStorage.setItem("Medicos", JSON.stringify(Medicos));
        alert("Medico registrado con exito");
        location.href="index.html"
    });
}


// funcion inicio de sesion paciente
if (window.location.href.endsWith("inicio-sesionP.html")) {
    formularioInicioSesion.addEventListener("submit", function (event) {
        event.preventDefault();
        let valorNombres = nombres.value;
        let valorCedula = cedula.value;
        const loginP = new Usuario(
            valorNombres,
            valorCedula,
        );
        let loginPaciente = [];
        let localLogin = localStorage.getItem("loginP");
        if (localLogin) {
            loginP = JSON.parse(localLogin);
        }
        loginPaciente.push(loginP);
        localStorage.setItem("loginPaciente", JSON.stringify(loginPaciente));
        alert(`Bienvenido ${valorNombres} \nIniciaste sesion correctamente`);
        location.href="Listado-paciente.html"
    });
}

// funcion inicio de sesion medico
if (window.location.href.endsWith("inicio-sesionM.html")) {
    loginMedico.addEventListener("submit",function(event){
        event.preventDefault();
        let valorNombres = nombres.value;
        let valorCedula = cedula.value;
        const loginM = new Usuario (
            valorNombres,
            valorCedula,
            )
        let loginMedico = [];
        let localLoginM = localStorage.getItem("loginMed");
        if (localLoginM) {
            loginM = JSON.parse(localLoginM);
        }
        loginMedico.push(loginM);
        localStorage.setItem("loginMedico", JSON.stringify(loginMedico));
        alert(`Bienvenido ${valorNombres} \nIniciaste sesion correctamente`)
        location.href = "Listado-medico.html"
    }) 
}

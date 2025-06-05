// ========================
// Elementos del DOM
// ========================
const elementos = {
    nombres: document.getElementById("nombre"),
    apellidos: document.getElementById("apellido"),
    cedula: document.getElementById("cedula"),
    telefono: document.getElementById("telefono"),
    especialidad: document.getElementById("especialidad"),
    consultorio: document.getElementById("consultorio"),
    correo: document.getElementById("correo"),
    edad: document.getElementById("edad"),
    formularioMedico: document.getElementById("formularioMedicos"),
    formularioPaciente: document.getElementById("formularioPacientes"),
    formularioInicioSesion: document.getElementById("formularioInicioSesion"),
    loginMedico: document.getElementById("login-medico")
};

// ========================
// Clases
// ========================
class Usuario {
    constructor(nombres, apellidos, cedula, telefono, especialidad) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.cedula = cedula;
        this.telefono = telefono;
        this.especialidad = especialidad;
    }
}

// ========================
// Funciones reutilizables
// ========================
function guardarEnLocalStorage(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos));
}

function obtenerDeLocalStorage(clave) {
    const datos = localStorage.getItem(clave);
    return datos ? JSON.parse(datos) : [];
}

function redirigirYNotificar(mensaje, url) {
    alert(mensaje);
    location.href = url;
}

// ========================
// Mostrar Listados
// ========================
function mostrarTablaUsuarios(claveStorage, idTabla, camposExtra = []) {
    const usuarios = obtenerDeLocalStorage(claveStorage);
    const cuerpoTabla = document.getElementById(idTabla);
    usuarios.forEach((usuario) => {
        const fila = document.createElement("tr");
        ["nombres", "apellidos", "cedula", ...camposExtra].forEach((campo) => {
            const celda = fila.insertCell();
            celda.textContent = usuario[campo] || "Sin asignar";
        });
        cuerpoTabla.appendChild(fila);
    });
}

// ========================
// Registro de Usuarios
// ========================
function registrarPaciente() {
    const paciente = new Usuario(
        elementos.nombres.value,
        elementos.apellidos.value,
        elementos.cedula.value,
        elementos.telefono.value,
        elementos.especialidad.value
    );
    paciente.edad = elementos.edad.value;
    const pacientes = obtenerDeLocalStorage("pacientes");
    pacientes.push(paciente);
    guardarEnLocalStorage("pacientes", pacientes);
    redirigirYNotificar("Paciente registrado con éxito", "index.html");
}

function registrarMedico() {
    const medico = new Usuario(
        elementos.nombres.value,
        elementos.apellidos.value,
        elementos.cedula.value,
        elementos.telefono.value,
        elementos.especialidad.value
    );
    medico.consultorio = elementos.consultorio.value;
    medico.correo = elementos.correo.value;
    const medicos = obtenerDeLocalStorage("Medicos");
    medicos.push(medico);
    guardarEnLocalStorage("Medicos", medicos);
    redirigirYNotificar("Médico registrado con éxito", "index.html");
}

// ========================
// Inicio de Sesión
// ========================
function iniciarSesion(claveStorage, destino) {
    const usuario = new Usuario(elementos.nombres.value, "", elementos.cedula.value);
    const sesiones = obtenerDeLocalStorage(claveStorage);
    sesiones.push(usuario);
    guardarEnLocalStorage(claveStorage, sesiones);
    redirigirYNotificar(`Bienvenido ${usuario.nombres}\nIniciaste sesión correctamente`, destino);
}

// ========================
// Enrutamiento
// ========================
const url = window.location.href;
if (url.endsWith("registro-paciente.html")) {
    elementos.formularioPaciente.addEventListener("submit", (e) => {
        e.preventDefault();
        registrarPaciente();
    });
}

if (url.endsWith("registro-medico.html")) {
    elementos.formularioMedico.addEventListener("submit", (e) => {
        e.preventDefault();
        registrarMedico();
    });
}

if (url.endsWith("inicio-sesionP.html")) {
    elementos.formularioInicioSesion.addEventListener("submit", (e) => {
        e.preventDefault();
        iniciarSesion("loginPaciente", "Listado-paciente.html");
    });
}

if (url.endsWith("inicio-sesionM.html")) {
    elementos.loginMedico.addEventListener("submit", (e) => {
        e.preventDefault();
        iniciarSesion("loginMedico", "Listado-medico.html");
    });
}

if (url.endsWith("Listado-paciente.html")) {
    mostrarTablaUsuarios("pacientes", "listado-paciente", ["edad", "telefono", "especialidad"]);
}

if (url.endsWith("Listado-medico.html")) {
    mostrarTablaUsuarios("Medicos", "listado-medico", ["consultorio", "telefono", "correo", "especialidad"]);
}

// Clases Registro y Evaluación
class Registro {
    constructor(estudiante, materia) {
        this.estudiante = estudiante;
        this.materia = materia;
    }
}

class Evaluacion extends Registro {
    constructor(estudiante, materia, calificacion) {
        super(estudiante, materia);
        this.calificacion = calificacion;
    }
}

// Variables para almacenar las evaluaciones
let evaluaciones = [];

// Función para mostrar un formulario
function mostrarFormulario(formularioId) {
    const formularios = document.querySelectorAll('.formulario');
    formularios.forEach(formulario => {
        formulario.style.display = 'none';
    });
    document.getElementById(formularioId).style.display = 'flex';
}

// Evento para registrar una nueva evaluación
document.getElementById('formRegistro').addEventListener('submit', function(event) {
    event.preventDefault();
    const estudiante = document.getElementById('estudiante').value;
    const materia = document.getElementById('materia').value;
    const calificacion = document.getElementById('calificacion').value;

    const nuevaEvaluacion = new Evaluacion(estudiante, materia, parseInt(calificacion));
    evaluaciones.push(nuevaEvaluacion);

    alert('Evaluación registrada exitosamente');
    this.reset();
});

// Evento para mostrar todas las evaluaciones
document.getElementById('mostrarEvaluaciones').addEventListener('click', function() {
    mostrarFormulario('listaEvaluaciones');
    const lista = document.getElementById('evaluaciones');
    lista.innerHTML = '';

    evaluaciones.forEach((evaluacion, index) => {
        const item = document.createElement('li');
        item.textContent = `${index + 1}. Estudiante: ${evaluacion.estudiante}, Materia: ${evaluacion.materia}, Calificación: ${evaluacion.calificacion}`;
        lista.appendChild(item);
    });
});

// Evento para calcular el promedio
document.getElementById('formPromedio').addEventListener('submit', function(event) {
    event.preventDefault();
    const estudiante = document.getElementById('promEstudiante').value;
    const materia = document.getElementById('promMateria').value;

    const evaluacionesFiltradas = evaluaciones.filter(evaluacion => evaluacion.estudiante === estudiante && evaluacion.materia === materia);

    if (evaluacionesFiltradas.length === 0) {
        document.getElementById('resultadoPromedio').textContent = 'No se encontraron evaluaciones para este estudiante y materia.';
        return;
    }

    const suma = evaluacionesFiltradas.reduce((acc, evaluacion) => acc + evaluacion.calificacion, 0);
    const promedio = suma / evaluacionesFiltradas.length;

    document.getElementById('resultadoPromedio').textContent = `El promedio de ${estudiante} en ${materia} es ${promedio.toFixed(2)}`;
});

// Eventos para mostrar los formularios
document.getElementById('registroEvaluacion').addEventListener('click', function() {
    mostrarFormulario('formRegistro');
});

document.getElementById('calcularPromedio').addEventListener('click', function() {
    mostrarFormulario('formPromedio');
});

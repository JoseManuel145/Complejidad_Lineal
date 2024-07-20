import { Bussines } from "../models/Bussines.mjs";
import { lista, array } from "./Dependencies.mjs";

// Contexto del gráfico de tiempos para ArrayList
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['BubbleSort', 'MergeSort', 'RadixSort'],
        datasets: [{
            label: "Diferencia",
            data: [0, 0, 0], // Datos iniciales
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 3
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Tiempo de Ejecución: ArrayList',
                font: {
                    size: 24
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Tiempo en ms',
                    font: {
                        size: 18
                    }
                }
            }
        }
    }
});

// Contexto del gráfico de inserciones para ArrayList
var ctxInsertions = document.getElementById('insertionsChart').getContext('2d');
var insertionsChart = new Chart(ctxInsertions, {
    type: 'line',
    data: {
        type: 'line',
        labels: ['BubbleSort', 'MergeSort', 'RadixSort'],
        datasets: [{
            label: "Diferencia",
            data: [0, 0, 0], // Datos iniciales (número de inserciones)
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 3
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Número de Inserciones: ArrayList',
                font: {
                    size: 24
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Inserciones',
                    font: {
                        size: 18
                    }
                }
            }
        }
    }
});

// Contexto del gráfico de tiempos para LinkedList
var ctxLinkedList = document.getElementById('linkedListChart').getContext('2d');
var linkedListChart = new Chart(ctxLinkedList, {
    type: 'line',
    data: {
        type: 'line',
        labels: ['BubbleSort', 'MergeSort', 'RadixSort'],
        datasets: [{
            label: "Diferencia",
            data: [0, 0, 0], // Datos iniciales
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 3
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Tiempo de Ejecución: LinkedList',
                font: {
                    size: 24
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Tiempo en ms',
                    font: {
                        size: 18
                    }
                }
            }
        }
    }
});

// Contexto del gráfico de inserciones para LinkedList
var ctxLinkedListInsertions = document.getElementById('linkedListInsertionsChart').getContext('2d');
var linkedListInsertionsChart = new Chart(ctxLinkedListInsertions, {
    type: 'line',
    data: {
        type: 'line',
        labels: ['BubbleSort', 'MergeSort', 'RadixSort'],
        datasets: [{
            label: "Diferencia",
            data: [0, 0, 0], // Datos iniciales (número de inserciones)
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 3
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Numero de Inserciones: LinkedList',
                font: {
                    size: 24
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Inserciones',
                    font: {
                        size: 18
                    }
                }
            }
        }
    }
});

// Botones y elementos del DOM
let arrayBtn = document.getElementById('saveArray');
let listaBtn = document.getElementById('saveList');
let arrayBubble = document.getElementById('arrayBubble');
let arrayMerge = document.getElementById('arrayMerge');
let arrayRadix = document.getElementById('arrayRadix');
let listBubble = document.getElementById('listBubble');
let listMerge = document.getElementById('listMerge');
let listRadix = document.getElementById('listRadix');

// Guardar datos
function save(arreglo) {
    fetch("../../../bussines.json")
        .then(response => response.json())
        .then(data => {
            for (let x = 0; x <= 20000; x++) {
                let bussines = new Bussines(data[x].name, data[x].address, data[x].city, data[x].state, data[x].postal_code);
                arreglo.push(bussines);
                if (x == 20000) {
                    console.log("ya se guardaron todas");
                }
            }
        })
        .catch(err => console.log(err));
}

// Medir el tiempo de ejecución
function measureTime(func) {
    let startTime = performance.now();
    func();
    let endTime = performance.now();
    let timeTaken = endTime - startTime;
    return timeTaken;
}

// Actualizar los datos en la gráfica de tiempos
function updateChartData(label, timeTaken) {
    const data = myChart.data.datasets[0].data;
    const labels = myChart.data.labels;
    const index = labels.indexOf(label);

    if (index !== -1) {
        data[index] = timeTaken;
        myChart.update();
    }
}

// Actualizar los datos en la gráfica de inserciones
function updateInsertionsChartData(label, insertions) {
    const data = insertionsChart.data.datasets[0].data;
    const labels = insertionsChart.data.labels;
    const index = labels.indexOf(label);

    if (index !== -1) {
        data[index] = insertions;
        insertionsChart.update();
    }
}

// Actualizar los datos en la gráfica de tiempos para LinkedList
function updateLinkedListChartData(label, timeTaken) {
    const data = linkedListChart.data.datasets[0].data;
    const labels = linkedListChart.data.labels;
    const index = labels.indexOf(label);

    if (index !== -1) {
        data[index] = timeTaken;
        linkedListChart.update();
    }
}

// Actualizar los datos en la gráfica de inserciones para LinkedList
function updateLinkedListInsertionsChartData(label, insertions) {
    const data = linkedListInsertionsChart.data.datasets[0].data;
    const labels = linkedListInsertionsChart.data.labels;
    const index = labels.indexOf(label);

    if (index !== -1) {
        data[index] = insertions;
        linkedListInsertionsChart.update();
    }
}

// Event listeners para ArrayList
arrayBtn.addEventListener('click', () => {
    save(array);
});

arrayBubble.addEventListener("click", () => {
    let iterations;
    let timeTaken = measureTime(() => iterations = array.bubbleSort());
    document.getElementById("tiempoBubbleA").value = `BubbleSort Time: ${timeTaken} ms, Iterations: ${iterations}`;
    updateChartData('BubbleSort', timeTaken);
    updateInsertionsChartData('BubbleSort', iterations);
});

arrayMerge.addEventListener("click", () => {
    let iterations = { count: 0 };
    let timeTaken = measureTime(() => array.mergeSort(array.array, iterations));
    document.getElementById("tiempoMergeA").value = `MergeSort Time: ${timeTaken} ms, Iterations: ${iterations.count}`;
    updateChartData('MergeSort', timeTaken);
    updateInsertionsChartData('MergeSort', iterations.count);
});

arrayRadix.addEventListener("click", () => {
    let iterations;
    let timeTaken = measureTime(() => iterations = array.radixSort());
    document.getElementById("tiempoRadixA").value = `RadixSort Time: ${timeTaken} ms, Iterations: ${iterations}`;
    updateChartData('RadixSort', timeTaken);
    updateInsertionsChartData('RadixSort', iterations);
});

// Event listeners para LinkedList
listaBtn.addEventListener('click', () => {
    save(lista);
});

listBubble.addEventListener("click", () => {
    let iterations;
    let timeTaken = measureTime(() => iterations = lista.bubbleSort());
    document.getElementById("tiempoBubbleL").value = `BubbleSort Time: ${timeTaken} ms, Iterations: ${iterations}`;
    updateLinkedListChartData('BubbleSort', timeTaken);
    updateLinkedListInsertionsChartData('BubbleSort', iterations);
});

listMerge.addEventListener("click", () => {
    let iterations;
    let timeTaken = measureTime(() => iterations = lista.mergeSort());
    document.getElementById("tiempoMergeL").value = `MergeSort Time: ${timeTaken} ms, Iterations: ${iterations}`;
    updateLinkedListChartData('MergeSort', timeTaken);
    updateLinkedListInsertionsChartData('MergeSort', iterations);
});

listRadix.addEventListener("click", () => {
    let iterations;
    let timeTaken = measureTime(() => iterations = lista.radixSort());
    document.getElementById("tiempoRadixL").value = `RadixSort Time: ${timeTaken} ms, Iterations: ${iterations}`;
    updateLinkedListChartData('RadixSort', timeTaken);
    updateLinkedListInsertionsChartData('RadixSort', iterations);
});

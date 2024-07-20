export class ArrayModel {
    constructor() {
        this.array = [];
    }

    push(data) {
        let insercionCorrect = this.array.push(data);
        return insercionCorrect > 0; // Retorna true si el push fue exitoso
    }

    print(callback) {
        let array = this.array;
        for (let i = 0; i < array.length; i++) {
            callback(array[i]);
        }
    }

    bubbleSort() {
        let items = this.array;
        let length = items.length;
        let swap;
        let iterations = 0;

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < (length - i - 1); j++) {
                iterations++;
                if (items[j].name > items[j + 1].name) {
                    swap = items[j];
                    items[j] = items[j + 1];
                    items[j + 1] = swap;
                }
            }
        }
        return iterations;
    }

    mergeSort(items = this.array, iterations = { count: 0 }) {
        if (items.length <= 1) {
            return items;
        }
        const middle = Math.floor(items.length / 2);
        const left = items.slice(0, middle);
        const right = items.slice(middle);

        return this.#merge(this.mergeSort(left, iterations), this.mergeSort(right, iterations), iterations);
    }

    #merge(left, right, iterations) {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            iterations.count++;
            if (left[leftIndex].name < right[rightIndex].name) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    #getMax(items) {
        let max = items[0].name.length; // Obtén la longitud máxima de las cadenas
        for (let i = 1; i < items.length; i++) {
            if (items[i].name.length > max) {
                max = items[i].name.length;
            }
        }
        return max;
    }

    radixSort() {
        let items = this.array;
        let maxLen = this.#getMax(items);
        let iterations = 0; // Contador de iteraciones

        for (let exp = maxLen - 1; exp >= 0; exp--) {
            iterations += this.#countingSort(items, exp);
        }
        return iterations;
    }

    #countingSort(arr, exp) {
        let output = new Array(arr.length);
        let count = new Array(256).fill(0); // Cambiar el tamaño del count array para manejar caracteres ASCII
        let iterations = 0; // Contador de iteraciones para counting sort

        // Contar ocurrencias de cada carácter
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] && arr[i].name) {
                let num = this.#wordToNumber(arr[i].name);
                let charCode = Math.floor(num / Math.pow(256, exp)) % 256;
                console.log(`charCode at exp ${exp} for ${arr[i].name}:`, charCode); // Depuración
                count[charCode]++;
            } else {
                console.warn(`Elemento inválido en la posición ${i}:`, arr[i]);
            }
            iterations++; // Incrementar el contador en cada iteración
        }

        // Ajustar el array count
        for (let i = 1; i < 256; i++) { // Ajustar el rango de caracteres ASCII
            count[i] += count[i - 1];
        }

        // Construir el array de salida
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] && arr[i].name) {
                let num = this.#wordToNumber(arr[i].name);
                let charCode = Math.floor(num / Math.pow(256, exp)) % 256;
                output[count[charCode] - 1] = arr[i];
                count[charCode]--;
            }
        }

        // Copiar el array de salida al array original
        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
        }
        return iterations;
    }

    // Función auxiliar para convertir una palabra a número
    #wordToNumber(word) {
        let number = 0;
        for (let i = 0; i < word.length; i++) {
            number = number * 256 + word.charCodeAt(i);
        }
        return number;
    }
}
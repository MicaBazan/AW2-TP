/*export const ordenes = (id, total, estado) => {
    `
    <div class="bg-white shadow-md rounded-lg overflow-hidden mb-4">
            <div class="px-6 py-4 flex justify-between gap-8">
            <div>
                <h2 class="font-bold text-xl mb-2">Orden #${id}</h2>
                <p class="text-gray-600 mb-2">probandooo</p>
                <p class="text-gray-600 mb-2">Total: $${total}</p>
                <p class="text-gray-600 mb-2">Estado: ${estado}</p>
            </div>
            <div class="flex justify-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 mb-10">Modificar Estado</button>
            </div>
        </div>
    </div>
    `
}*/

export const ordenes = (id, total, estado, nombre, apellido) => {
    return `
    <div class="bg-white shadow-md rounded-lg overflow-hidden mb-4">
        <div class="px-6 py-4 flex justify-between gap-8">
            <div>
                <h2 class="font-bold text-xl mb-2">Orden #${id}</h2>
                <p class="text-gray-600 mb-2">Total: $${total}</p>
                <p class="text-gray-600 mb-2">Comprador: ${nombre} ${apellido}</p>
                <p class="text-gray-600 mb-2">Estado: ${estado}</p>
            </div>
            <div class="flex justify-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 mb-10">Modificar Estado</button>
            </div>
        </div>
    </div>
    `;
}

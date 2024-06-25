export const products = ( nombre, descripcion, image, precio)=>{
    return `
        <div class="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div class="px-4 py-2">
                <h1 class="text-xl font-bold text-gray-800 uppercase dark:text-white" id="nombre-producto">${nombre}</h1>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400" id="descripcion-producto">${descripcion}</p>
            </div>
                
            <img class="object-cover w-full h-48 mt-2" src="${image}" alt="${nombre}" id="imagen-producto">
                
            <div class="flex items-center justify-between px-4 py-2 bg-orange-300">
                <h1 class="text-lg font-bold text-white" id="precio-producto">$${precio}</h1>
                <button class="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">Agregar al carro</button>
            </div>
        </div>
    
    `
}
/*
    Script para Generación del Post:
    ----------------------------------------
    1.- Ir por el Query Param de la URL
    2.- Extraer el Hash
    3.- Conectarse a Firebase por medio de Ajax
    4.- Método async - await con su try-catch
    5.- Extraer y procesar la información
    6.- Imprimirla y sustituir el placeholder
    7.- Agregar un botón que haga link a la página de edición
    8.- Através de query params pasar el hash para ser procesado
    9.- Sección de comentarios por lo pronto es opcional*
    10.- Conteo de Likes por lo pronto es opcional*
    11.- Placeholder por lo pronto es opcional*

*/
    
/*
    Step 1 & 2: Get Query Param from URL and extract the Hash
    -----------------------------------------------------------------
*/

let myHashStr = window.location.search
myHashStr = myHashStr.slice(myHashStr.search("=")+1)

/*
    Step 3 & 4: Get The regarding Hash´s JSON
    -----------------------------------------------------------------
*/

let myJSON
getPost()

async function getPost (){

    try {
        
        myJSON = await fetch(`https://desafio-js-54653-default-rtdb.firebaseio.com/posts/${myHashStr}.json`)
        myJSON = await myJSON.json()

        printPost()

    } catch (error) {
        console.log("Error from getPost Function: " + error)       
    }

}

/*
    Step 5 & 6: Extract and Process The regarding Information
    -----------------------------------------------------------------
*/

let cardPost = document.querySelector(".page")
let cardStr = ""

function printPost(){

    cardStr += `<div class="card" style="width: 100%"></div>`
    cardStr += `<img src="${myJSON.coverImg}" class="card-img-top" alt="...">`
    cardStr += `<div class="card-body">`
    cardStr += `<h5 class="card-title">${myJSON.title}</h5>`
    cardStr += `<p class="card-text">${myJSON.content}</p>`
    cardStr += `</div>`

    cardPost.innerHTML = cardStr
}

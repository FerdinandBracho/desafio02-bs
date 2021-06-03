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

function printPost(){

    let coverPost = document.querySelector(".page-cover")
    coverPost.setAttribute("src",myJSON.coverImg)

    let cardHeader = document.querySelector(".page-title")
    cardHeader.innerText = myJSON.title

    printTags()

    let myName = document.querySelector(".page-profile .myName")
    myName.innerText = myJSON.user

    let myDate = document.querySelector(".page-profile .myDate")
    myDate.innerText = myJSON.date

    let myRead =  document.querySelector(".page-profile .myRead")
    myRead.innerText = myJSON.minRead

    let cardPost = document.querySelector(".page-content")
    let cardStr = ""
  
    cardStr += `<div class="card" style="width: 100%; border:none">`
    cardStr += `<div class="card-body">`
    cardStr += `<p class="card-text">${myJSON.content}</p>`
    cardStr += `</div>`

    cardPost.innerHTML = cardStr

}

function printTags () {

    let myUL = document.querySelector(".page-tags ul")
    myUL.innerHTML = ""

    let counter = 0

    myJSON["tags"].split(",").forEach(item => {

        console.log(item)

        let myIL = document.createElement("il")
        let myAnchor = document.createElement("a")

        myAnchor.setAttribute("class","myAnchor"+counter)
        myAnchor.innerText = " #" + item + "_ "

        myIL.appendChild(myAnchor)
        myUL.appendChild(myIL)

        counter += 1

    })

        
}

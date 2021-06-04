// !Declaracion de funcion para insercion de data en "Main Post"

const insertPostData = (title, tags, coverImg, user, date, avatarImg, singlePostHash) => {
    try {
        // !Manipulacion de propiedades para presentarlas de la forma requerida
        let formatDate = date.substring(0, 10)
        let arrTags = ''
        tags.split(',').forEach(tag => arrTags += '#' + tag + ' ')

        // !Creacion de elemtos a insertar en html 
        let data = ` 
        <li class="card my-3">
        <img src="${coverImg}" class="card-img-top" alt="post-img">
        <div class="card-body">
            <div class="d-flex avatar-info">
                <img src="${avatarImg}" alt="avatar-img">
                <div class="ms-2 d-flex flex-column name-info">
                    <small>${user}</small>
                    <small>${formatDate}</small>
                </div>
            </div>
            <a href="post.html?post-hash=${singlePostHash}" class="p-title"><h3 class="card-title my-3 text-wrap">${title}</h3></a>
            <small class="card-text p-hashtags">${arrTags}</small>
            <div class="d-flex justify-content-end align-items-center">
                <small class=""></small>
                <button type="button" class="btn btn-light border mx-1">save</button>
            </div>
        </div>  
        </li>       
        `
        // !Insercion de HTML en elemento seleccionado
        document.querySelector('.posts-ul').innerHTML += data
    } catch (error) {
        console.log(error)
    }
}

// !Declaracion de funciones para insercion de data en "various Post"
const insertVariousPostData = (title, tags, user, date, avatarImg, singlePostHash) => {
    try {
        // !Manipulacion de propiedades para presentarlas de la forma requerida
        let formatDate = date.substring(0, 10)
        let arrTags = ''
        tags.split(',').forEach(tag => arrTags += '#' + tag + ' ')

        // !Creacion de elemtos a insertar en html 
        let data = ` 
        <li class="card my-3">
        <div class="card-body">
            <div class="d-flex avatar-info">
                <img src="${avatarImg}" alt="avatar-img">
                <div class="ms-2 d-flex flex-column name-info">
                    <small>${user}</small>
                    <small>${formatDate}</small>
                </div>
            </div>
            <a href="post.html?post-hash=${singlePostHash}" class="p-title"><h3 class="card-title my-3 text-wrap">${title}</h3></a>
            <small class="card-text p-hashtags">${arrTags}</small>
            <div class="d-flex justify-content-end align-items-center">
                <small class=""></small>
                <button type="button" class="btn btn-light border mx-1">save</button>
            </div>
        </div>  
        </li>       
        `
        // !Insercion de HTML en elemento seleccionado
        document.querySelector('.posts-ul').innerHTML += data
    } catch (error) {
        console.log(error)
    }
}

// !Declaracion de funcion asincrona para el request a la coleccion de post en base de datos
const getAllPost = async() => {
    try {
        await fetch('https://desafio-js-54653-default-rtdb.firebaseio.com/posts/.json').then(res => {
            return res.json()
        }).then(response => {

            // !Manipulacion de response para adaptarla a las necesidaes 
            arrPost = Object.entries(response).reverse()
            let firstPost = arrPost.shift()
            let postHash = firstPost[0]
            let { title, tags, coverImg, user, date, avatarImg } = firstPost[1]

            // !Invocacion de funcion para insertar/pintar datos de Main Post
            insertPostData(title, tags, coverImg, user, date, avatarImg, postHash)

            // !Invocacion de funcion para insertar/Pintar datos de Various Post 
            arrPost.forEach(item => {
                let postsHash = item[0]
                let { title, tags, user, date, avatarImg } = item[1]
                insertVariousPostData(title, tags, user, date, avatarImg, postsHash)

            })})
        } catch (error) {
            console.log(error)
        }
}

// !Ejecucion de funcion para pintar Posts organizados en la pagina principial 
getAllPost()
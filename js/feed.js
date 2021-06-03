let btn = document.querySelector('#test')
let result = '' 

// 'yyyy-mm-ddtttt'.substring(0,10)


btn.addEventListener('click', () => {
    let post = {
            title: 'pruba de ultimo post yairrrrrrrr',
            tags: 'js,test,Begginers',
            coverImg: 'https://picsum.photos/500/200',
            user: 'Ferdinand Bracho',
            date: new Date(),
            minRead:'',
            content: 'lkjasndkjansdjknasjndasdfsdfsdfsdfsdfd', 
    }

    const sendTest = async () => {
        try {
            fetch('https://desafio-js-54653-default-rtdb.firebaseio.com/posts.json', {
                method: 'POST',
                body: JSON.stringify(post)
                }).then((res) => {
                    return(res.json())
                }).then((response) => {
                    console.log(response)
                })   
        } catch (error) {
            console.log(error)
        }
    }
    sendTest()
})

// ? ///////////////////////////////////////////////////

const insertPostData =  (title, tags, coverImg, user, date, avatarImg ,singlePostHash) => {
    try {
        console.log(singlePostHash)

        let formatDate =  date.substring(0,10)
        let arrTags =''
        tags.split(',').forEach(tag => arrTags += '#' + tag + ' ')

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
                <small class="">5 min read</small>
                <button type="button" class="btn btn-light mx-1">save</button>
            </div>
        </div>  
        </li>       
        ` 
        document.querySelector('.posts-ul').innerHTML += data
    } catch (error) {
        console.log(error)
    }
}

const insertVariousPostData = (title, tags, user, date, avatarImg ,singlePostHash) => {
    try {
        console.log(singlePostHash)
        let formatDate =  date.substring(0,10)
        let arrTags =''
        tags.split(',').forEach(tag => arrTags += '#' + tag + ' ')

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
                <small class="">5 min read</small>
                <button type="button" class="btn btn-secondary mx-1">save</button>
            </div>
        </div>  
        </li>       
        ` 
        document.querySelector('.posts-ul').innerHTML += data
    } catch (error) {
        console.log(error)
    }
}

// ? ///////////////////////////////////////////////////////////////////////////

    const getAllPost = async () => {
        try {
            await fetch ('https://desafio-js-54653-default-rtdb.firebaseio.com/posts/.json'
            ).then(res => {
                return res.json()
            }).then(response => {
                console.log(response)
                arrPost = Object.entries(response)
                arrPost.reverse()
                
                let firstPost = arrPost.shift()
                console.log(firstPost)
                let postHash = firstPost[0]
                console.log(postHash)
                let {title, tags, coverImg, user, date, minRead, avatarImg} = firstPost[1]
                insertPostData(title, tags, coverImg, user, date, avatarImg, postHash)
                
                
                
                arrPost.forEach(item => {
                    let postsHash = item[0]
                    console.log(postsHash)
                    let {title, tags, user, date, minRead, avatarImg} = item[1]
                    insertVariousPostData(title, tags,user, date,avatarImg ,postsHash)
                })

            })
        } catch (error) {
            console.log(error)  
        }

    }

    getAllPost()





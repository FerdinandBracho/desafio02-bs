let btn = document.querySelector('#test')
let result = '' 

btn.addEventListener('click', () => {
    let post = {
            title: 'Introducing Regcode - Create Regular Expressions Easily with Code',
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

const insertPostData = async (title, tags, coverImg, user, date, minRead,singlePostHash) => {
    try {

        function getDate() {
            let yourDate = new Date()
            const offset = yourDate.getTimezoneOffset()
            yourDate = new Date(yourDate.getTime() - (offset*60*1000))
            return yourDate.toISOString()
        }

        let formatDate =  getDate()
        let arrTags =''

        tags.split(',').forEach(tag => arrTags += '#' + tag + ' ')

        let data = ` 
        <li class="card my-3">
        <img src="${coverImg}" class="card-img-top" alt="post-img">
        <div class="card-body">
            <div class="d-flex avatar-info">
                <img src="https://picsum.photos/40/40" alt="avatar-img">
                <div class="ms-2 d-flex flex-column name-info">
                    <small>nino oxxo</small>
                    <small>${formatDate}</small>
                </div>
            </div>
            <a href="post.html?post-hash=${singlePostHash}"><h3 class="card-title my-3 text-wrap">${title}</h3></a>
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

    // ?/////////////
    const getAllPost = async () => {
        try {
            await fetch ('https://desafio-js-54653-default-rtdb.firebaseio.com/posts/.json'
            ).then(res => {
                return res.json()
            }).then(response => {

                // ! Definition and invoke function to take every post individually  
                for (item in response) {
                    let singlePostHash = item

                    const GetPostData = async () => {
                        try {
                            await fetch(`https://desafio-js-54653-default-rtdb.firebaseio.com/posts/${singlePostHash}/.json`
                            ).then(res => {
                                return res.json()
                            }).then(response => {
                                let {title, tags, coverImg, user, date, minRead} = response
                                insertPostData(title, tags, coverImg, user, date, minRead, singlePostHash)
                            })
                        } catch (error) {
                                console.log(error) 
                        }
                    }
                    GetPostData()
                }
            })
        } catch (error) {
            console.log(error)
        }

    }

    getAllPost()





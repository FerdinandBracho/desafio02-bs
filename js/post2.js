let btn = document.querySelector('#test')
let result = ''
btn.addEventListener('click', () => {
    let post = {
        title: 'Introducing Regcode - Create Regular Expressions Easily with Code',
        tags: 'js,test,Begginers',
        coverImg: 'https://picsum.photos/500/200',
        user: 'Ferdinand Bracho',
        date: new Date(),
        minRead: '',
        content: 'lkjasndkjansdjknasjndasdfsdfsdfsdfsdfd',
    }
    const sendTest = async() => {
        try {
            fetch('https://desafio-js-54653-default-rtdb.firebaseio.com/posts.json', {
                method: 'POST',
                body: JSON.stringify(post)
            }).then((res) => {
                return (res.json())
            }).then((response) => {
                console.log(response)
            })
        } catch (error) {
            console.log(error)
        }
    }
    sendTest()
})
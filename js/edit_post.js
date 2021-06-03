var quill
$(document).ready(() => {
    let myHashStr1 = window.location.search
    myHashStr1 = myHashStr1.slice(myHashStr1.search("=") + 1)
    console.log(myHashStr1)
    const printPostFetch = async() => {
        try {
            let post = await $.get(`https://desafio-js-54653-default-rtdb.firebaseio.com/posts/${myHashStr1}.json`)
            if (post !== null) {
                let { title, coverImg, user, content, tags, avatarImg } = post
                $('#title').val(title)
                $('#coverImg').val(coverImg)
                $('#user').val(user)
                quill.root.innerHTML = content
                $('#tags_tag').val(tags)
                $('#avatarImg').val(avatarImg)

            }

        } catch (error) {
            console.log(error)
        }
    }
    async function editPost(objEditedPost) {

        try {
            let req = await $.ajax({
                url: `https://desafio-js-54653-default-rtdb.firebaseio.com/posts/${myHashStr1}.json`,
                method: 'PUT',
                dataType: "json",
                data: JSON.stringify(objEditedPost),
            })
            window.location.pathname = '/'
            console.log(req)

        } catch (error) {
            console.log(error)
        }
    }

    printPostFetch()



    $('#btn__edit--post').click(function(event) {
        event.preventDefault()
        let inputtitle = $('#title').val()
        let inputcoverImg = $('#coverImg').val()
            //let inputminRead = parseInt($('#minRead').val())
        let inputuser = $('#user').val()
            //let inputdate = $('#date').val()
        let inputavatarImg = $('#avatarImg').val()
        let inputpost = quill.root.innerHTML
        let tags = ""
        let arraytags = $('.tag-text')
        for (let i = 0; i < arraytags.length; i++) {
            tags += $(arraytags[i]).text() + ","
            console.log(arraytags[i])
            console.log(arraytags[i].innerText)
        }
        tags = tags.slice(0, -1)

        if (inputtitle == '' ||
            inputcoverImg == '' ||
            inputuser == '' ||
            inputavatarImg == '' ||
            inputpost == '<p><br></p>'
        ) {
            console.log('Faltan datos obligatorios')
            return
        }

        let editedPost = {
            title: inputtitle,
            coverImg: inputcoverImg,
            user: inputuser,
            content: inputpost,
            date: new Date(),
            avatarImg: inputavatarImg,
            tags: tags,
            //minRead: ' ',
        }
        console.log(tags)
        console.log(editedPost)
        editPost(editedPost)


    })

    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }], // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
        [{ 'direction': 'rtl' }], // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'] // remove formatting button
    ];

    if ($('#editor').length > 0) {
        quill = new Quill('#editor', {
            theme: 'snow',
            modules: {
                toolbar: toolbarOptions
            },
        })
    }

    $('#tags').tagsInput({
        // min/max number of characters
        minChars: 0,
        maxChars: null,
        // max number of tags
        limit: null,
        // RegExp
        validationPattern: null,
        // duplicate validation
        unique: true
    })




    const deletepost = async(hash) => {
        try {
            let myUrl = `https://desafio-js-54653-default-rtdb.firebaseio.com/posts/${hash}.json`

            console.log(myUrl)

            await $.ajax({
                url: myUrl,
                method: 'DELETE',
                dataType: 'json',
                success: response => {
                    printPostFetch()
                }
            })
            window.location.pathname = '/'
        } catch (error) {
            console.log(error)
        }
    }

    $('#btn__delete--post').click(function(myevent) {
        myevent.preventDefault()
        let myHashStr1 = window.location.search
        myHashStr1 = myHashStr1.slice(myHashStr1.search("=") + 1)

        console.log('evento delete button ')
        deletepost(myHashStr1)



    })

})
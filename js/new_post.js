const createPost = async(objpost) => {
    try {
        let newpost = await $.post('https://desafio-js-54653-default-rtdb.firebaseio.com/posts.json', JSON.stringify(objpost))
        newpost.name ? window.location.pathname = '/' : ''
    } catch (error) {
        console.log(error)
    }
}
var quill
$(document).ready(function() {
    console.log('ready')
    $('#btn__create--post').click(function(event) {
        event.preventDefault()
            // sentencias
        let inputtitle = $('#title').val()
        let inputcoverImg = $('#coverImg').val()
            //let inputminRead = parseInt($('#minRead').val())
        let inputuser = $('#user').val()
            //let inputdate = $('#date').val()
        let inputpost = quill.root.innerHTML
        let tags = $('#tags').val()
        let inputavatarImg = $('#avatarImg').val()

        if (inputtitle == '' ||
            inputcoverImg == '' ||
            inputuser == '' ||
            inputavatarImg == '' ||
            inputpost == '<p><br></p>'
        ) {
            console.log('Faltan datos obligatorios')
            return
        }

        function getDate() {
            let yourDate = new Date()
            const offset = yourDate.getTimezoneOffset()
            yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
            return yourDate.toISOString()
        }
        let newPostObject = {
            title: inputtitle,
            coverImg: inputcoverImg,
            user: inputuser,
            content: inputpost,
            date: getDate(),
            avatarImg: inputavatarImg,
            tags: tags,
            //minRead: ' ',
        }
        createPost(newPostObject)
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
})
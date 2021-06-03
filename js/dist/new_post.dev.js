"use strict";

var createPost = function createPost(objpost) {
  var newpost;
  return regeneratorRuntime.async(function createPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap($.post('https://desafio-js-54653-default-rtdb.firebaseio.com/posts.json', JSON.stringify(objpost)));

        case 3:
          newpost = _context.sent;
          newpost.name ? window.location.pathname = '/' : '';
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var quill;
$(document).ready(function () {
  console.log('ready');
  $('#btn__create--post').click(function (event) {
    event.preventDefault(); // sentencias

    var inputtitle = $('#title').val();
    var inputcoverImg = $('#coverImg').val(); //let inputminRead = parseInt($('#minRead').val())

    var inputuser = $('#user').val(); //let inputdate = $('#date').val()

    var inputpost = quill.root.innerHTML;
    var tags = $('#tags').val();
    var inputavatarImg = $('#avatarImg').val();

    if (inputtitle == '' || inputcoverImg == '' || inputuser == '' || inputavatarImg == '' || inputpost == '<p><br></p>') {
      console.log('Faltan datos obligatorios');
      return;
    }

    function getDate() {
      var yourDate = new Date();
      var offset = yourDate.getTimezoneOffset();
      yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
      return yourDate.toISOString();
    }

    var newPostObject = {
      title: inputtitle,
      coverImg: inputcoverImg,
      user: inputuser,
      content: inputpost,
      date: getDate(),
      avatarImg: inputavatarImg,
      tags: tags //minRead: ' ',

    };
    createPost(newPostObject);
  });
  var toolbarOptions = [['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'], [{
    'header': 1
  }, {
    'header': 2
  }], // custom button values
  [{
    'list': 'ordered'
  }, {
    'list': 'bullet'
  }], [{
    'script': 'sub'
  }, {
    'script': 'super'
  }], // superscript/subscript
  [{
    'indent': '-1'
  }, {
    'indent': '+1'
  }], // outdent/indent
  [{
    'direction': 'rtl'
  }], // text direction
  [{
    'size': ['small', false, 'large', 'huge']
  }], // custom dropdown
  [{
    'header': [1, 2, 3, 4, 5, 6, false]
  }], [{
    'color': []
  }, {
    'background': []
  }], // dropdown with defaults from theme
  [{
    'font': []
  }], [{
    'align': []
  }], ['clean'] // remove formatting button
  ];

  if ($('#editor').length > 0) {
    quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions
      }
    });
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
  });
});
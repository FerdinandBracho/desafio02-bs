"use strict";

var quill;
$(document).ready(function () {
  var myHashStr1 = window.location.search;
  myHashStr1 = myHashStr1.slice(myHashStr1.search("=") + 1);
  console.log(myHashStr1);

  var printPostFetch = function printPostFetch() {
    var post, title, coverImg, user, content, tags, avatarImg;
    return regeneratorRuntime.async(function printPostFetch$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap($.get("https://desafio-js-54653-default-rtdb.firebaseio.com/posts/".concat(myHashStr1, ".json")));

          case 3:
            post = _context.sent;

            if (post !== null) {
              title = post.title, coverImg = post.coverImg, user = post.user, content = post.content, tags = post.tags, avatarImg = post.avatarImg;
              $('#title').val(title);
              $('#coverImg').val(coverImg);
              $('#user').val(user);
              quill.root.innerHTML = content;
              $('#tags_tag').val(tags);
              $('#avatarImg').val(avatarImg);
              console.log(tags);
            }

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

  function editPost(objEditedPost) {
    var req;
    return regeneratorRuntime.async(function editPost$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('hola', myHashStr1);
            _context2.prev = 1;
            _context2.next = 4;
            return regeneratorRuntime.awrap($.ajax({
              url: "https://desafio-js-54653-default-rtdb.firebaseio.com/posts/".concat(myHashStr1, ".json"),
              method: 'PUT',
              dataType: "json",
              data: JSON.stringify(objEditedPost)
            }));

          case 4:
            req = _context2.sent;
            console.log(req);
            req.name ? window.location.pathname = '/' : '';
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 9]]);
  }

  printPostFetch();
  $('#btn__edit--post').click(function (event) {
    event.preventDefault();
    var inputtitle = $('#title').val();
    var inputcoverImg = $('#coverImg').val(); //let inputminRead = parseInt($('#minRead').val())

    var inputuser = $('#user').val(); //let inputdate = $('#date').val()

    var inputavatarImg = $('#avatarImg').val();
    var inputpost = quill.root.innerHTML;
    var tags = "";
    var arraytags = $('.tag-text');

    for (var i = 0; i < arraytags.length; i++) {
      tags += $(arraytags[i]).text() + ",";
      console.log(arraytags[i]);
      console.log(arraytags[i].innerText);
    }

    tags = tags.slice(0, -1);

    if (inputtitle == '' || inputcoverImg == '' || inputuser == '' || inputavatarImg == '' || inputpost == '<p><br></p>') {
      console.log('Faltan datos obligatorios');
      return;
    }

    var editedPost = {
      title: inputtitle,
      coverImg: inputcoverImg,
      user: inputuser,
      content: inputpost,
      date: new Date(),
      avatarImg: inputavatarImg,
      tags: tags //minRead: ' ',

    };
    console.log(tags);
    console.log(editedPost);
    editPost(editedPost);
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
"use strict";

var btn = document.querySelector('#test');
var result = '';
btn.addEventListener('click', function () {
  var post = {
    title: 'Introducing Regcode - Create Regular Expressions Easily with Code',
    tags: 'js,test,Begginers',
    coverImg: 'https://picsum.photos/500/200',
    user: 'Ferdinand Bracho',
    date: new Date(),
    minRead: '',
    content: 'lkjasndkjansdjknasjndasdfsdfsdfsdfsdfd'
  };

  var sendTest = function sendTest() {
    return regeneratorRuntime.async(function sendTest$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              fetch('https://desafio-js-54653-default-rtdb.firebaseio.com/posts.json', {
                method: 'POST',
                body: JSON.stringify(post)
              }).then(function (res) {
                return res.json();
              }).then(function (response) {
                console.log(response);
              });
            } catch (error) {
              console.log(error);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  sendTest();
});
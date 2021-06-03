"use strict";

var btn = document.querySelector('#test');
var result = ''; // 'yyyy-mm-ddtttt'.substring(0,10)

btn.addEventListener('click', function () {
  var post = {
    title: 'pruba de ultimo post yairrrrrrrr',
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
}); // ? ///////////////////////////////////////////////////

var insertPostData = function insertPostData(title, tags, coverImg, user, date, avatarImg, singlePostHash) {
  try {
    console.log(singlePostHash);
    var formatDate = date.substring(0, 10);
    var arrTags = '';
    tags.split(',').forEach(function (tag) {
      return arrTags += '#' + tag + ' ';
    });
    var data = " \n        <li class=\"card my-3\">\n        <img src=\"".concat(coverImg, "\" class=\"card-img-top\" alt=\"post-img\">\n        <div class=\"card-body\">\n            <div class=\"d-flex avatar-info\">\n                <img src=\"").concat(avatarImg, "\" alt=\"avatar-img\">\n                <div class=\"ms-2 d-flex flex-column name-info\">\n                    <small>").concat(user, "</small>\n                    <small>").concat(formatDate, "</small>\n                </div>\n            </div>\n            <a href=\"post.html?post-hash=").concat(singlePostHash, "\" class=\"p-title\"><h3 class=\"card-title my-3 text-wrap\">").concat(title, "</h3></a>\n            <small class=\"card-text p-hashtags\">").concat(arrTags, "</small>\n            <div class=\"d-flex justify-content-end align-items-center\">\n                <small class=\"\">5 min read</small>\n                <button type=\"button\" class=\"btn btn-light mx-1\">save</button>\n            </div>\n        </div>  \n        </li>       \n        ");
    document.querySelector('.posts-ul').innerHTML += data;
  } catch (error) {
    console.log(error);
  }
};

var insertVariousPostData = function insertVariousPostData(title, tags, user, date, avatarImg, singlePostHash) {
  try {
    console.log(singlePostHash);
    var formatDate = date.substring(0, 10);
    var arrTags = '';
    tags.split(',').forEach(function (tag) {
      return arrTags += '#' + tag + ' ';
    });
    var data = " \n        <li class=\"card my-3\">\n        <div class=\"card-body\">\n            <div class=\"d-flex avatar-info\">\n                <img src=\"".concat(avatarImg, "\" alt=\"avatar-img\">\n                <div class=\"ms-2 d-flex flex-column name-info\">\n                    <small>").concat(user, "</small>\n                    <small>").concat(formatDate, "</small>\n                </div>\n            </div>\n            <a href=\"post.html?post-hash=").concat(singlePostHash, "\" class=\"p-title\"><h3 class=\"card-title my-3 text-wrap\">").concat(title, "</h3></a>\n            <small class=\"card-text p-hashtags\">").concat(arrTags, "</small>\n            <div class=\"d-flex justify-content-end align-items-center\">\n                <small class=\"\">5 min read</small>\n                <button type=\"button\" class=\"btn btn-secondary mx-1\">save</button>\n            </div>\n        </div>  \n        </li>       \n        ");
    document.querySelector('.posts-ul').innerHTML += data;
  } catch (error) {
    console.log(error);
  }
}; // ? ///////////////////////////////////////////////////////////////////////////


var getAllPost = function getAllPost() {
  return regeneratorRuntime.async(function getAllPost$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch('https://desafio-js-54653-default-rtdb.firebaseio.com/posts/.json').then(function (res) {
            return res.json();
          }).then(function (response) {
            console.log(response);
            arrPost = Object.entries(response);
            arrPost.reverse();
            var firstPost = arrPost.shift();
            console.log(firstPost);
            var postHash = firstPost[0];
            console.log(postHash);
            var _firstPost$ = firstPost[1],
                title = _firstPost$.title,
                tags = _firstPost$.tags,
                coverImg = _firstPost$.coverImg,
                user = _firstPost$.user,
                date = _firstPost$.date,
                minRead = _firstPost$.minRead,
                avatarImg = _firstPost$.avatarImg;
            insertPostData(title, tags, coverImg, user, date, avatarImg, postHash);
            arrPost.forEach(function (item) {
              var postsHash = item[0];
              console.log(postsHash);
              var _item$ = item[1],
                  title = _item$.title,
                  tags = _item$.tags,
                  user = _item$.user,
                  date = _item$.date,
                  minRead = _item$.minRead,
                  avatarImg = _item$.avatarImg;
              insertVariousPostData(title, tags, user, date, avatarImg, postsHash);
            });
          }));

        case 3:
          _context2.next = 8;
          break;

        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

getAllPost();
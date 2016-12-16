const STEIN_URL = getUrl();

$(document).ready(()=>{
  let parsedQuery = parseQueryString(window.location.search);
  getUserByID(parsedQuery.id)
  .then(addUserInfoToPage)
  .then(getSteins)
  .then(addSteinsToPage)
  .catch(someError);
});

function getUserByID(id) {
  return $.get(`${STEIN_URL}/user/${id}`);
}

function parseQueryString(query) {
  let queryArr = query.slice(1, query.length).split('&');
  var catcher = [];
  var queryObj = {};
  for(var i = 0; i < queryArr.length; i++) {
    catcher.push(queryArr[i].split('='));
  }
  catcher.forEach(function(index) {
    queryObj[index[0]] = index[1];
  });
  return queryObj;
}

function addUserInfoToPage(user) {
  let source = $('#user-template').html();
  let template = Handlebars.compile(source);
  let context = user;
  let html = template(context);
  $('#user-info').html(html);
  return user.id;
}

function getSteins (id) {
  return $.get(`${STEIN_URL}/user/${id}/stein`);
}

function addSteinsToPage(steins) {
  // console.log(steins[0].image_url);
  let source = $('#stein-img').html();
  let template = Handlebars.compile(source);
  let context = {steins};
  let html = template(context);
  $('#stein-info').html(html);
  return steins.id;
};

function getUrl(){
  if (window.location.host.indexOf('localhost') != -1) {
    return 'http://localhost:3000';
  } else {
    return 'https://steinify-61f9a.firebaseapp.com';
  }
};

function someError(){
  alert('no dice');
}

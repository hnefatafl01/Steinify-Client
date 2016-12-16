const STEIN_URL = 'http://localhost:3000';

$(document).ready(()=>{
  let parsedQuery = parseQueryString(window.location.search);
  getUserByID(parsedQuery.id);
});

function getUserByID(id) {
  $.get(`${STEIN_URL}/user/${id}`,function(data){
    console.log(data);
  });
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

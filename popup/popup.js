$(function () {
  // theoretically, this is called every time the user clicks on the popup
  var dateConvert = function (dateobj){
    var year = dateobj.getFullYear();
    var month= ('0' + (dateobj.getMonth()+1)).slice(-2);
    var date = ('0' + dateobj.getDate()).slice(-2);
    var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    return (year + "-" + months[parseInt(month)-1] + "-" + date);
  }


  // Transition to localhost:3000 to see the webpage part
  $('.clickme').click(function() {
   chrome.tabs.create({url: $(this).attr('href')});
  });
  
  // Get the scores of the given game
  var getScores = function (gameID) {
    $.ajax({
      url: 'https://api.fantasydata.net/nhl/v2/JSON/BoxScore/' + gameID + '?',
      beforeSend: function(xhrObj){
      // Request headers
      xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key','96f3fa334d4147039f3fc54c80bf2b54');
    },
    type: "GET",
      // Request body
      data: "{body}",
    })
    .done(function(data) {
      var homeScore = data.Game.HomeTeamScore;
      var awayScore = data.Game.AwayTeamScore;
      if (!homeScore) {
        homeScore = 0;
      }
      if (!awayScore) {
        awayScore = 0;
      }
      document.getElementById('homescore').innerHTML = homeScore;
      document.getElementById('awayscore').innerHTML = awayScore;
    })
    .fail(function() {
      alert("error");
    });
  }

  var date = dateConvert(new Date());
  $.ajax({
    url: 'https://api.fantasydata.net/nhl/v2/JSON/GamesByDate/' + date + '?',
    beforeSend: function(xhrObj){
      // Request headers
      xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key','96f3fa334d4147039f3fc54c80bf2b54');
    },
    type: 'GET',
    // Request body
    data: '{body}',
  })
  .done(function(data) {
    var awayTeam = '';
    var homeTeam = '';
    awayTeam = data[0].AwayTeam;
    homeTeam = data[0].HomeTeam;
        
    // this is supposed to update the html based on the data recieved from the API
    document.getElementById('awayteam').innerHTML = awayTeam;
    document.getElementById('hometeam').innerHTML = homeTeam;
    // get the scores    
    getScores(data[0].GameID);

      })
  .fail(function() {
    alert('error');
  });
});


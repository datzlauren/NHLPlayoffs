var Game = function (gameID, homeTeam, homeScore, awayTeam, awayScore) {
  this.gameID = gameID;
  this.homeTeam = homeTeam;
  this.homeScore = homeScore;//8 for testing purposes
  this.awayTeam = awayTeam;
  this.awayScore = awayScore;//8
}

var games = [];

var APIPoll = function () {
  
};

// convert the date into the format needed by the API
var dateConvert = function (dateobj){
  var year = dateobj.getFullYear();
  var month= ('0' + (dateobj.getMonth()+1)).slice(-2);
  var date = ('0' + dateobj.getDate()).slice(-2);
  var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  return (year + "-" + months[parseInt(month)-1] + "-" + date);
}
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
    console.log(data);
    // check if the game is already in the games array
    var i = 0;
    if (games.length !== 0) {
    for (i = 0; i < games.length; i++) {
      if (games[i].gameID === data.Game.GameID) {
        if (games[i].homeScore !== data.Game.HomeTeamScore) {
          games[i].homeScore = data.Game.HomeTeamScore;
          alert(games[i].homeTeam + ' SCORED! \n Score is now ' + games[i].homeTeam + ': ' + 
            games[i].homeScore + '\n' + games[i].awayTeam + ': ' + games[i].awayScore);
        }
        if (games[i].awayScore !== data.Game.AwayTeamScore) {
          games[i].awayScore = data.Game.AwayTeamScore;
          alert(games[i].awayTeam + ' SCORED! \n Score is now ' + games[i].homeTeam + ': ' + 
            games[i].homeScore + '\n' + games[i].awayTeam + ': ' + games[i].awayScore);
        }
        break;
      }
    }
    if (i === games.length - 1) {
      var game = new Game(data.Game.GameID, data.Game.HomeTeam, 
      data.Game.HomeTeamScore, data.Game.AwayTeam, data.Game.AwayTeamScore);
      games.push(game);
    }
  } else {
    var game = new Game(data.Game.GameID, data.Game.HomeTeam, 
      data.Game.HomeTeamScore, data.Game.AwayTeam, data.Game.AwayTeamScore);
    games[0] = (game);
    console.log(game);

  }
    // get the scores periodically
    setTimeout(function () {
      getScores(data.Game.GameID)
    },10000);
  })
  .fail(function() {
    alert("error");
  });
}

// find the game IDs of the games in progress
var getGames = function () {
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
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].GameID);
        getScores(data[i].GameID);
      }
    })
    .fail(function() {
      alert('error');
    });
}
APIPoll.prototype.poll = function () {
  setTimeout(getGames, 5000);
}


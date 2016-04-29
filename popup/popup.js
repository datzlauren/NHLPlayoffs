$(function () {
  // theoretically, this is called every time the user clicks on the popup
    // THIS WORKS: setting the home team data using a variable.
  var homeTeam = 'DAL';
  document.getElementById("hometeam").innerHTML = homeTeam;
  
  
  // Transition to localhost:3000 to see the webpage part
  $('.clickme').click(function() {
   chrome.tabs.create({url: $(this).attr('href')});
  });

  // test to see if we can modify things based on the API
  // THIS IS WHAT IS NOT WORKING
  var awayTeam = '';
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
          /*for (var i = 0; i < data.length; i++) {
            console.log(data[i].GameID);
            getScores(data[i].GameID);
          }
        })*/
        // dummy call setting the variable to be the game id.
        awayTeam = data[0].GameID;
      })
  .fail(function() {
    alert('error');
  });
  // this is supposed to update the html based on the data recieved from the API
  document.getElementById("awayteam").innerHTML = awayTeam;

  
});


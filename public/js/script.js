
/* Helper Methods used since API calls were rejected */
var articles = [ {headline: 'Anaheim fires head coach Bruce Boudreau',
 link: 'http://www.rotoworld.com/player/nhl/3880/bruce-boudreau'}, 
 {headline: 'T.J. Oshie\'s hat trick to lift Caps over Pens',
  link: 'http://www.rotoworld.com/player/nhl/2144/tj-oshie'}, 
  {headline: 'Brooks Orpik expected to play in Game 1', 
  link: 'http://www.rotoworld.com/player/nhl/1239/brooks-orpik'}, 
  {headline: 'Orpik will be a game-time decision Thursday', 
   link: 'http://www.rotoworld.com/player/nhl/1239/brooks-orpik'}];

var ind = -1;
var getHeadline = function () {
  ind++;
  return articles[ind].headline;
}
var getLink = function () {
  var toReturn = articles[ind].link;
  if (ind === articles.length - 1) {
  	ind = -1;
  }
  return toReturn;
  
}
var s1 = 0;
var s2 = 0;
var s3 = 0;
var s4 = 0;
var score1 = function () {
	//return inc;
	var p = Math.random();
	if (p < 0.1) {
		return s1++;
	} else {
		return s1;
	}
}
var score2 = function () {
	//return inc;
	var p = Math.random();
	if (p < 0.1) {
		return s2++;
	} else {
		return s2;
	}
}
var score3 = function () {
	//return inc;
	var p = Math.random();
	if (p < 0.2) {
		return s3++;
	} else {
		return s3;
	}
}
var score4 = function () {
	//return inc;
	var p = Math.random();
	if (p < 0.15) {
		return s4++;
	} else {
		return s4;
	}
}

// React classes
var Articles = React.createClass({
  render: function() {
    return (
      <div>
        <p>{this.props.headline}</p>
        <a href={this.props.link} class="articlelink">Read More!</a>
      </div>
    );
  }
});

var HelloWorld = React.createClass({
  render: function() {
    return (
      <p>
        Hello, <input type="text" placeholder="Your name here" />!
        It is {this.props.date}
      </p>
    );
  }
});

var Score = React.createClass({
render: function() {
    return (<p>{this.props.score}</p>
      );
  }
});

// Calls to update the elements

setInterval(function () {
  ReactDOM.render(<Score score={score1()} />,
  document.getElementById('homescore1')); }, 2000);

setInterval(function () {
  ReactDOM.render(<Score score={score2()} />,
  document.getElementById('awayscore1')); }, 2000);

setInterval(function () {
  ReactDOM.render(<Score score={score3()} />,
  document.getElementById('homescore2')); }, 2000);

setInterval(function () {
  ReactDOM.render(<Score score={score4()} />,
  document.getElementById('awayscore2')); }, 2000);

setInterval(function () {
  ReactDOM.render(
    <Articles headline={getHeadline()} link={getLink()} />,
    document.getElementById('news0')
  );
}, 5000);

/* ATTEMPTS TO USE API
rejected
var poll = function () {
    var headline = '';
    $.ajax({
            url: 'https://api.fantasydata.net/nhl/v2/JSON/GamesByDate/2016-APR-29',
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","96f3fa334d4147039f3fc54c80bf2b54");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            headline = data[0].GameID;
        })
        .fail(function() {
            alert("error");
        });
        return headline;
}*/

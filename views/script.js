
var poll = function () {
    var headline = '';
    $.ajax({
            url: "https://api.fantasydata.net/nhl/v2/JSON/NewsByDate/2016-APR-29?",
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","96f3fa334d4147039f3fc54c80bf2b54");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            headline = data;
        })
        .fail(function() {
            alert("error");
        });
        return headline;
}
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

setInterval(function() {
  ReactDOM.render(
    <HelloWorld date={poll()} />,
    document.getElementById('example')
  );
}, 5000);
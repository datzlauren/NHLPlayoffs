var React = require('react');
var ReactDOM = require('react-dom');
/*var pullData = function () {

}*/

// tutorial1.js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
console.log(CommentBox);
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
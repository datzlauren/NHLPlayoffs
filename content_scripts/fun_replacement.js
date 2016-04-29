var internetRegex = /\bpenguin/ig;

var replaceText = function ($matchingTextNodes) {
  $matchingTextNodes.replaceWith(function () {
    return $(this).text().replace(internetRegex,
        '<span class="worst-thing-ever">worst thing ever</span>');
  });
};
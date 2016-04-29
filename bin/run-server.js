#!/usr/bin/env node
console.log('bye');
    var app = require('../app');
    console.log('bye');
    app.set('port', process.env.PORT || 3000);

    var server = app.listen(app.get('port'), function () {
      console.log('Express server listening on port %d', server.address().port);
});

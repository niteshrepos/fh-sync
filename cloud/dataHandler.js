var collisions = {};

exports.doList = function(dataset_id, params, cb) {
  console.log("doList : ", dataset_id, " :: ", params);

  $fh.db({
    "act": "list",
    "type": dataset_id
  }, function(err, res) {
    
    console.log( "a lot of response testing", res)
    if (err) return cb(err);

    var resJson = {};

    for (var di = 0, dl = res.list.length; di < dl; di += 1) {
      resJson[res.list[di].guid] = res.list[di].fields;
    }

    if( params && params.syncDelay && !isNaN(params.syncDelay) ) {
      // Simulate a delay with list operation
      setTimeout(function() {
        console.log("if", resJson)
        return cb(null, resJson);
      }, (params.syncDelay * 1000))
    }
    else {
      console.log("else", resJson)
      return cb(null, resJson);
    }
  });
};

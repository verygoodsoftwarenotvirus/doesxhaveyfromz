module.exports = function(app){
  app.get('/api/autocompletes', function(req, res, next) {
  	app.db.query('select distinct x, y, z from inquiries', [], function(err, result){
			if( err ){ return res.status(500).json({ error: err }) }
			res.status(200).json(result.rows)
  	});
	});

  // inquiries
  app.get('/api/search', function(req, res){
    // this whole route is clevergirl.gif

    if( Object.keys(req.query).length < 1 ){
      return res.status(500).json({error: 'no search parameters set!'});
    }

    var paramsToAdd = [];
    var queryString = 'select * from inquiries where ';
    var index = 1;

    for( var query in req.query ){
      if( req.query[query].toLowerCase != 'any' && req.query[query].trim() != '' ){
        queryString += query + '=$' + index + ' and ' ;
        index += 1;
        paramsToAdd.push(req.query[query]);
      }
    }

    queryString = queryString.substr(0, queryString.lastIndexOf(' and '));

    // I feel super clever and also super bad?????
    app.db.query(queryString, paramsToAdd, function(err, result){
      if( err ){ return res.status(500).json({ error: err }) }
      return res.status(200).json(result.rows)
    });
  });

  app.post('/api/create_inquiry', function(req, res){
    app.db.query('insert into inquiries () values ()', [], function(err, result){
      if( err ){ return res.status(500).json({ error: err }); }
    })
  });
}

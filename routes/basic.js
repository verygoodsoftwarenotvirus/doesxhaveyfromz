module.exports = function(app){
  app.get('/', function(req, res, next) {
    res.render('index', { user: req.user });
  });

  app.get('/unanswered', function(req, res, next) {
    res.render('unanswered');
  });

  app.get('/search', function(req, res, next) {
    res.render('search');
  });

  app.get('/answer/:id', function(req, res, next) {
    if( !req.user ){
      res.render('index');
    } else {
      res.render('submit-answer');
    }
  });

  app.get('/inquiry/:id', function(req, res){
    res.render('inquiry');
  })
}

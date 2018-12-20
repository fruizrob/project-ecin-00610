const express = require('express')
const next = require('next')
const config = require('./config.json');
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const Pg  = require('pg');
const ConnectPg = require('connect-pg-simple');
const Session = require('express-session');
const CookieParser = require('cookie-parser');
const apiRoutes = require('./api/api');

app.prepare().then(() => {
  const server = express()
  const pgSession = ConnectPg(Session);
  server.use(CookieParser());
  server.use(Session({
    store: new pgSession({
      pg: Pg,
      conString: config.dbUri,
      tableName: 'session',
      schemaName: 'public',
    }),
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {httpOnly: true, secure: false}
  }));
  server.use('/api' ,apiRoutes); // is authenticated

  server.get('/', (req, res) => {
    return app.render(req, res, '/index')
  })

  server.get('/login', (req,res) => {
    return app.render(req, res, '/login')
  });

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
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
const authRoutes = require('./api/auth.js');
const user = require('./models/user.js');
const Passport = require('passport');

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

  server.use(bodyParser.urlencoded({ extended: false }));
    // Pass the passport middleware
  server.use(Passport.initialize());
  server.use(Passport.session());

  // Load passport strategies
  Passport.use(user.createStrategy());
  Passport.serializeUser(user.serializeUser());
  Passport.deserializeUser(user.deserializeUser());

  const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();

  }

  res.status(401).json({
      error: 'Unauthorized access',
      message: 'User must be logged to access the specified URI'
    });
  };

  server.use('/api' ,isAuthenticated, apiRoutes); // is authenticated
  server.use('/auth', authRoutes);

  function requireRole(role) {
    return function (req, res, next) {
      if (req.isAuthenticated() && req.user.user_type_id === role) {
        next();
      } else {
        res.redirect('/'); 
      }
    }
  }

  function isLoggedIn() {
    return function (req, res, next) {
      if (!req.isAuthenticated()) {
        next();
      } else {
        res.redirect('/');
      }
    }
  }

  function reserveAndPayPermissions(){
    return function (req, res, next) {
      if (req.isAuthenticated() && (req.user.user_type_id === "AD" || req.user.user_type_id === "RC" || req.user.user_type_id === "US")) {
        next();
      } else {
        res.redirect('/');
      }
    }
  }

  server.get("/admin", requireRole("AD"), (req, res) => {
    return app.render(req, res, '/admin')
  });

  server.get("/user", requireRole("US"), (req, res) => {
    return app.render(req, res, '/user')
  });

  server.get("/user-reservation", requireRole("US"), (req, res) => {
    return app.render(req, res, '/user-reservation')
  });

  server.get("/personal-toilet", requireRole("PT"), (req, res) => {
    return app.render(req, res, '/')
  });

  server.get("/admin-reception", requireRole("RC"), (req, res) => {
    return app.render(req, res, '/admin-reception')
  });

  server.get("/restaurant-spa", requireRole("RS"), (req, res) => {
    return app.render(req, res, '/')
  });

  server.get("/login", isLoggedIn(), (req, res) => {
    return app.render(req, res, '/login')
  });

  server.get("/register", isLoggedIn(), (req, res) => {
    return app.render(req, res, '/register')
  });

  server.get("/reserve", reserveAndPayPermissions(), (req, res) => {
    return app.render(req, res, '/reserve')
  });

  server.get("/register-payment", reserveAndPayPermissions(), (req, res) => {
    return app.render(req, res, '/register-payment')
  });


  server.get('/', (req, res) => {
    return app.render(req, res, '/')
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
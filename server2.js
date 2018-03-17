const express = require('express');
const bodyParser = require('body-parser');
const OktaJwtVerifier = require('@okta/jwt-verifier');
//var cors = require('cors');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-900308.com/oauth2/default',
  asertClaims: {
    aud: 'api://default',
  },
});

function authenticationRequired(req,res,next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    return res.status(401).end();
  }

  const accessToken = match[1];
  return oktaJwtVerifier.verifyAccessToken(accessToken)
  .then ((jwt) => {
    req.jwt = jwt;
    next();
  })
  .catch((err) => {
    res.status(401).send(err.message);
  });
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

app.get('/secure', authenticationRequired, (req,res) => {
  res.json(req.jwt);
});

app.get('/api/messages', authenticationRequired, (req,res) => {
  res.json([{
    message: 'Hello,world!'
  }]);
});
app.listen(3000, () => {
  console.log('Serve Ready on port 3000');
});

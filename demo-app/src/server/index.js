const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fiwareiota = require('fiware-iota');
const pck = require('../../package.json');

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());

// get the app version
app.get('/version', (req, res) => {
  fiwareiota.getNodeInfo().then((result) => {
    const response = result;
    response.app_name = pck.name;
    response.app_version = pck.version;
    res.send(response);
  }).catch((err) => {
    const response = err;
    response.app_name = pck.name;
    response.app_version = pck.version;
    res.send(response);
  });
});

// upload the data when the notification received
app.post('/notification', (req, res) => {
  const encode = Buffer.from(JSON.stringify(req.body.data)).toString('base64');
  fiwareiota.createMamTransaction(encode).then((result) => {
    fs.writeFile('./iota_log.json', JSON.stringify(result, null, 4), (err) => {
      if (err) { console.error(err); }
    });
    res.status(204).send(result);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// get all the data for local hash collection
app.get('/getAllLogs', (req, res) => {
  const data = fs.readFileSync('./iota_log.json', 'utf8');
  if (!data) {
    res.status(500).send('unbale to find');
  }
  res.status(200).send(data);
});

// fetch the data of a speicific hash
app.get('/getData/:hash', (req, res) => {
  fiwareiota.fetchMamTransaction(req.params.hash, 'public', null, (result) => {
    let response = fiwareiota.decodeMessage(result);
    response = JSON.parse(Buffer.from(response, 'base64').toString('ascii'));
    res.status(200).send(response);
  });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

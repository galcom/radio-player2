const express = require('express');
const fetch = require("node-fetch");
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const base64=require('base-64');
const {DOMParser} = require("xmldom");
const xmlToJson = require('xmltojson');

console.log("server start");

//hack to make xmltoJSON work on Node
xmlToJson.stringToXML = (string) => new DOMParser().parseFromString(string, 'text/xml');

const storagePrefix = "https://galcomstorage.blob.core.windows.net/app-data";

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/stationList', function (req, res) {
  const username="admin";
  const password ="Galcom1995";
  const url = "http://138.197.152.25:8000/admin/stats";

  fetch(url, {
            method:'GET', 
            headers: {'Authorization': 'Basic ' + base64.encode(username+":"+password)},
         })
        .then((result) => result.text())
        .then((data) =>{
            //console.log("station list result: ",data);
            const stationList = xmlToJson.parseString(data);
            console.log("json station list: ",stationList.icestats[0].source);
            const stations = stationList.icestats[0].source.map((source) =>{
              return {
                url: source.listenurl[0]._text,
                name: source.server_name[0]._text,
                type: source.server_type[0]._text
              }
            })

            console.log("statsion: ",stations);
            
            res.contentType("application/json");
            res.send(stations);


        });
 

});

app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log("listening...");
app.listen(process.env.PORT || 8080);

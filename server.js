const express = require('express');
const fetch = require("node-fetch");
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
console.log("server start");

const storagePrefix = "https://galcomstorage.blob.core.windows.net/app-data";

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/manifest', function (req, res) {
  console.log("manifest called");

  const station = (req.query.station || (req.body && req.body.station));
  console.log("station: "+station);
  var manifest= {
      "short_name": station,
      "name": station,
      "icons": [
          {
          "src": "/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
          },
          {
          "src": "/android-chrome-256x256.png",
          "sizes": "256x256",
          "type": "image/png"
          }
      ],
      "start_url": "/?station="+station,
      "display": "standalone",
      "theme_color": "#000000",
      "background_color": "#ffffff"
      };

    res.setHeader("Content-Type","application/json");
      fetch(`${storagePrefix}/stations/${station}/manifest.json`).
          then(res => res.json()). 
          then(data =>{

            //adjust paths for icons
            if(data.icons != null){
              data.icons.forEach(icon => {
                if(icon.src != null){
                  icon.src = `${storagePrefix}/${icon.src}`;
                }
              })
            }
            res.send(data)
          }).
          catch(error =>{
            console.warn("failed to fetch custom manifest for "+station+", using default manifest");
            res.send(manifest);
          });
    


});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log("listening...");
app.listen(process.env.PORT || 8080);

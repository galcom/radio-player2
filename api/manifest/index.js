module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const station = (req.query.station || (req.body && req.body.station));
    var manifest= {
        "short_station": station,
        "station": station,
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

    try{
        manifest = await (
            fetch(`https://galcomstorage.blob.core.windows.net/app-data/stations/${station}/manifest.json`).
                then(res => res.json()));
    }catch(error){
        context.warn("failed to fetch custom manifest for "+station+", using default manifest");
    }


    context.res = {
        // status: 200, /* Defaults to 200 */
        //body: responseMessage
        body: manifest
    };
}
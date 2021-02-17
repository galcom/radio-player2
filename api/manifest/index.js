module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
    const manifest = {
        "short_name": name,
        "name": name,
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
        "start_url": "/?station="+name,
        "display": "standalone",
        "theme_color": "#000000",
        "background_color": "#ffffff"
        };



    context.res = {
        // status: 200, /* Defaults to 200 */
        //body: responseMessage
        body: manifest
    };
}
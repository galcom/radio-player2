import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(<App />, document.getElementById('root'));

//TEMPORARY enable this to clear old caches
//caches.keys()
//    .then((names) =>{
//        console.log("cache keys: ",names);
//        for (let name of names) {
//            console.log("deleting cache "+name);
//            caches.delete(name);
//
//        }
//
//    })
serviceWorker.register();

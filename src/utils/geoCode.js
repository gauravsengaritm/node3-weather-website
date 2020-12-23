const request = require('postman-request');

const geoCode = (address,callback)=>{
    const mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiZ2F1cmF2c2VuZ2FyIiwiYSI6ImNrZ2d0cHJoMjAxcmcyd2wyem1hNWwxNzEifQ.JyDzWEwJHmTLmuiZNPgmRQ";
    request({url:mapboxUrl,json:true},(error,responce)=>{

        if(error){
            callback('Error occured during fatching data', undefined)
        }else if (responce.body.features.length===0){
            callback('record not found for address = '+address, undefined)
        }else{
            //console.log(responce.body);
            callback(undefined,{
                latitute:responce.body.features[0].center[0],
                longitude:responce.body.features[0].center[1],
                location:responce.body.features[0].place_name
            })
        }
    });
}

module.exports = geoCode;
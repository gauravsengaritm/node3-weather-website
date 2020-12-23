const request = require('postman-request');
const forecast = (latitude,longitude,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=5be5b7a5bf8cddad959780e6ecdfd306&query=India&query='+latitude+','+longitude+'&units=f';
    //console.log(url);
    request({'url':url,json:true},(error,responce)=>{
        if(error){
            callback('Error occured during fatching data', undefined)
        }else if(responce.body.error){
            callback('Error occured during fatching data', undefined)
        }else{
            const data = responce.body;
            callback(undefined , {observation_time:data.current.observation_time});
        }
    })
}

module.exports=forecast;
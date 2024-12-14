const axios=require('axios');
const captainModel=require('../models/captain.model')
module.exports.getAddressCoordinates=async(address)=>{
    console.log(address)
    const apiKey = process.env.GOOGLE_MAP_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng,
            };
        } else if (response.data.status === 'ZERO_RESULTS') {
            console.error('No results found for the provided address.');
            throw new Error('No results found for the provided address.');
        } else {
            console.error('Error in Google Maps API response:', response.data.status);
            throw new Error(`Error: ${response.data.status}`);
        }
    } catch (err) {
        console.error('Error fetching coordinates:', err.message);
        throw err;
    }
}


module.exports.getDistanceTime=async(origin,destination)=>{
    if(!origin||!destination){
        throw new error('Origin annd destination are required')
    }

    const apiKey=process.env.GOOGLE_MAP_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try{
        const response=await axios.get(url);
        if(response.data.status==='OK'){
            if(response.data.rows[0].elements[0].status==='ZERO_RESULTS'){
                throw new Error('no routes found')
            }

            return response.data.rows[0].elements[0];
        }
        else{
            throw new Error('unable to fetch distance and time')
        }
    }catch(err){
        console.log(err);
        throw err;
    }
}


module.exports.getAutoCompleteSuggestions=async(input)=>{
 if(!input){
    throw new Error("query required")
 }
 const apiKey=process.env.GOOGLE_MAP_API;
 const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

 try{
    const response=await axios.get(url);
    if(response.data.status==='OK'){
        return response.data.predictions.map(prediction => prediction.description).filter(value => value);
    } else {
        throw new Error('Unable to fetch suggestions');
    }
} catch (err) {
    console.error(err);
    throw err;
}

}




module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

 console.log(ltd,lng)

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}
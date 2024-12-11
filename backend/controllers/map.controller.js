const { validationResult } = require('express-validator');
const { getAddressCoordinates,getDistanceTime ,getAutoCompleteSuggestions} = require('../services/map.service');



module.exports.getCoordinates=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const address =req.query.address;
    console.log(address);
try{
    const coordiantes=await getAddressCoordinates(address);
    console.log(coordiantes);
    return res.status(200).json(coordiantes) 
}
catch(err){
    res.status(404).json({msg:'coordinates not found'})
}
}

module.exports.getDistanceTime=async(req,res)=>{
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;

        const distanceTime = await getDistanceTime(origin, destination);

        res.status(200).json(distanceTime);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        const suggestions = await getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
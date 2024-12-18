import React,{useState} from 'react'

const LocationSearchPanel = ({ suggestion,  setPanelOpen,setVehiclePanel, setPickup, setDestination, activeField,setSuggestions }) => {
const [array,setArray]=useState(suggestion);

    const handleSuggestionClick = (suggestion) => {
        console.log(suggestion)
        if (activeField === 'pickup') {
            setPickup(suggestion)
            setSuggestions([])
        } else if (activeField === 'destination') {
            setDestination(suggestion)
            setSuggestions([])
        }
        // setVehiclePanel(true)
        // setPanelOpen(false)
    }

    return (
        <div className='pt-2 overflow-y-scroll'>
       
        {
            suggestion.map((elem, idx) => (
                <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                    <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                    <h4 className='font-medium'>{elem}</h4>
                </div>
            ))
        }
    </div>
        
    );
};



export default LocationSearchPanel
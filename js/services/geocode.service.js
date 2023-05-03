import { util } from "./map.service.js"

export const geoCode = {
    getCoordsByQuery
}

// function getCoordsByQuery(searchInput) {
//     let search_query = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchInput}&key=${util.API_KEY}`

//     return axios.get(search_query).
//         then(res => {
//             console.log("res", res.data)
//             setLocationData(res.data.results[0])
//         })
//         .catch(err => {
//             console.error("err", err)
//             throw err
//         })
// }

// function setLocationData(place) {
//     // DONE: return an object with:
//     // Save Lat & Lng, save place name & place id
//     const newPlace = {
//         placeName: place['formatted_address'],
//         placeId: place['place_id'],
//         coords: {
//             lat: place.geometry.location.lat,
//             lng: place.geometry.location.lng
//         }
//     }
//     console.log("newPlace", newPlace)
//     return newPlace
// }
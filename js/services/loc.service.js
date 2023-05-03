const STORAGE_KEY = 'locationsDB'
const gSearchKey = 'haifa'

import { storageService } from './async-storage.service.js'
import { util } from './map.service.js'

export const locService = {
    getLocs,
    getPlaceDetails,
    STORAGE_KEY
}


function createLocs(){
    const locs = storageService.query(STORAGE_KEY) || [
        { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
        { name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
    ]
   return locs
}






function _createPlace(id,name, lat, lng, weather, createdAt) {
    return {
        id,
        name,
        lat,
        lng,
        weather,
        createdAt,
        updatedAt: Date.now()
    }
}
getPlaceDetails('bat-yam')

function getPlaceDetails(placeName){
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${placeName},+CA&key=${util.API_KEY}`
    return axios.get(url)
    .then((res) => {
        // let item = {
            // serachValue: gSearchKey,
            // data: res.data
        // }
        return filterInfo(res.data.results[0])
    })
}

function filterInfo(data){
    let filteredInfo = _createPlace(data["place_id"] , data["formatted_address"], data.geometry.location.lat,
    data.geometry.location.lng ,"suuny", 15.20)
    console.log('filteredInfo: ', filteredInfo )
    return filteredInfo
}

function getLocs() {
   const locs = createLocs()
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('locs: ', locs )
            resolve(locs)
        }, 2000)
    })
}



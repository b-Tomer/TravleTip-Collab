import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { geoCode } from './services/geocode.service.js'


window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker(pos) {
    console.log('Adding a marker: ' , pos)
    // mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
    mapService.addMarker(pos)
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

window.onLocationSearch = onLocationSearch
function onLocationSearch() {
    const elSearchInput = document.querySelector('.search-bar')
    const searchInput = elSearchInput.value
    geoCode.getCoordsByQuery(searchInput)
    const API_KEY = 'AIzaSyAaC8_t37idTPsW4-NCvOjZL_TeAyTuDX4'
}


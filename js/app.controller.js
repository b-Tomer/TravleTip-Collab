import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { geoCode } from './services/geocode.service.js'
import { storageService } from './services/async-storage.service.js'

window.onload = onInit
window.onSaveLoc = onSaveLoc
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onLocationSearch = onLocationSearch
window.onRemoveLoc = onRemoveLoc

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

function onSaveLoc(pos) {
    console.log('Adding a marker: ', pos)
    mapService.addMarker(pos)
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            renderLocs(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
                geoCode.getLocationByCoords(pos.coords.latitude,pos.coords.longitude)
                onPanTo(pos.coords.latitude,pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function renderUserLocation() {
    
}

function onPanTo(lat, lng) {
    console.log("lat, lng", lat, lng)
    console.log('Panning the Map')
    mapService.panTo(lat, lng)
}

function onLocationSearch() {
    const elSearchInput = document.querySelector('.search-bar')
    const searchInput = elSearchInput.value
    locService.getPlaceDetails(searchInput).
        then(place => {
            const lat = place.lat
            const lng = place.lng
            mapService.panTo(lat, lng)
            storageService.post(locService.STORAGE_KEY, place)
        })
        elSearchInput.value = ' '
}

function renderLocs(locations) {
    console.log("locations", locations)
    const strHtml = locations.map(place => {
        return `<div class="loc">
        <h3>${place.name}</h3>
        <button onclick="onPanTo(${place.lat},${place.lng}) "class="btn go-btn">Go</button>
        <button onclick="onRemoveLoc('${place.id}')" class="btn remove-btn">❌</button>
        </div>`
    })
    document.querySelector('.locs').innerHTML = strHtml.join('')
}

function onRemoveLoc(placeId) {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            storageService.remove(locService.STORAGE_KEY, placeId)
            renderLocs(locs)
        })
}
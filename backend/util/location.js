const axios = require('axios')

const HttpError = require('../models/http-error')

const API_KEY = 'c50d65a79a771c'

async function getCoordsForAddress(address) {
  // return {
  //   lat: 40.7484474,
  //   lng: -73.9871516
  // }
  const response = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${API_KEY}&q=${encodeURIComponent(address)}&format=json`)

  const data = response.data

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    )
    throw error
  }

  const coordinates = {
    lat: data[0].lat,
    lng: data[0].lon
  }

  return coordinates
}

module.exports = getCoordsForAddress

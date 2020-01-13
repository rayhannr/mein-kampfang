const fs = require('fs')
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const getCoordsForAddress = require('../util/location')
const Place = require('../models/place')
const User = require('../models/user')

const getPlaces = async (req, res, next) => {
  let places
  try {
    places = await Place.find({}).sort({'_id': -1})
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later.',
      404
    )
    return next(error)
  }
  res.json({ places: places.map(place => place.toObject({ getters: true })) })
}

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid

  let place
  try {
    place = await Place.findById(placeId)
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      404
    )
    return next(error)
  }

  if (!place) {
    const error = new HttpError(
      'Could not find place for the provided id.',
      404
    )
    return next(error)
  }

  res.json({ place: place.toObject({ getters: true }) })
}

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid

  // let places
  let places
  try {
    places = await Place.find({creator: userId}).sort({'_id': -1})
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later.',
      404
    )
    return next(error)
  }

  if (!places) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    )
  }

  res.json({ places: places.map(place => place.toObject({ getters: true })) })
}

const createPlace = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    )
  }

  const { title, description, address } = req.body
  const descriptionArray = description.split('/29omaewa,').map(des => des.replace('/29omaewa', ''))
  descriptionArray[descriptionArray.length-1] = descriptionArray[descriptionArray.length-1].replace('/29omaewa', '')

  let coordinates
  try {
    coordinates = await getCoordsForAddress(address)
  } catch (error) {
    return next(error)
  }

  const createdPlace = new Place({
    title,
    description: descriptionArray,
    address,
    location: coordinates,
    image: req.file.path,
    creator: req.userData.userId
  })

  let user
  try {
    user = await User.findById(req.userData.userId)
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      404
    )
    return next(error)
  }

  if (!user) {
    const error = new HttpError('Could not find the user for the provided id.', 404)
    return next(error)
  }

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await createdPlace.save({ session: sess }) 
    user.places.push(createdPlace) 
    await user.save({ session: sess }) 
    await sess.commitTransaction()
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      404
    )
    return next(error)
  }

  res.status(201).json({ place: createdPlace })
}

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    )
  }

  const { title, description, address } = req.body
  const descriptionArray = description.map(des => des.replace('/29omaewa', ''))
  const placeId = req.params.pid

  let place
  try {
    place = await Place.findById(placeId)
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      404
    )
    return next(error)
  }

  if(place.creator.toString() !== req.userData.userId){
    const error = new HttpError(
      'You are not allowed to edit this place.',
      401
    )
    return next(error)
  }

  place.title = title
  place.description = descriptionArray
  place.address = address

  try {
    await place.save()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      404
    )
    return next(error)
  }

  res.status(200).json({ place: place.toObject({ getters: true }) })
}

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid

  let place
  try {
    place = await Place.findById(placeId).populate('creator')
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      404
    )
    return next(error)
  }

  if (!place) {
    const error = new HttpError('Could not find place for this id.', 404)
    return next(error)
  }

  if(place.creator.id !== req.userData.userId){
    const error = new HttpError(
      'You are not allowed to edit this place.',
      403
    )
    return next(error)
  }

  const imagePath = place.image

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await place.remove({session: sess})
    place.creator.places.pull(place)
    await place.creator.save({session: sess})
    await sess.commitTransaction()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      404
    )
    return next(error)
  }

  fs.unlink(imagePath, err => {
    console.log(err)
  })
  
  res.status(200).json({ message: 'Deleted place.' })
}

exports.getPlaces = getPlaces
exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace

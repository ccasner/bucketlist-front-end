'use strict'
const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const bucketlistEvents = require('../bucketlist/events')

const onYelpSearch = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  if (data.location.trim().length && data.term.trim().length) {
    $('.yelp-message').html('')
  api.getYelpResults(data)
    .then(ui.getYelpResultsSuccess)
    .catch(ui.getYelpResultsFailure)
  } else {
    $('.yelp-message').html('Name and location fields are required')
    $('#search-content').html('')
  }
}

const getItemName = function (button) {
  const itemName = $(button.target).parent().siblings('.resultName').attr('data-item-name')
  return itemName
}

const getItemLocation = function (button) {
  const itemLocation = $(button.target).parent().siblings('.resultLocation').attr('data-item-location')
  return itemLocation
}

const getCurrentData = function (addButton) {
  $('.message-form').html('')
  const itemName = getItemName(addButton)
  const itemLocation = getItemLocation(addButton)
  $('#input-yelp-category').val('')
  $('#input-yelp-rating').val('')
  $('#input-yelp-item-name').val(itemName)
  $('#input-yelp-location').val(itemLocation)
}

const addHandlers = function () {
  $('#yelp-search').on('submit', onYelpSearch)
  $('#search-content').on('click', '.add-result-button', getCurrentData)
  $('#add-yelp-listitem').on('submit', bucketlistEvents.onPostBucketList)
}

module.exports = {
  addHandlers
}

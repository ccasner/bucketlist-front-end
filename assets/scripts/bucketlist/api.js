const config = require('../config')
const store = require('../store')

const getBucketList = function () {
  return $.ajax({
    url: config.apiOrigin + '/listitems/',
    method: 'GET'
  })
}

const postBucketList = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/listitems/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'listitem': {
        'name': data.listitem.name,
        'location': data.listitem.location,
        'category': data.listitem.category,
        'rating': data.listitem.rating
      }
    }
  })
}

module.exports = {
  getBucketList,
  postBucketList
}
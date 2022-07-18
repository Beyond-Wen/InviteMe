const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

function getGuests(db = connection) {
  return db('guest').select()
}

function addGuest(
  { name, email, plusone, plusone_Name, dietary, rsvp, event_id, groupNumber },

  db = connection
) {
  return db('guest')
    .insert({
      name,
      email,
      plusone,
      plusone_Name,
      dietary,
      rsvp,
      event_id,
      groupNumber,
    })
    .join('event', 'event.id', 'guests.event_id as guests.eventId')
}

function deleteGuest(id, db = connection) {
  return db('guest').del().where('id', id)
}

function updateGuest(
  id,
  { name, email, plusone, plusone_Name, dietary, rsvp },
  db = connection
) {
  return db('guest')
    .update({
      name,
      email,
      plusone,
      plusone_Name,
      dietary,
      rsvp,
    })
    .where('id', id)
    .then(() => findGuestById(id, db))
}

function findGuestById(id, db = connection) {
  return db('guest').select().where('id', id).first()
}

function findGuestByEmail(email, db = connection) {
  return db('guest').select('*').where('email', email).first()
}

module.exports = {
  addGuest,
  getGuests,
  deleteGuest,
  updateGuest,
  findGuestById,
  findGuestByEmail,
}

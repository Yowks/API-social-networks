const EventModel = require('../models/event.js')
const UserModel = require('../models/user.js')
/**
 * Event
 * @class
 */
class Event {
  constructor (app, connect) {
    this.app = app
    this.EventModel = connect.model('Event', EventModel)
    this.UserModel = connect.model('User', UserModel)

    this.create_event()
    this.show_event()
    this.search_event()
    this.delete_event()
    this.update_event()
  }

  /**
   * Show an event
   * @Endpoint : /event/{id}/show
   * @Method : GET
   */
  show_event () {
    this.app.get('/event/:id/show', (req, res) => {
      try {
        this.EventModel.findById(req.params.id).populate("administrator, members, staff").then(event => {
          res.status(200).json(event || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: "Internal Server Error"
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        })
      }
    })
  }

  /**
   * Delete an event
   * @Endpoint : /event/{id}/delete
   * @Method : DELETE
   */
  delete_event () {
    this.app.delete('/event/:id/delete', (req, res) => {
      try {
        this.EventModel.findByIdAndRemove(req.params.id).then(event => {
          res.status(200).json(event || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: "Internal Server Error"
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        })
      }
    })
  }

  /**
   * Update an event
   * @Endpoint : /event/{id}/update
   * @Method : PUT
   */
  update_event () {
    this.app.put('/event/:id/update', (req, res) => {
      try {
        this.EventModel.findByIdAndUpdate(req.params.id, req.body).then(event => {
          res.status(200).json(event || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: "Internal Server Error"
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        })
      }
    })
  }

  /**
   * Create an event
   * @Endpoint : /event/create
   * @Method : POST
   */
  create_event () {
    this.app.post('/event/create', (req, res) => {
      try {
        const eventModel = this.EventModel(req.body)
        
        eventModel.save().then(event => {
          res.status(200).json(event || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: "Internal Server Error"
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: 'error : ' + err
        })
      }
    })
  }

/**
   * Show all the events
   * @Endpoint : /event/search
   * @Method : GET
   */
  search_event () {
    this.app.get('/event/search', (req, res) => {
      try {
        this.EventModel.find({}).populate("administrator, members, staff").then(event => {
          res.status(200).json(event || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: "Internal Server Error"
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        })
      }
    })
  }
}

module.exports = Event

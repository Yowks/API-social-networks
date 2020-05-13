const EventModel = require('../models/event.js')

/**
 * Event
 * @class
 */
class Event {
  constructor (app, connect) {
    this.app = app
    this.EventModel = connect.model('Event', EventModel)

    this.create()
    this.show()
    this.search()
    this.delete()
    this.update()
  }

  /**
   * Show
   * @Endpoint : /event/show/{id}
   * @Method : GET
   */
  show () {
    this.app.get('/event/show/:id', (req, res) => {
      try {
        this.EventModel.findById(req.params.id).populate("administrator, members, staff").then(event => {
          res.status(200).json(event || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

  /**
   * Delete
   * @Endpoint : /event/{id}/delete
   * @Method : DELETE
   */
  delete () {
    this.app.delete('/event/:id/delete', (req, res) => {
      try {
        this.EventModel.findByIdAndRemove(req.params.id).then(event => {
          res.status(200).json(event || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

  /**
   * Update
   * @Endpoint : /event/{id}/update
   * @Method : PUT
   */
  update () {
    this.app.put('/event/:id/update', (req, res) => {
      try {
        this.EventModel.findByIdAndUpdate(req.params.id, req.body).then(event => {
          res.status(200).json(event || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

  /**
   * Create
   * @Endpoint : /event/create
   * @Method : POST
   */
  create () {
    this.app.post('/event/create', (req, res) => {
      try {
        const eventModel = this.EventModel(req.body)
        
        eventModel.save().then(event => {
          res.status(200).json(event || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: err
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
   * List
   */
  search () {
    this.app.get('/event/search', (req, res) => {
      try {
        this.EventModel.find({}).populate("administrator, members, staff").then(event => {
          res.status(200).json(event || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }
}

module.exports = Event

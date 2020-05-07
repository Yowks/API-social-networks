const GroupModel = require('../models/group.js')

/**
 * Group
 * @class
 */
class Group {
  constructor (app, connect) {
    this.app = app
    this.GroupModel = connect.model('Group', GroupModel)

    this.create()
    this.show()
    this.search()
    this.delete()
    this.update()
    this.showMembers();
  }

  /**
   * Show
   */
  show () {
    this.app.get('/group/show/:id', (req, res) => {
      try {
        this.GroupModel.findById(req.params.id).then(group => {
          res.status(200).json(group || {})
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
   * Show All Members
   */
  showMembers () {
    this.app.get('/group/show/:id/members', (req, res) => {
      try {
        this.GroupModel.findById(req.params.id).select('members').then(group => {
          console.log(group)
          res.status(200).json(group || {})
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
   */
  delete () {
    this.app.delete('/group/delete/:id', (req, res) => {
      try {
        this.GroupModel.findByIdAndRemove(req.params.id).then(group => {
          res.status(200).json(group || {})
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
   */
  update () {
    this.app.put('/group/update/:id', (req, res) => {
      try {
        const groupModel = this.GroupModel(req.body)
            this.GroupModel.findByIdAndUpdate(req.params.id, req.body).then(group => {
              groupModel.save().then(group => {
                res.status(200).json(group || {})
            }).catch(err => {
              res.status(500).json({
                code: 500,
                message: err
              })
            })
            return
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
   */
  create () {
    this.app.post('/group/create', (req, res) => {
      try {
        const groupModel = this.GroupModel(req.body)
          groupModel.members=groupModel.administrator
          groupModel.save().then(group => {
            res.status(200).json(group || {})
          }).catch(err => {
            res.status(500).json({
              code: 500,
              message: err
            })
          })
          return

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
    this.app.post('/group/search', (req, res) => {
      try {
        const pipe = [{ $limit: req.body.limit || 10 }]

        if (req.body.sort) {
          pipe.push({$sort: req.body.sort})
        }

        this.GroupModel.aggregate(pipe).then(group => {
          res.status(200).json(group || {})
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

module.exports = Group

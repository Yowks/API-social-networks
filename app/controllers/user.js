const UserModel = require('../models/user.js')

/**
 * User
 * @class
 */
class User {
  constructor (app, connect) {
    this.app = app
    this.UserModel = connect.model('User', UserModel)

    this.create_user()
    this.show_user()
    this.search_user()
    this.delete_user()
    this.update_user()
  }

  /**
	* Get an user
	* @Endpoint : /user/{id}/show
	* @Method : GET
	*/
  show_user () {
    this.app.get('/user/:id/show', (req, res) => {
      try {
        this.UserModel.findById(req.params.id).then(user => {
          res.status(200).json(user || {})
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
	* Delete an user
	* @Endpoint : /user/{id}/delete
	* @Method : DELETE
	*/
  delete_user () {
    this.app.delete('/user/:id/delete', (req, res) => {
      try {
        this.UserModel.findByIdAndRemove(req.params.id).then(user => {
          res.status(200).json({
            code: 200,
            message: "User succesfully deleted"
          })
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
	* Update an user
	* @Endpoint : /user/{id}/update
	* @Method : PUT
	*/
  update_user () {
    this.app.put('/user/:id/update', (req, res) => {
      try {
        this.UserModel.findByIdAndUpdate(req.params.id, req.body).then(user => {
          res.status(200).json(user || {})
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
	* Create an user
	* @Endpoint : /user/{id}/update
	* @Method : POST
	*/
  create_user () {
    this.app.post('/user/create', (req, res) => {
      try {
        const userModel = this.UserModel(req.body)
        this.UserModel.find({email: req.body.email}).then(result => {
          if (result.length==0) {
            userModel.save().then(user => {
              res.status(200).json(user || {})
            }).catch(err => {
              res.status(500).json({
                code: 500,
                message: "Internal Server Error"
              })
            })
            return
          } 
          // Mail existant
          res.status(403).json({
            code: 403,
            message: 'Email already exists'
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
	* Get all users
	* @Endpoint : /user/search
	* @Method : GET
	*/
  search_user () {
    this.app.get('/user/search', (req, res) => {
      try {
        const pipe = [{ $limit: req.body.limit || 10 }]

        if (req.body.sort) {
          pipe.push({$sort: req.body.sort})
        }

        this.UserModel.aggregate(pipe).then(user => {
          res.status(200).json(user || {})
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

module.exports = User

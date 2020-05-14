const CommentModel = require('../models/comment')

/**
 * Comment
 * @class
 */

class Comment {
  constructor(app, connect) {
    this.app = app
    this.CommentModel = connect.model('Comment', CommentModel)

    this.get_comments()
    this.get_comment()
    this.create_comment()
    this.update_comment()
    this.delete_comment()
  }

  /**
   * Get all the comments
   * @Endpoint : /comment
   * @Method : GET
   */
  get_comments() {
    this.app.get('/comment', (req, res) => {
      try {
        this.CommentModel.find({}, function(err, comments) {
          res.status(200).json({ 
          comments: comments, 
          })
        }).populate("author_id, ref")
      } catch (err) {
        res.status(500).json({ 
          error: { 
            code: 500, 
            message: "Internal Server Error"
          } 
        })
      }
    })
  }

  /**
  * Get a comment
  * @Endpoint : /comment/{id}
  * @Method : GET
  */
  get_comment() {
    this.app.get('/comment/:id', (req, res) => {
      try {
        this.CommentModel.findById(req.params.id).populate("author_id").then(comment => {
          if(comment){
            res.status(200).json({ 
            comment: comment
            })
          }else{
            res.status(400).json({ 
              error: {
              status: 400,
              message: "invalid id"
              } 
            })  
          }
        }).catch(err => {
          res.status(400).json({ 
            error: {
            status: 400,
            message: "invalid id"
            } 
          }) 
        })

      } catch (err) {
        res.status(500).json({ 
          error: { 
            status: 500, 
            message: "Internal Server Error"
          } 
        })
      }
    })
  }


  /**
  * Create a comment
  * @Endpoint : /comment/create
  * @Method : POST
  */
  create_comment() {
    this.app.post('/comment/create', (req, res) => {
      try {
        const commentModel = new this.CommentModel(req.body)

        commentModel.save().then(comment => {
          res.status(201).json({ 
            comment: comment 
          })
        }).catch(err => {
          res.status(400).json({ 
            error: {
              status: 400,
              message: "error"
            } 
          }) 
        })

      } catch {
        res.status(500).json({ 
          error: { 
            status: 500, 
            message: "Internal Server Error"
          } 
        })
      }
    })
  }


  /**
  * Edit a comment
  * @Endpoint : /comment/{id}/update
  * @Method : PUT
  */
  update_comment() {
    this.app.put('/comment/:id/update', (req, res) => {
      try {
        this.CommentModel.findByIdAndUpdate(req.params.id, req.body).then(comment => {
          if(comment){
            res.status(201).json({ 
            comment: comment
            })
          }else{
            res.status(400).json({ 
              error: {
                status: 400,
                message: "invalid id"
              } 
            })  
          }
        }).catch(err => {
          res.status(400).json({ 
            error: {
              status: 400,
              message: "invalid id",
            } 
          }) 
        })
      } catch {
        res.status(500).json({ 
          error: { 
            status: 500, 
            message: "Internal Server Error"
          } 
        })
      }
    })
  }


  /**
  * Delete a comment
  * @Endpoint : /comment/{id}/delete
  * @Method : DELETE
  */
  delete_comment() {
    this.app.delete('/comment/:id/delete', (req, res) => {
      try {
        this.CommentModel.findByIdAndDelete(req.params.id).then(comment => {

          if(comment){
            res.status(200).json({ 
              success: {
                status: 200,
                message: "successfully deleted"
              }
            })
          }else{
            res.status(400).json({ 
              error: {
                status: 400,
                message: "invalid id",
              } 
            }) 
          }
        }).catch(err => {
          res.status(400).json({ 
            error: {
              status: 400,
              message: "invalid id",
            } 
          }) 
        });
      } catch {
        res.status(500).json({ 
          error: { 
            status: 500, 
            message: "Internal Server Error"
          } 
        })
      }
    })
  }

}

module.exports = Comment
const DiscussionModel = require('../models/discussion')
const MessageModel = require('../models/message')

/**
 * Discussion
 * @class
 */

class Discussion {
  constructor(app, connect) {
  this.app = app
  this.DiscussionModel = connect.model('Discussion', DiscussionModel)
  this.MessageModel = connect.model('Message', MessageModel)

  this.get_discussions()
  this.get_discussion()
  this.get_discussion_messages()
  this.create_discussion()
  this.update_discussion()
  this.delete_discussion()
  }

  /**
  * Get all the discussions
  * @Endpoint : /discussion
  * @Method : GET
  */
  get_discussions() {
    this.app.get('/discussion', (req, res) => {
      try {
      this.DiscussionModel.find({}, function(err, discussions) {
        res.status(200).json({ 
          discussions: discussions, 
        })
      });

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
  * Get a discussion
  * @Endpoint : /discussion/{id}
  * @Method : GET
  */
  get_discussion() {
    this.app.get('/discussion/:id', (req, res) => {
      try {
        this.DiscussionModel.findById(req.params.id).then(discussion => {
          if(discussion){
            res.status(200).json({ 
              discussion: discussion, 
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
        });
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
  * Get all the messages of a discussion
  * @Endpoint : /discussion/{id}/message
  * @Method : GET
  */
  get_discussion_messages() {
    this.app.get('/discussion/:id/message', (req, res) => {
      try {
        this.DiscussionModel.findById(req.params.id).then(discussion => {
          if(discussion){

            this.MessageModel.find({"discussion_id": req.params.id}).then(messages => {
              res.status(200).json({ 
                messages: messages 
              })
            });
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
        });
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
  * Create a discussion
  * @Endpoint : /discussion/create
  * @Method : POST
  */
  create_discussion() {
    this.app.post('/discussion/create', (req, res) => {
      try {
        const discussionModel = new this.DiscussionModel(req.body)  
        if(req.body.type){
          discussionModel.save().then(discussion => {
            res.status(201).json({ 
              discussion: discussion, 
            })
          }).catch(err => {
            res.status(400).json({ 
              error: {
                status: 400,
                message: "error"
              } 
            }) 
          })
        }else{
          res.status(400).json({ 
            error: {
              status: 400,
              message: "invalid type"
            } 
          }) 
        }
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
  * Update a discussion
  * @Endpoint : /discussion/{id}/update
  * @Method : PUT
  */
  update_discussion() {
    this.app.put('/discussion/:id/update', (req, res) => {
      try {
        this.DiscussionModel.findByIdAndUpdate(req.params.id, req.body).then(discussion => {
          if(discussion){
            res.status(201).json({ 
              discussion: discussion, 
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


  /**
  * Delete a discussion
  * @Endpoint : /discussion/{id}/delete
  * @Method : DELETE
  */
  delete_discussion() {
    this.app.delete('/discussion/:id/delete', (req, res) => {
      try {
        this.DiscussionModel.findByIdAndDelete(req.params.id).then(discussion => {
          if(discussion){
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

module.exports = Discussion
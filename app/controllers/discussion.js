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
  * Récupérer toutes les discussions
  * @Endpoint : /discussions
  * @Method : GET
  */
  get_discussions() {
    this.app.get('/discussions', (req, res) => {
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
  * Récupérer les données d'une discussion
  * @Endpoint : /discussions/{id}
  * @Method : GET
  */
  get_discussion() {
    this.app.get('/discussions/:id', (req, res) => {
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
  * Récupérer les messages d'une discussion
  * @Endpoint : /discussions/{id}/messages
  * @Method : GET
  */
  get_discussion_messages() {
    this.app.get('/discussions/:id/messages', (req, res) => {
      try {
        this.DiscussionModel.findById(req.params.id).then(discussion => {
          if(discussion){

            this.MessageModel.find({"ref": req.params.id}).then(messages => {
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
  * Créer une discussion
  * @Endpoint : /discussions/create
  * @Method : POST
  */
  create_discussion() {
    this.app.post('/discussions/create', (req, res) => {
      try {
        const discussionModel = new this.DiscussionModel(req.body)

        if(req.body.type && (req.body.type == "group" || req.body.type == 'event')){
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
  * Editer une discussion
  * @Endpoint : /discussions/{id}/update
  * @Method : PUT
  */
  update_discussion() {
    this.app.put('/discussions/:id/update', (req, res) => {
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
  * Supprimer une discussion
  * @Endpoint : /discussions/{id}/delete
  * @Method : DELETE
  */
  delete_discussion() {
    this.app.delete('/discussions/:id/delete', (req, res) => {
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
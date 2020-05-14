const AlbumModel = require('../models/album')
const AlbumPicturesModel = require('../models/albums_picture')
const CommentModel = require('../models/comment')

/**
 * Album
 * @class
 */

class Album {
  constructor(app, connect) {
    this.app = app
    this.AlbumModel = connect.model('Album', AlbumModel)
    this.AlbumPicturesModel = connect.model('AlbumPictures', AlbumPicturesModel)
    this.CommentModel = connect.model('Comment', CommentModel)

    this.get_albums()
    this.get_album()
    this.create_album()
    this.update_album()
    this.delete_album()

    this.get_album_pictures()
    this.get_album_pictures_comments()
    this.create_album_picture()
    this.update_album_picture()
    this.delete_album_picture()
  }

  /**
   * Get all the albums
   * @Endpoint : /album
   * @Method : GET
   */
  get_albums() {
    this.app.get('/album', (req, res) => {
      try {
        this.AlbumModel.find({}, function(err, albums) {
          res.status(200).json(
            { 
              albums: albums
            }
          )
        }).populate('event_ref');
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
   * Get an album
   * @Endpoint : /album/{id}
   * @Method : GET
   */
  get_album() {
    this.app.get('/album/:id', (req, res) => {
      try {
        this.AlbumModel.findById(req.params.id).populate('event_ref').then(album => {
          if(album){
            res.status(200).json({ 
                album: album
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
   * Get all the images of an album
   * @Endpoint : /album/{id}/picture
   * @Method : GET
   */
  get_album_pictures() {
    this.app.get('/album/:id/picture', (req, res) => {
      try {
        this.AlbumModel.findById(req.params.id).populate('event_ref').then(albums => {
          if(albums){
            this.AlbumPicturesModel.find({"album_ref": req.params.id}).populate('album_ref, author_id').then(pictures => {
              res.status(200).json({ 
                pictures: pictures
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
   * Get all the comments of an image in an album
   * @Endpoint : /album/{id}/picture/{pic_id}/comments
   * @Method : GET
   */
  get_album_pictures_comments() {
    this.app.get('/album/:id/picture/:pic_id/comments', (req, res) => {
      try {
        this.AlbumPicturesModel.find({"album_ref": req.params.id}).populate('event_ref').then(picture => {
          if(picture){
            this.CommentModel.find({"ref": req.params.pic_id, "type": "album"}).populate('author_id').then(comments => {
              res.status(200).json({ 
                comments: comments
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
   * Create an album
   * @Endpoint : /album/create
   * @Method : POST
   */
  create_album() {
    this.app.post('/album/create', (req, res) => {
      try {
        const albumModel = new this.AlbumModel(req.body)

        this.AlbumModel.findOne({ title: req.body.title }, function(err, album) {
          if (album) {
            res.status(400).json({ 
              error: {
                status: 400,
                message: "album already exist"
              } 
            }) 
          } else {
            albumModel.save().then(album => {
              res.status(201).json({ 
                album: album, 
              })
            }).catch(err => {
              res.status(400).json({ 
                error: {
                  status: 400,
                  message: "error"
                } 
              }) 
            })
          }
        }).populate('event_ref'); 
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
   * Create an image in an album
   * @Endpoint : /album/{id}/picture/create
   * @Method : POST
   */
  create_album_picture() {
    this.app.post('/album/:id/picture/create', (req, res) => {
      try {
        const albumPicturesModel = new this.AlbumPicturesModel(req.body)
        albumPicturesModel.save().then(album => {
          res.status(201).json({ 
            album: album, 
          })
        }).catch(err => {
          res.status(400).json({ 
            error: {
              status: 400,
              message: "error"
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
   * Edit an album
   * @Endpoint : /album/{id}/update
   * @Method : PUT
   */
  update_album() {
    this.app.put('/album/:id/update', (req, res) => {
      try {
        this.AlbumModel.findByIdAndUpdate(req.params.id, req.body).populate('event_ref').then(album => {
          if(album){
            res.status(201).json({ 
                album: album
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
   * Edit an image from an album
   * @Endpoint : /album/{id}/picture/update
   * @Method : PUT
   */
  update_album_picture() {
    this.app.put('/album/:id/picture/update', (req, res) => {
      try {
        this.AlbumPicturesModel.findByIdAndUpdate(req.params.id, req.body).populate('album_ref, author_id').then(picture => {
          if(picture){
            res.status(201).json({ 
              picture: picture
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
   * Delete an album
   * @Endpoint : /album/{id}/delete
   * @Method : DELETE
   */
  delete_album() {
    this.app.delete('/album/:id/delete', (req, res) => {
      try {
        this.AlbumModel.findByIdAndDelete(req.params.id).populate('event_ref').then(album => {
          if(album){
            res.status(200).json({ 
              success: {
                status: 200,
                message: "successfully deleted"
              }
            })
          }else{
            res.status(400).json(
              { 
                error: {
                  status: 400,
                  message: "invalid id"
                } 
              }
            ) 
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
   * Delete an image from an album
   * @Endpoint : /album/{id}/picture/delete
   * @Method : DELETE
   */
  delete_album_picture() {
    this.app.delete('/album/:id/picture/delete', (req, res) => {
      try {
        this.AlbumPicturesModel.findByIdAndDelete(req.params.id).populate('album_ref, author_id').then(picture => {
          if(picture){
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

module.exports = Album
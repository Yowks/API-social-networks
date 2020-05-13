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
   * Récupérer tout les albums
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
   * Récupérer les données d'un album
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
   * Récupérer les images d'un album
   * @Endpoint : /album/{id}/pictures
   * @Method : GET
   */
  get_album_pictures() {
    this.app.get('/album/:id/pictures', (req, res) => {
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
   * Récupérer les commentaires d'une image dans un album
   * @Endpoint : /album/{id}/pictures/{pic_id}/comments
   * @Method : GET
   */
  get_album_pictures_comments() {
    this.app.get('/album/:id/pictures/:pic_id/comments', (req, res) => {
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
   * Créer un album
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
   * Créer une image dans un album
   * @Endpoint : /album/{id}/pictures/create
   * @Method : POST
   */
  create_album_picture() {
    this.app.post('/album/:id/pictures/create', (req, res) => {
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
   * Editer un album
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
   * Editer une image d'un album
   * @Endpoint : /album/{id}/pictures/update
   * @Method : PUT
   */
  update_album_picture() {
    this.app.put('/album/:id/pictures/update', (req, res) => {
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
   * Supprimer un album
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
   * Supprimer une image d'un album
   * @Endpoint : /album/{id}/pictures/delete
   * @Method : DELETE
   */
  delete_album_picture() {
    this.app.delete('/album/:id/pictures/delete', (req, res) => {
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
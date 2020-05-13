const MessageModel = require('../models/message')
const CommentModel = require('../models/comment')

/**
 * Message
 * @class
 */

class Message {
	constructor(app, connect) {
		this.app = app
		this.MessageModel = connect.model('Message', MessageModel)
		this.CommentModel = connect.model('Comment', CommentModel)

		this.get_messages()
		this.get_message()
		this.get_messages_comments()
		this.create_message()
		this.update_message()
		this.delete_message()
	}

	/**
	* Récupérer tout les messages
	* @Endpoint : /message
	* @Method : GET
	*/
	get_messages() {
		this.app.get('/message', (req, res) => {
			try {
				this.MessageModel.find({}, function(err, messages) {
					res.status(200).json({ 
						messages: messages
					})
				}).populate('author_id, discussion_ref');

			}catch (err) {
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
	* Récupérer les données d'un message
	* @Endpoint : /message/{id}
	* @Method : GET
	*/
	get_message() {
		this.app.get('/message/:id', (req, res) => {
			try {
				this.MessageModel.findById(req.params.id).populate('author_id, discussion_ref').then(message => {
					if(message){
						res.status(200).json({ 
							message: message 
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
	* Récupérer les commentaires d'un messages
	* @Endpoint : /message/{id}/comment
	* @Method : GET
	*/
	get_messages_comments() {
		this.app.get('/message/:id/comment', (req, res) => {
			try {
				this.MessageModel.findById(req.params.id).populate('author_id, discussion_ref').then(message => {
					if(message){
						this.CommentModel.find({"ref": req.params.id, "type": "group_message"}).populate('author_id').then(comments => {
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
	* Créer un message
	* @Endpoint : /message/create
	* @Method : POST
	*/
	create_message() {
		this.app.post('/message/create', (req, res) => {
			try {
				const messageModel = new this.MessageModel(req.body)
				messageModel.save().then(message => {
					res.status(201).json({ 
						message: message
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
	* Editer un message
	* @Endpoint : /message/{id}/update
	* @Method : PUT
	*/
	update_message() {
		this.app.put('/message/:id/update', (req, res) => {
			try {
				this.MessageModel.findByIdAndUpdate(req.params.id, req.body).populate('author_id, discussion_ref').then(message => {
					if(message){
						res.status(201).json({ 
							message: message 
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
	* Supprimer un message
	* @Endpoint : /message/{id}/delete
	* @Method : DELETE
	*/
	delete_message() {
		this.app.delete('/message/:id/delete', (req, res) => {
			try {
				this.MessageModel.findByIdAndDelete(req.params.id).populate('author_id, discussion_ref').then(message => {
					if(message){
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

module.exports = Message
const EventModel = require('../models/event')
const ShoppingItemsModel = require('../models/shopping_items')
const ShoppersModel = require('../models/shoppers')

/**
 * Shopping
 * @class
 */

class Shopping {
	constructor(app, connect) {
		this.app = app
		this.EventModel = connect.model('Event', EventModel)
		this.ShoppingItemsModel = connect.model('ShoppingItems', ShoppingItemsModel)
		this.ShoppersModel = connect.model('Shoppers', ShoppersModel)

		this.create_shopping_list()
		this.delete_shopping_list()

		this.create_shopping_item()
		this.get_shopping_item()
		this.update_shopping_item()
		this.delete_shopping_item()

		this.define_shopper()
		this.remove_shopper()
	}

	/**
	 * Create a shopping list
	 * @Endpoint : /shoppings/create
	 * @Method : POST
	 */
	create_shopping_list() {
		this.app.post('/shoppings/create', (req, res) => {
			try {
				this.EventModel.findByIdAndUpdate(req.body.event_id, {'shopping_list': true}).populate('managers, members').then(event => {
					if(event){
						res.status(201).json({ event })
					}else{
						res.status(400).json({ 
							error: {
								status: 400,
								message: "invalid id"
							} 
						})  
					}
				}).catch(err => {
					res.status(400).json(
						{ 
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
	 * Create an item in a shopping list
	 * @Endpoint : /shoppings/items/create
	 * @Method : POST
	 */
	create_shopping_item() {
		this.app.post('/shoppings/items/create', (req, res) => {
			try {
				const shoppingItemsModel = new this.ShoppingItemsModel(req.body)
				
				this.EventModel.findById(req.body.event_id, function(err, event) {
					if (event) {
						shoppingItemsModel.save().then(items => {
							res.status(201).json({ items })
						}).catch(err => {
								res.status(400).json({ 
									error: {
										status: 400,
										message: "error"
									} 
								}) 
						})
					} else {
						res.status(400).json({ 
							error: {
								status: 400,
								message: "event doesnt exist"
							} 
						}) 
					}
				}).populate('managers, members');

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
	 * Récupérer les items d'une shopping list
	 * @Endpoint : /shoppings/{id}/items
	 * @Method : GET
	 */
	get_shopping_item() {
		this.app.get('/shoppings/:id/items', (req, res) => {
			try {
				this.EventModel.findById(req.params.id).populate('managers, members').then(event => {
					if(event){
						this.ShoppingItemsModel.find({"event_id": req.params.id}).populate('event_id').then(shopping_list => {
							res.status(200).json({ shopping_list })
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
					res.status(400).json( { 
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
	 * Editer un item d'une shopping list
	 * @Endpoint : /shoppings_item/{id}/update
	 * @Method : PUT
	 */
	update_shopping_item() {
		this.app.put('/shoppings_item/:id/update', (req, res) => {
			try {
				this.ShoppingItemsModel.findByIdAndUpdate(req.params.id, req.body).then(item => {
					if(item){
						res.status(201).json({ item })
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


	/**
	 * Supprimer un item d'une shopping list
	 * @Endpoint : /shoppings_item/{id}/delete
	 * @Method : DELETE
	 */
	delete_shopping_item() {
		this.app.delete('/shoppings_item/:id/delete', (req, res) => {
			try {
				this.ShoppingItemsModel.findByIdAndDelete(req.params.id).then(item => {
					if(item){
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


	/**
	 * Supprime une shopping list
	 * @Endpoint : /shoppings/delete
	 * @Method : POST
	 */
	delete_shopping_list() {
		this.app.post('/shoppings/delete', (req, res) => {
			try {
				this.EventModel.findByIdAndUpdate(req.body.event_id, {'shopping_list': false}).populate('managers, members').then(event => {
					if(event){
						res.status(201).json({ event })
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
	 * Définir un item sur un utilisateur (le bloque)
	 * @Endpoint : /shoppings_item/{id}/shoppers/define/{user_id}
	 * @Method : POST
	 */
	define_shopper() {
		this.app.post('/shoppings_item/:id/shoppers/define/:user_id', (req, res) => {
			try {
				const shoppersModel = new this.ShoppersModel(req.body)
				this.ShoppingItemsModel.findById(req.params.id, function(err, item) {
					if (item) {
						shoppersModel.save().then(shopper_item => {
							res.status(201).json({ shopper_item})
						}).catch(err => {
							res.status(400).json({ 
								error: {
									status: 400,
									message: "error"
								} 
							}) 
						})
					} else {
						res.status(400).json({ 
							error: {
									status: 400,
									message: "Item doesnt exist"
							} 
						}) 
					}
				}).populate('event_id');
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
	 * Supprime un utilisateur sur un item d'une shopping list
	 * @Endpoint : /shoppings_item/{id}/shoppers/remove
	 * @Method : POST
	 */
	remove_shopper() {
		this.app.post('/shoppings_item/:id/shoppers/remove', (req, res) => {
			try {
				this.ShoppersModel.deleteOne({"item_id": req.params.id}).then(shopper_item => {
					if(shopper_item){
						res.status(201).json({ shopper_item })
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

module.exports = Shopping
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
    
    this.get_all_shopping_list()
    this.get_shopping_list()

		this.create_shopping_item()
		this.get_shopping_item()
		this.update_shopping_item()
		this.delete_shopping_item()

		this.define_shopper()
	}

	/**
	 * Create a shopping list
	 * @Endpoint : /shoppings/create
	 * @Method : POST
	 */
	create_shopping_list() {
		this.app.post('/shoppings/create', (req, res) => {
			try {
				this.EventModel.findById(req.body.event_id).then(event => {
          if(event.shopping==true){
            const Shop = this.ShoppersModel(req.body)
            Shop.save().then(shop => {
              res.status(201).json({ shop })
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
	 * Get all shopping list
	 * @Endpoint : /shoppings/{id}
	 * @Method : GET
	 */
	get_all_shopping_list() {
		this.app.get('/shoppings', (req, res) => {
			try {
				this.ShoppersModel.find({}).populate('shop_id').then(shop => {
					res.status(200).json({ shop })
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
	 * Get one shopping list
	 * @Endpoint : /shoppings/{id}
	 * @Method : GET
	 */
	get_shopping_list() {
		this.app.get('/shoppings/:id', (req, res) => {
			try {
				this.ShoppersModel.findById(req.params.id).populate('shop_id').then(shop => {
					res.status(200).json({ shop })
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
	 * Create an item in a shopping list
	 * @Endpoint : /shoppings/{id}/items/create
	 * @Method : POST
	 */
	create_shopping_item() {
		this.app.post('/shoppings/:id/items/create', (req, res) => {
			try {
				const shoppingItemsModel = new this.ShoppingItemsModel(req.body)
				
				this.ShoppersModel.findById(req.params.id, function(err, shop) {
					if (shop) {
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
								message: "shop doesnt exist"
							} 
						}) 
					}
				}).populate('staff, members');

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
	 * Get all items in a shop
	 * @Endpoint : /shoppings/{id}/items
	 * @Method : GET
	 */
	get_shopping_item() {
		this.app.get('/shoppings/:id/items', (req, res) => {
			try {
				this.ShoppingItemsModel.findById({shop_id: req.params.id}).populate('shop_id').then(shop => {
					res.status(200).json({ shop })
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
	 * @Endpoint : /shoppings/{id}/delete
	 * @Method : POST
	 */
	delete_shopping_list() {
		this.app.delete('/shoppings/:id/delete', (req, res) => {
			try {
				this.ShoppersModel.findByIdAndDelete(req.params.id).then(event => {
          res.status(200).json({ 
            success: {
              status: 200,
              message: "successfully deleted"
            }
          })
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
}

module.exports = Shopping
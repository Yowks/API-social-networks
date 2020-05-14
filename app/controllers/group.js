const GroupModel = require('../models/group.js')

/**
 * Group
 * @class
 */
class Group {
  constructor (app, connect) {
    this.app = app
    this.GroupModel = connect.model('Group', GroupModel)

    this.create_group()
    this.show_group()
    this.search_group()
    this.delete_group()
    this.update_group()
    this.show_group_members();
  }

  /**
	* Get a group
	* @Endpoint : /group/{id}/show
	* @Method : GET
	*/
  show_group () {
    this.app.get('/group/:id/show', (req, res) => {
      try {
        this.GroupModel.findById(req.params.id).populate("administrator, members").then(group => {
          res.status(200).json(group || {})
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
	* Get all members of a group
	* @Endpoint : /group/{id}/show/members
	* @Method : GET
	*/
  show_group_members () {
    this.app.get('/group/:id/show/members', (req, res) => {
      try {
        this.GroupModel.findById(req.params.id).populate("members").select('members').then(group => {
          res.status(200).json(group || {})
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
	* Delete a group
	* @Endpoint : /group/{id}/delete
	* @Method : DELETE
	*/
  delete_group () {
    this.app.delete('/group/:id/delete', (req, res) => {
      try {
        this.GroupModel.findByIdAndRemove(req.params.id).then(group => {
          res.status(200).json(group || {})
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
	* Update a group
	* @Endpoint : /group/{id}/update
	* @Method : PUT
	*/
  update_group () {
    this.app.put('/group/:id/update', (req, res) => {
      try {
        const groupModel = this.GroupModel(req.body)
        this.GroupModel.findById(req.params.id).then(group => {
          const members = group.members
          const administrator = group.administrator

          /**
           * Members update
           */
          if(groupModel.members.length>0 && groupModel.members[0]!=""){ // User Add or Suppression
            groupModel.members.forEach(element => {
              if(members.includes(element)){ // Look if member already in group or not
                let beDeleted = members.indexOf(element)
                if(!administrator.includes(members[beDeleted]) && administrator.length>=1){ //Look if the member going to be deleted is not the only administator of the group
                  members.splice(beDeleted,1)
                  let beDeletedAdmin = administrator.indexOf(element) // Also Delete in administrators
                  //administrator.splice(beDeletedAdmin,1)
                }else{
                  res.status(500).json({
                    code: 500,
                    message: "Can't delete the only administrator of the group"
                  })
                }
                
              }else{ // Add new member
                members.push(element)
              }
            });
          }

          /**
           * Administator update
           */
          if(groupModel.administrator.length>0 && groupModel.administrator[0]!=""){ // User Add or Suppression
            groupModel.administrator.forEach(element => {
              if(administrator.includes(element)){ // Look if member already in group or not
                let beDeleted = administrator.indexOf(element)
                if(administrator.length>1){ //Look if the member going to be deleted is not the only administator of the group
                  administrator.splice(beDeleted,1)
                  let beDeletedMember = members.indexOf(element) // Also Delete in administrators
                  members.splice(beDeletedMember,1)
                }else{
                  res.status(500).json({
                    code: 500,
                    message: "Can't delete the only administrator of the group"
                  })
                }
                
              }else{ // Add new member
                members.push(element) // To resolve
                administrator.push(element)
              }
            });
          }

          group.save()
          
          res.status(200).json(group || {})

        return
        })
      }catch (err) {
        res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        })
      }
    })
  }

  /**
	* Create a group
	* @Endpoint : /group/create
	* @Method : POST
	*/
  create_group () {
    this.app.post('/group/create', (req, res) => {
      try {
        const groupModel = this.GroupModel(req.body)
          groupModel.members=groupModel.administrator

          groupModel.save().then(group => {
            res.status(200).json(group || {})
          }).catch(err => {
            res.status(500).json({
              code: 500,
              message: "Internal Server Error"
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
	* Get all groups
	* @Endpoint : /group/search
	* @Method : GET
	*/
  search_group () {
    this.app.get('/group/search', (req, res) => {
      try {
        /*const pipe = [{ $limit: req.body.limit || 10 }]

        if (req.body.sort) {
          pipe.push({$sort: req.body.sort})
        }*/

        this.GroupModel.find({}).populate("members, administrator").then(group => {
          res.status(200).json(group || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: "err"
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

module.exports = Group

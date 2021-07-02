const { response } = require('express');
const db = require("../database/postgres");
const Store = db.stores;


const createEntity = ( req, res = response) => {    
    try {

        let entidad = req.body;

        Store.create(entidad)
            .then( store => {
                res.status(200).json({
                    ok : 'true',
                    message : 'Data Saved successfully..!',
                    store
                });
            })
            .catch( err => {
                res.status(500).send({
                    ok : false,
                    message:
                      err.message || "Some error occurred while creating the Store."
                  });
            })
    } catch (error) {
        console.log('Error ', error);
        res.status(500).send({
            ok : false,
            message:
              err.message || "Some error occurred while creating the Store."
          });
    }
}

const getAllEntity = ( req, res = response) => { 
    try {
        Store.findAll()
        .then(stores => {

            res.status(200).json({
                ok : true,
                stores 
            });
          })
          .catch(err => {
            res.status(404).send({
              message:
                err.message || "Some error occurred while retrieving Store."
            });
          });

    } catch (error) {
        console.log('Error Coneccion', error);
        res.status(500).send({
            ok : false,
            message: "Error retrieving Store"
        });
    }
   }

const getIdEntity = (req, res = response ) => {
    try {
        
        const id = req.params.id;
        
        Store.findByPk(id)
        .then(store => {
            if(Object.keys(store).length === 0){
                res.status(200).json({
                    ok : true,
                    message : " The Store id not exists"
                });
            }

            res.status(200).json({
                ok : true,
                store
            }) ;
        })
        .catch(err => {
            res.status(404).send({
                ok : false,
                message: "Error retrieving Store with id=" + id
            });
        });
    } catch (error) {
        console.log('Services Error ' , error);
        res.status(500).send({
            ok : false,
            message: "Error retrieving Store " + error
        });
    }
  };   

const UpdateEntity  = (req, res) => {
    try {
        const id = req.params.id;
        let entidad = req.body;

        if( entidad == null  || Object.keys(entidad).length === 0){
            res.status(404).json(
            {
                ok : false,
                message : 'body is empty!' 
            });
        }

        Store.update(entidad, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
            res.status(200).json({
                ok : true,
                message: "Store was updated successfully."
            })
            } else {
            res.status(404).json({
                ok:false,
                message: `Cannot update Store with id=${id}. Maybe Store was not found or req.body is empty!`
            });
            }
        })

    } catch (error) {
        console.log('Service ',error);
        res.status(500).send({
            ok : false,
            message: "Error retrieving Store " + error
        });
    }
    
  };

  const deleteEntity = (req, res) => {
    
    const id = req.params.id;

    Store.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).json(
            {
                ok: true,
                message: "Store was deleted successfully!"
            });
        } else {
          res.status(404)({
            ok : false,
            message: `Cannot delete store with id=${id}. Maybe Store was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
            ok: false,
            message: "Could not delete Store with id=" + id
        });
      });
  };


module.exports = {
    createEntity, getAllEntity, getIdEntity, UpdateEntity, deleteEntity
}
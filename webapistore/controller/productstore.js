const { response } = require('express');
const db = require("../database/postgres");
const ProductStore = db.productstores;


const createEntity = ( req, res = response) => {    
    try {

        let entidad = req.body;

        ProductStore.create(entidad)
            .then( data => {
                res.status(200).json({
                    ok : 'true',
                    message : 'Data Saved successfully..!',
                    data: data
                });
            })
            .catch( err => {
                res.status(500).send({
                    ok : false,
                    message:
                      err.message || "Some error occurred while creating the Category."
                  });
            })
    } catch (error) {
        console.log('Error ', error);
        res.status(500).send({
            ok : false,
            message:
              err.message || "Some error occurred while creating the Category."
          });
    }
}

// const getAllEntity = ( req, res = response) => { 
//     try {
//         Category.findAll()
//         .then(category => {

//             res.status(200).json({
//                 ok : true,
//                 category 
//             });
//           })
//           .catch(err => {
//             res.status(404).send({
//               message:
//                 err.message || "Some error occurred while retrieving Category."
//             });
//           });

//     } catch (error) {
//         console.log('Error Coneccion', error);
//         res.status(500).send({
//             ok : false,
//             message: "Error retrieving Category"
//         });
//     }
//    }

const getIdEntity = (req, res = response ) => {
    try {
        
        const id = req.params.id;
        
        Category.findByPk(id)
        .then(productstore => {
            if(Object.keys(productstore).length === 0){
                res.status(200).json({
                    ok : true,
                    message : " The Category id not exists"
                });
            }

            res.status(200).json({
                ok : true,
                productstore
            }) ;
        })
        .catch(err => {
            res.status(404).send({
                ok : false,
                message: "Error retrieving Category with id=" + id
            });
        });
    } catch (error) {
        console.log('Services Error ' , error);
        res.status(500).send({
            ok : false,
            message: "Error retrieving Category " + error
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

        Category.update(entidad, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
            res.status(200).json({
                ok : true,
                message: "Category was updated successfully."
            })
            } else {
            res.status(404).json({
                ok:false,
                message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
            });
            }
        })

    } catch (error) {
        console.log('Service ',error);
        res.status(500).send({
            ok : false,
            message: "Error retrieving Category " + error
        });
    }
    
  };

  const deleteEntity = (req, res) => {
    
    const id = req.params.id;

    Category.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).json(
            {
                ok: true,
                message: "Category was deleted successfully!"
            });
        } else {
          res.status(404)({
            ok : false,
            message: `Cannot delete category with id=${id}. Maybe Store was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
            ok: false,
            message: "Could not delete Category with id=" + id
        });
      });
  };


module.exports = {
    createEntity, getAllEntity, getIdEntity, UpdateEntity, deleteEntity
}
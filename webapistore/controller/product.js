const {
    response
} = require('express');

const db = require("../database/postgres");
const Product = db.products;
const Productstore = db.Productstore;
const Op = db.Sequelize.Op;
const Store = db.stores;
const {
    QueryTypes
} = require('sequelize');


const addProductAsync = async (req, res = response) => {
    try {

        const {
            stores,
            ...product
        } = req.body;
        let storeList = [];
        stores.forEach(async x => {
            const st = await Store.findByPk(x.id);
            if (st == null) {
                res.status(404).json({
                    ok: 'false',
                    message: 'Store not exit!',
                });
            }
            storeList.push(st);
        })
        let proadd = await Product.create(product);
        proadd.addStores(storeList);
        res.status(200).json({
            ok: 'true',
            message: 'Data Saved successfully..!',
            data: proadd
        });
    } catch (err) {
        //console.log(error);
        res.status(500).json({
            ok: false,
            message: err.message || "Some error occurred while creating the Product."
        });
    }
}

const addProduct = (req, res = response) => {
    try {

        let entidad = req.body;

        Product.create(entidad)
            .then(data => {
                res.status(200).json({
                    ok: 'true',
                    message: 'Data Saved successfully..!',
                    data: data
                });
            })
            .catch(err => {
                res.status(500).send({
                    ok: false,
                    message: err.message || "Some error occurred while creating the Product."
                });
            })
    } catch (error) {
        console.log('Error ', error);
        res.status(500).send({
            ok: false,
            message: err.message || "Some error occurred while creating the Product."
        });
    }
}

const getAllProduct = (req, res = response) => {
    try {
        Product.findAll()
            .then(products => {

                res.status(200).json({
                    ok: true,
                    products
                });
            })
            .catch(err => {
                res.status(404).send({
                    message: err.message + ' eee' || "Some error occurred while retrieving Store."
                });
            });
    } catch (error) {
        console.log('Error Coneccion', error);
        res.status(500).send({
            ok: false,
            message: "Error retrieving Product"
        });
    }
}

/** pages/list/2
 * 
 */
const getListPage = async (req, res = response) => {
    try {
        const size = 10;
        const page = req.params.page;
        var data = await Product.findAndCountAll({
            limit: size,
            offset: (page - 1) * size,
            where: null,
            include: [db.stores, db.categories]
        });
        const {
            count: count,
            rows: products
        } = data;
        console.warn('cccc => ',data.rows.length, page, products.length);
        
        if(products.length == 0){
            console.info('emtro');
            res.status(200).json({
                ok: false,
                message: 'Paginacion Complete'
            })
        }else{

            
            res.status(200).json({
                ok: true,
                count,
                products,
                size,
                page
            })
        }
    

    } catch (err) {
        res.status(404).send({
            ok: false,
            message: err.message || "Error retrieving Product with id=" + id
        });
    }
}
/** getListPaginacion
 * Ruta: '/pages/:page'
 */
const getListPaginacion = (req, res = response) => {
    try {
        const page = req.params.page;
        const size = 10;

        Product.findAndCountAll({
                limit: size,
                offset: (page - 1) * size,
                where: null
            })
            .then(data => {
                const {
                    count: count,
                    rows: products
                } = data;
                console.warn('cccc => ',data.rows.length, page, products.length);
                if(products.length == 0){
                    console.info('emtro');
                    res.status(200).json({
                        ok: false,
                        message: 'Paginacion Complete'
                    })
                }else{

                    res.status(200).json({
                        ok: true,
                        count,
                        products,
                        page,
                    size
                });
                }
            })
            .catch(err => {
                res.status(404).send({
                    message: err.message + ' eee' || "Some error occurred while retrieving Store."
                });
            });

    } catch (error) {

    }
}
/** 
* RUTA: /search/:text
*/
const getListSearch = (req, res = response) => {
    try {
        const page = 1;
        const size = 20;
        const text = req.params.text;
        console.log(text);
        if (!text) {
            res.status(404).send({
                ok: false,
                message: "Text is empty!"
            });
        }
        Product.findAndCountAll({
                limit: size,
                offset: (page - 1) * size,
                where: text ? {
                    name: {
                        [Op.like]: `%${text}%`
                    }
                } : null
            })
            .then(data => {
                //console.log(data);
                const {
                    count: count,
                    rows: products
                } = data;
                res.status(200).json({
                    ok: true,
                    count,
                    products,
                    page,
                    size
                });
            })
            .catch(err => {
                res.status(404).send({
                    message: err.message + ' eee' || "Some error occurred while retrieving Store."
                });
            });

    } catch (error) {

    }
}

const findOneProduct = (req, res = response) => {
    try {

        const id = req.params.id;

        Product.findByPk(id)
            .then(product => {
                if (Object.keys(product).length === 0) {
                    res.status(200).json({
                        ok: true,
                        message: " The Product id not exists"
                    });
                }

                res.status(200).json({
                    ok: true,
                    product
                });
            })
            .catch(err => {
                res.status(404).send({
                    ok: false,
                    message: "Error retrieving Product with id=" + id
                });
            });
    } catch (error) {
        console.log('Services Error ', error);
        res.status(500).send({
            ok: false,
            message: "Error retrieving Product " + error
        });
    }
};


const findOneToMuch = async (req, res = response) => {

    const id = req.params.ix;
    console.log(id.length);
    if (id.length == 0) {
        res.status(404).json({
            ok: false,
            message: 'Params empty!',
        });
    }
    var product = {}

    Product.findByPk(id)
        .then(pro => {
            product = pro.dataValues;
            product.stores = []
            pro.getStores({
                    attributes: ['id', 'name']
                })
                .then(sto => {
                    sto.forEach(x => {
                        product.stores.push({
                            id: x.id,
                            name: x.name
                        })
                    })
                    res.status(200).json({
                        ok: true,
                        product,
                    });
                })
        })
        .catch(err => {
            res.status(404).send({
                ok: false,
                message: err.message || "Error retrieving Product with id=" + id
            });
        });
}

const updateProduct = (req, res) => {
    try {
        const id = req.params.id;
        let entidad = req.body;

        if (entidad == null || Object.keys(entidad).length === 0) {
            res.status(404).json({
                ok: false,
                message: 'body is empty!'
            });
        }

        Product.update(entidad, {
                where: {
                    id: id
                }
            })
            .then(num => {
                if (num == 1) {
                    res.status(200).json({
                        ok: true,
                        message: "Product was updated successfully."
                    })
                } else {
                    res.status(404).json({
                        ok: false,
                        message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
                    });
                }
            })

    } catch (error) {
        console.log('Service ', error);
        res.status(500).send({
            ok: false,
            message: "Error retrieving Product " + error
        });
    }

};

const deleteProduct = (req, res) => {

    const id = req.params.id;

    Product.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    ok: true,
                    message: "Product was deleted successfully!"
                });
            } else {
                res.status(404)({
                    ok: false,
                    message: `Cannot delete product with id=${id}. Maybe Product was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: "Could not delete Product with id=" + id
            });
        });
};


module.exports = {
    addProduct,
    getAllProduct,
    findOneProduct,
    updateProduct,
    deleteProduct,
    getListPaginacion,
    getListSearch,
    addProductAsync,
    findOneToMuch,
    getListPage
}
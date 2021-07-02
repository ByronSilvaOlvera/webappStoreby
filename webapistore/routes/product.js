const { Router } = require('express');
const { addProduct, getAllProduct, findOneProduct , updateProduct, deleteProduct, 
    getListPaginacion , getListSearch, addProductAsync, 
    findOneToMuch, getListPage } = require('../controller/product');

const router = Router();

router.post('/add', addProduct );  
router.post('/addasync', addProductAsync );  
router.get('/pages/list/:page', getListPage );
router.get('/pages/:page', getListPaginacion );
router.get('/search/:text', getListSearch );
router.get('/', getAllProduct );
router.get('/:id', findOneProduct );
router.get('/ix/:ix/', findOneToMuch );
router.put('/update/:id', updateProduct );
router.delete('/delete/:id', deleteProduct );

module.exports = router;

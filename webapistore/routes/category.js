const { Router } = require('express');
const { createEntity, getAllEntity, getIdEntity, UpdateEntity, deleteEntity } = require('../controller/category');

const router = Router();

router.post('/add', createEntity );  
router.get('/', getAllEntity );
router.get('/:id', getIdEntity );
router.put('/update/:id', UpdateEntity );
router.delete('/delete/:id', deleteEntity );

module.exports = router;

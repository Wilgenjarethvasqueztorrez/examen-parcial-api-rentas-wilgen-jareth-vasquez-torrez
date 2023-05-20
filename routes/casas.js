const express = require('express');
const router = express.Router();
const casas = require('../services/casas');

/* GET casas. */
router.get('/', async function (req, res, next) {
    try {
        res.json(await casas.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error mientras se cargan las casas `, err.message);
        next(err);
    }
});

/**
 * POST casas
*/

router.post('/', async function (req, res, next) {
    try {
        res.json(await casas.create(req.body));
    } catch (err) {
        console.error(`Error mientras se crea una casa`, err.message);
        next(err);
    }
});

/* PUT casas */
router.put('/:id', async function (req, res, next) {
    try {
        res.json(await casas.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error mientras se actualizaba una casa`, err.message);
        next(err);
    }
});

/* DELETE casas */
router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await casas.remove(req.params.id));
    } catch (err) {
        console.error(`Error mientras se eliminaba una casa`, err.message);
        next(err);
    }
});

module.exports = router;

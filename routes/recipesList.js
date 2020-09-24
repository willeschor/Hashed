'use strict'
const express = require('express'),
    router = express.Router();
const theList = require('../models/recipesList')

router.get('/', async (req, res) => {
    const recipesList = await theList.getRecipesList(req.session.user_id)
    res.render('template', {
        locals: {
            title: 'Recipes List',
            is_logged_in: req.session.is_logged_in,
            list: recipesList,
            name: req.session.name,
        },
        partials: {
            partial: 'partial-recipesList'
        }
    })
})

router.post('/', async (req, res) => {
    console.log("add:", req.body)
    const response = await theList.createRecipe(req.body, req.session.user_id)
    console.log("add response is:", response)
    await res.redirect('/recipes')
})

module.exports = router;
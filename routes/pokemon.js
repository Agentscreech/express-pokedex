var express = require('express');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.pokemon.findAll().then(function(pokemons){
        res.render('pokemon', {pokemons: pokemons});
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    db.pokemon.create(req.body).then(function(){
            res.redirect('/pokemon');
        });
  // res.send(req.body);
});
//delete pokemon
router.delete('/:id', function(req, res){
    var pokemonToRemove = req.params.id;
    db.pokemon.destroy({
          where: { id: pokemonToRemove }
    }).then(function(pokemonToRemove) {
        res.send();
      // do something when done deleting
    });
});

module.exports = router;

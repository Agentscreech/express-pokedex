var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    db.pokemon.findAll().then(function(pokemons){
        res.render('pokemon', {pokemons: pokemons});
    });
});

router.get('/detail/:name', function(req, res){
    var pokemon = req.params.name;
    var pokemonDetail = "http://pokeapi.co/api/v2/pokemon/" +pokemon;
    request(pokemonDetail, function(error, response, body) {
        var sprite = JSON.parse(body).sprites;
        var stats = JSON.parse(body).stats;
        var height = JSON.parse(body).height * 10;
        var weight = JSON.parse(body).weight / 10;
        res.render('details', {pokemon: pokemon,stats: stats,sprite: sprite,height: height,weight: weight});
    });

});

router.get('/details/:name', function(req,res){
    console.log("details/name request "+req);
    res.render('details');
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

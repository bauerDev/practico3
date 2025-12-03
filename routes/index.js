var express = require('express');
var router = express.Router();
const dataService = require('../data/dataService');


router.get('/', function(req, res, next) {
  const pokemon = dataService.findAllPokemons();
  const tipos = dataService.findAllPokemonTypes();
  res.render('index', { pokemon, tipos });
});


router.get('/pokemon/:id', function(req, res, next) {
  const pokemon = dataService.findPokemonById(req.params.id);
  const tipos = dataService.findAllPokemonTypes();

  if (!pokemon) {
    return res.status(404).send('Pokemon no encontrado');
  }

  res.render('detalle', { pokemon, tipos });
});


router.get('/tipos/:tipo', (req, res, next) => {
  const tipo = req.params.tipo;
  const pokemon = dataService.findAllPokemons().filter(p => p.tipo.includes(tipo));
  const tipos = dataService.findAllPokemonTypes();
  res.render('index', { pokemon, tipos });
});


module.exports = router;
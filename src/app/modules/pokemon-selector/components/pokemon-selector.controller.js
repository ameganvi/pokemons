import GetPokemons from '../../../commons/services/getPokemons' ;

class PokemonSelectorController {

  constructor(GetPokemons) {

   this.getPokemons = GetPokemons

   //Initialisation of the pokemon data
   this.pokemonDetail  = [];
   this.getAllPokemon();}

  //Get all pokemon from json list
  getAllPokemon(){
    var that = this ;
    this.getPokemons.fetchData().then(function(response){
        that.pokemonDetail = response.data;
   });
  }
}

PokemonSelectorController.$inject = ['GetPokemons']
module.exports = PokemonSelectorController

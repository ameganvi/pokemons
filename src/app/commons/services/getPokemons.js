import components from '../components'

components
//get the list of pokemons throught the http get
.service('GetPokemons', function($http) {
  this.fetchData = function() {
              var url = 'https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json';
                    return $http.get(url) ;
            }
});

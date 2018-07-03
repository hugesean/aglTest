(function(exports) {
  "use strict";

  function Pets() {
    this.petList = null;
  }
  exports.Pets = Pets;

  Pets.prototype = {
    getData: function(url) {
      return new Promise(function(resolve, reject) {
          if(url==''||url==null) reject('A url must be provided');
          $.getJSON( url, function(data) {
            resolve(data);
          });
      });
    },
    flattenData: function(data) {
      if (data=='' || data==null) {
        throw new TypeError("Data must be passed to flatten function!");
      }
      var pets=[]
      $.each( data, function( key, owner ) {
             $.each( owner.pets, function( key, pet ) {
                pets.push( {ownerGender:owner.gender,petName:pet.name});
             });
      });
      return pets;
    },
    sortData: function(pets,parameter) {
      if (pets=='' || pets==null) {
        throw new TypeError("Pets array must be passed to sort function!");
      }
      if (parameter==null) {
        throw new TypeError("Sort parameter must be passed to sort function!");
      }
      return _.sortBy(pets,function (pet) { return pet[parameter]; })
    },
    groupData: function(pets,parameter) {
      if (pets=='' || pets==null) {
        throw new TypeError("Pets array must be must be passed to group function!");
      }
      if (parameter==null) {
        throw new TypeError("Group parameter must be passed to group function!");
      }
      return _.groupBy(pets, function (pet) { return pet[parameter]; })
    }
  };
})(this);
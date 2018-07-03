$( document ).ready(function() {
    var pets = new Pets();
    pets.getData("http://agl-developer-test.azurewebsites.net/people.json").then(function(data){
        // Process Data
        pets.petList=pets.flattenData(data);
        pets.petList=pets.sortData(pets.petList,'petName');
        pets.petList=pets.groupData(pets.petList,'ownerGender');
        return pets;
    }).then(function(pets){
        // Display results
        $.each(pets.petList,function(category,pets){
            // Display Category
            $( "#output" ).append($("<div/>",{html:category}));
            // Display Pet List
            $( "#output" ).append($( "<ul/>", {
                html: pets.map(function(elem){
                    return "<li>"+elem.petName+"</li>";
                }).join("")
              })
            );
        });        
    });
});

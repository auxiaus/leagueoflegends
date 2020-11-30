console.log("Hello world");

function App() {
    var championsData;
    var skinsList;
    function retrieveChampions() {
        $.get ("http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/champion.json")
            .done (function (result) {
                championsData = result.data;

                populateChampions();
            })
            
            .fail (function () {
                console.error("Invalid data");
            });
       
    }

    function retrieveSpecificChampion() {
        $.get ("http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/"+championName+".json")
            .done (function (result) {
                skinsList = result.data;

                populateSkins();

                console.log(skinsList);
            })
            
            .fail (function () {
                console.error("Invalid data");
            });
       
    }
    // Populate Skins Drop Down
    function populateSkins() {
        console.log(skinsList);

        var data = skinsList;

        var skins = $(".skin-select");
        var skinsArray = Object.keys(data);
        for (var i = 0; i < skinsArray.length; i++) {
            var option = $("<option>"+skinsArray[i]+"</option>");
            skins.append(option);
        } 

        // Populate selectelement with data
          
        skins.removeAttr("disabled");

        onChampionSelect();

        // var firstOption = $(".champion-select option").first();

        // selectedOption

        var selectedOption = $(".champion-select option:selected");
        updateChampionData(selectedOption.text());
    }

    
    // Populate Champions Drop Down
    function populateChampions() {
        console.log(championsData);

        var data = championsData;

        var champions = $(".champion-select");
        var championArray = Object.keys(data);
        for (var i = 0; i < championArray.length; i++) {
            var option = $("<option>"+championArray[i]+"</option>");
            champions.append(option);
        } 
        // Pupulate selectelement with data
          
        champions.removeAttr("disabled");

        onChampionSelect();
        // var firstOption = $(".champion-select option").first();

        // selectedOption
        var selectedOption = $(".champion-select option:selected");
 
        updateChampionData(selectedOption.text());
    }

    function updateChampionData(championName) {
        // Update all data
        
        console.log("Update data for:", championName);
        var currentChampion =  championsData[championName];
        $(".champion-name").text(currentChampion.name);
        $(".champion-title").text(currentChampion.title);
        $(".attack").text(currentChampion.info.attack);
        $(".defence").text(currentChampion.info.defense);
        $(".magic").text(currentChampion.info.magic);
        $(".difficulty").text(currentChampion.info.difficulty);
        $(".attack-damage").text(currentChampion.stats.attackdamage);
        $(".hitpoints").text(currentChampion.stats.hp);
        $(".armour").text(currentChampion.stats.armor);
        $(".mana").text(currentChampion.stats.mp);
        $(".champion-lore").text(currentChampion.blurb);
        $(".tag-1").text(currentChampion.tags);
        $(".loading-splash").attr("src", "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+currentChampion.name+"_0.jpg");
        $(".result-container::before").css('background-image', 'url('+"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+currentChampion.name+"_0.jpg"+')');
    }

    function onChampionSelect() {
        var champions = $(".champion-select");
       
        champions.on("change", function () {
            var selectedOption = $(".champion-select option:selected");
            updateChampionData(selectedOption.text());
        });
        // Detect when chamption is selected

        // Show data
    }
    retrieveChampions();
    
}

var app = new App();


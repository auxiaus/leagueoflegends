function App() {

    var championsData;
    var specificChampData;

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

    function retrieveSpecificChampion(selected) {
        
        var specificJson = `http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/champion/${ selected }.json`;

        $.get (specificJson)
        .done (function (specificChamp) {
            specificChampData = specificChamp.data;
            populateSkins();
        })
        .fail (function () {
            console.error("Invalid data");
        });
    }

    // Populate Champions Drop Down
    function populateChampions() {

        // console.log(championsData);
        var data = championsData;
        var champions = $(".champion-select");
        var championArray = Object.keys(data);
        for (var i = 0; i < championArray.length; i++) {
            var option = $("<option>"+championArray[i]+"</option>");
            champions.append(option);
        } 

        // Populate selectelement with data
        champions.removeAttr("disabled");
        onChampionSelect();
        var selectedOption = $(".champion-select option:selected"); 
        updateChampionData(selectedOption.text());
    }

    // Populate Skins Drop Down
    function populateSkins() {

        var skinSelector = $(".skin-select");
        var allSkins = [];

        var results = Object.values(specificChampData);
        results.map(i => {
            allSkins = i.skins;
            allSkins.map(skin => {
                var option =  $("<option>"+skin.name+"</option>");
                skinSelector.append(option);
            })
        });
        
        skinSelector.removeAttr("disabled");
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

    function updateChampionData(championName) {
        // Update all data
        var selectedOption = $(".champion-select option:selected");
        var newBackground = "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+selectedOption.text()+"_0.jpg";
        // console.log("Update data for:", championName);
        // console.log(newBackground);
        var currentChampion = championsData[championName];
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
        /* $(".tag-2").text(currentChampion.tags[1]); */
        $(".loading-splash").attr("src", "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+selectedOption.text()+"_0.jpg");  
        $(".result-container-img").attr("src", newBackground);
        
        retrieveSpecificChampion(selectedOption.text());
    }

    retrieveChampions();
    // retrieveSpecificChampion();

}

var app = new App();


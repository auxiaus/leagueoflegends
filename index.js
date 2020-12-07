function App() {

    var championsData;
    var specificChampData;

    function retrieveChampions() {
        $.get ("http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/champion.json")
        .done (function (result) {
            championsData = result.data;
            
            
            populateChampions();

            console.log(championsData);
        })
        .fail (function () {
            console.error("Invalid data");
        });
    }

    function retrieveSpecificChampion(championName) {
        var url = "http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/champion/" + championName + ".json";

        $.get (url)
        .done (function (result) {
            specificChampData = result.data[championName];

            console.log(`${championName} Details:`, specificChampData);
            
            updateChampionData();
            
            populateSkins();
            updateSkinsData();
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

            var champion = championsData[championArray[i]];

            var option = $(`<option value="${champion.id}">${champion.name}, ${champion.title}</option>`);
            champions.append(option);
        } 

        // Populate selectelement with data
        champions.removeAttr("disabled");
        
        onChampionSelect();

        var selectedOption = $(".champion-select option:selected"); 
        retrieveSpecificChampion(selectedOption.val());
    }

    // Populate Skins Drop Down
    function populateSkins() {
        var skinSelector = $(".skin-select");
        var results = Object.values(specificChampData);

        $('.skin-select').find('option').remove();

        specificChampData.skins.map(function (skin){
            // If skin name is default change to "Default Skin"
            var option =  $(`<option value="${skin.num}">${skin.name}</option>`);

            if (skin.name === 'default') {
                option.text("Default");
            }
            skinSelector.append(option);
        });

      
        skinSelector.removeAttr("disabled");

        onSkinSelect();
    }

    function onChampionSelect() {
        var champions = $(".champion-select");
       
        champions.on("change", function () {
            var selectedOption = $(".champion-select option:selected");
            retrieveSpecificChampion(selectedOption.val());
        });
    }

    function onSkinSelect() {
        var skins = $(".skin-select");
       
        skins.on("change", function () {
            var selectedOption = $(".skin-select option:selected");
            updateSkinsData(selectedOption.val());
        });
    }


    // Spell API:
    // http://ddragon.leagueoflegends.com/cdn/10.24.1/img/spell/AatroxQ.png

    // Give it detailed champion object
    function updateChampionData(championName) {
        // Update all data
        var selectedOption = $(".champion-select option:selected");
        
        // console.log("Update data for:", championName);
        // console.log(newBackground);
        var currentChampion = specificChampData;
        console.log(currentChampion);
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
        $(".champion-lore").text(specificChampData.lore);
        $(".tag-1").text(currentChampion.tags);
        $(".q-spell-icon").attr("src", `http://ddragon.leagueoflegends.com/cdn/10.24.1/img/spell/${specificChampData.spells[0].id}.png`)
        $(".w-spell-icon").attr("src", `http://ddragon.leagueoflegends.com/cdn/10.24.1/img/spell/${specificChampData.spells[1].id}.png`)
        $(".e-spell-icon").attr("src", `http://ddragon.leagueoflegends.com/cdn/10.24.1/img/spell/${specificChampData.spells[2].id}.png`)
        $(".r-spell-icon").attr("src", `http://ddragon.leagueoflegends.com/cdn/10.24.1/img/spell/${specificChampData.spells[3].id}.png`)
        $(".q-spell-desc").html(specificChampData.spells[0].description);
        $(".w-spell-desc").html(specificChampData.spells[1].description);
        $(".e-spell-desc").html(specificChampData.spells[2].description);
        $(".r-spell-desc").html(specificChampData.spells[3].description);

        $('.tags').children().remove();    
        var tagsSelector = $('.tags');
        specificChampData.tags.map(function (champTags) {
            console.log("CHAMP TAGS", champTags);
            // If skin name is default change to "Default Skin"
            var tagResult =  $(`<span class="tag">${champTags}</span>`);
            tagsSelector.append(tagResult);
        });
    }

    function updateSkinsData(skinNum) {
        console.log("Find skin", skinNum);

        var championName = specificChampData.id;
        var selectedSkin;

        if (!skinNum) {
            skinNum = specificChampData.skins[0].num;
            selectedSkin = specificChampData.skins[0];
        } else {
            specificChampData.skins.map(function (skin) {
                if (skin.num === skinNum) {
                    selectedSkin = skin;
                }
            });
        }
        
        console.log(selectedSkin);

        $(".result-container-img").attr("src", `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${skinNum}.jpg`);
        $(".loading-splash").attr("src", `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_${skinNum}.jpg`);  
        $(".champion-square").attr("src", `http://ddragon.leagueoflegends.com/cdn/10.24.1/img/champion/${championName}.png`)
    }

    
    retrieveChampions();

}

var app = new App();
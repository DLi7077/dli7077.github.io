function calculate(ID, num) {
  //num is div id
  // alert("Character level is: "+document.getElementById("BATK").value);
  // all variables needed for calculation
  //front stats
  // alert(document.querySelector(`.${ID} > #lv`).value);

  var CharacterLevel = parseFloat(document.querySelector(`.${ID} > #lv`).value); //character level
  var BaseAttack = parseInt(document.querySelector(`.${ID} > #BATK`).value); //base attack for bonuses
  var TotalAttack = parseFloat(document.querySelector(`.${ID} > #FATK`).value); //total attack
  var EnergyRecharge = parseInt(document.querySelector(`.${ID} > #ER`).value); //energy recharge

  //crit
  var CritRate =
    parseFloat(document.querySelector(`.${ID} > #CR`).value) * 0.01;
  var CritDamage =
    parseFloat(document.querySelector(`.${ID} > #CD`).value) * 0.01 + 1;

  //dmg bonuses
  var DmgBonus =
    parseFloat(document.querySelector(`.${ID} > #DMGBonus`).value) * 0.01; //damage bonus
  var SkillScaling =
    parseFloat(document.querySelector(`.${ID} > #SkillScaling`).value) / 100; //skill scaling
  var BurstScaling =
    parseFloat(document.querySelector(`.${ID} > #BurstScaling`).value) / 100; //burst scaling

  //---<FIXED>---identified problem: melt undercalculates dmg, needs boost
  //reaction
  var reaction = "";

  //enemy stats

  var EnemyLevel = parseFloat(document.getElementById("eLv").value);
  var EnemyDefense = 5 * EnemyLevel + 500;
  var Resistance = parseFloat(document.getElementById("resist").value) * 0.01;
  var DefReduce = parseFloat(document.getElementById("DefShred").value) * 0.01;

  var DMGReduction =
    (CharacterLevel + 100) / (CharacterLevel + EnemyLevel + 200);
  var DefMultiplier = DMGReduction;
  if (DefReduce > 0) {
    EnemyDefense -= DefReduce * EnemyDefense;
    DMGReduction = EnemyDefense / (EnemyDefense + 5 * CharacterLevel + 500);
    DefMultiplier = 1 - DMGReduction;
  }

  var OtherBonus = parseFloat(document.getElementById("other").value) * 0.01; //adding other boosts ex: from constellations
  var SkillBonus =
    parseFloat(document.getElementById("otherSkill").value) * 0.01;
  var BurstBonus =
    parseFloat(document.getElementById("otherBurst").value) * 0.01;
  var CharOther =
    parseFloat(document.querySelector(`.${ID}> #otherx`).value) * 0.01;
  var CharSkill =
    parseFloat(document.querySelector(`.${ID}> #otherxS`).value) * 0.01;
  var CharBurst =
    parseFloat(document.querySelector(`.${ID}> #otherxB`).value) * 0.01;
  var AtkBonus = parseFloat(document.querySelector(`#otherAtk`).value) * 0.01;
  var EMBonus = parseFloat(document.querySelector(`#otherEM`).value);
  //elemental reaction

  //var DefMultiplier=1-DMGReduction;  not sure if this is right

  //enemy Defense
  var ResShred = parseFloat(document.getElementById("resShred").value) * 0.01; //count resistance shred like 4pc VV

  if (document.getElementById("4VV").checked) {
    if (
      SkillElement === "Anemo" ||
      SkillElement === "Geo" ||
      SkillElement === "Physical"
    ) {
    } else {
      ResShred += 0.4;
    }
  }

  //change background
  //change class name to div id somehow

  //done
  //changeBG(SkillElement,document.querySelector(`.${ID}`).id);

  //element of skill and target
  var SkillElement = document.querySelector(`.${ID}> #DmgELE`).value; //element of the skill

  var ElementTarget = document.getElementById("AELE").value; //element on target

  var EM = parseFloat(document.querySelector(`.${ID} > #EM`).value) + EMBonus; //Elemental Mastery
  var VapMelt = 0;
  if (document.getElementById("4witch").checked) {
    VapMelt += 0.15;
  }
  //sucrose em buff
  if (document.getElementById("Sucrose").checked) {
    if (document.getElementById("MollisFavonius").checked) {
      EM += 0.2 * parseFloat(document.getElementById("SucroseEM").value);
    }
    if (document.getElementById("CatalystConversion").checked) {
      EM += 50;
    }
  }
  var KazuEM = parseFloat(document.getElementById("KazEM").value);

  if (document.getElementById("Kazuha").checked) {
    if (document.getElementById("C2").checked) {
      KazuEM += 200;
      EM += 200;
    }
    if (document.getElementById("PoF").checked) {
      if (
        SkillElement === "Anemo" ||
        SkillElement === "Geo" ||
        SkillElement === "Physical"
      ) {
      } else {
        DmgBonus += KazuEM * 0.0004;
      }
    }
  }
  //character buffs
  var bennetBase = parseFloat(document.getElementById("bennettBase").value);
  var bennetBonus = parseFloat(document.getElementById("%bonus").value) * 0.01;
  if (document.getElementById("bennett").checked) {
    TotalAttack += bennetBase * bennetBonus;
    if (document.getElementById("BennettC6").checked) {
      if (SkillElement == "Pyro") {
        DmgBonus += 0.15;
      }
    }
  }
  if (document.getElementById("noblesse").checked) {
    BurstBonus += 0.2;
  }
  if (document.getElementById("4noblesse").checked) {
    TotalAttack += 0.2 * BaseAttack;
  }

  if (document.getElementById("Totm").checked) {
    TotalAttack += 0.2 * BaseAttack;
  }

  if (document.getElementById("emblem").checked) {
    if (EnergyRecharge >= 300) {
      BurstBonus += 0.75;
    } else {
      BurstBonus += 0.25 * EnergyRecharge * 0.01;
    }
  }
  if (document.getElementById("archaic").checked) {
    DmgBonus += 0.35;
  }
  if (document.getElementById("Lavawalk").checked) {
    if (ElementTarget == "Pyro") {
      DmgBonus += 0.35;
    }
  }
  if (document.getElementById("thunderSooth").checked) {
    if (ElementTarget == "Electro") {
      DmgBonus += 0.35;
    }
  }
  if (document.getElementById("4instructor").checked) {
    EM += 120;
  }

  if (document.getElementById("adeptus").checked) {
    TotalAttack += 371;
    CritRate += 0.12;
  }

  if (document.getElementById("potion").checked) {
    DmgBonus += 0.25;
  }
  if (document.getElementById("NoTomorrow").checked) {
    CritRate += 0.2;
    CritDamage += 0.2;
  }

  if (document.getElementById("thrillingTales").checked) {
    TotalAttack += 0.48 * BaseAttack;
  }

  //something might be wrong with geoResonance, test it.
  if (document.getElementById("geoRes").checked) {
    DmgBonus += 0.15;
    if (SkillElement == "Geo") {
      ResShred += 0.2;
    }
  }
  if (document.getElementById("supcon").checked) {
    if (SkillElement == "Physical") {
      ResShred += 0.4;
    }
  }

  //final em calculation
  VapMelt += parseFloat((2.78 * EM) / (EM + 1400)); //Melt/ Vaporize bonus
  var ReactionBonus = ElementalReaction(SkillElement, ElementTarget, VapMelt);

  if (document.getElementById("Mona").checked) {
    DmgBonus += parseFloat(document.getElementById("omen%").value) * 0.01;
    if (document.getElementById("MonaC1").checked) {
      if (reaction === "Vaporize") {
        VapMelt += 0.15;
      }
    }
  }
  if (document.getElementById("Sara").checked) {
    TotalAttack +=
      parseFloat(document.getElementById("SaraBase").value) *
      parseFloat(document.getElementById("sara%bonus").value) *
      0.01;
    if (document.getElementById("SaraC6").checked) {
      if (SkillElement == "Electro") {
        CritDamage += 0.6;
      }
    }
  }

  var ResPercent = Resistance - ResShred; //final resistance
  var ResMultiplier = ResistanceCalc(ResPercent); //get actual multiplier

  //final calculation

  DmgBonus += OtherBonus + CharOther;
  //bug w/ other dmg bonuses, hutao w/ 0 is good
  // diluc w/ 15% is .18% off
  //chongyun w/ 60% is 9.6%
  //found out why: noblesse is meant to be in dmg bonus, not dmg scaling
  TotalAttack += AtkBonus * BaseAttack;
  var DMGreduced = DefMultiplier * ResMultiplier * ReactionBonus; //excluding dmg scaling

  //bonus scaling
  var BonusScale = parseFloat(document.getElementById("otherScaling").value);

  var SkillTotal = TotalAttack * SkillScaling + BonusScale;
  var BurstTotal = TotalAttack * BurstScaling;
  if (document.getElementById("ShenHe").checked) {
    if (SkillElement === "Cryo") {
      var ShenHeATK = parseFloat(document.getElementById("ShenHeATK").value);
      var ShenHeScale =
        parseFloat(document.getElementById("ShenHe%Bonus").value) * 0.01;
      SkillTotal += ShenHeATK * ShenHeScale;
      BurstTotal += ShenHeATK * ShenHeScale;
    }
  }

  var SkillOut =
    SkillTotal * DMGreduced * (1 + DmgBonus + SkillBonus + CharSkill);
  var SkillCrit = SkillOut * CritDamage;
  var Skillavg = SkillOut * (1 - CritRate) + SkillCrit * CritRate;

  var BurstOut =
    BurstTotal * DMGreduced * (1 + DmgBonus + BurstBonus + CharBurst);
  var BurstCrit = BurstOut * CritDamage;
  var Burstavg = BurstOut * (1 - CritRate) + BurstCrit * CritRate;

  // document.getElementById("output").textContent='non-crit hit:\t'
  // + IncomingDmg.toFixed(0)
  // +'\nCrit Hit:\t'+IncomingCrit.toFixed(0);

    if(document.getElementById('Mona').checked){
        DmgBonus+=parseFloat(document.getElementById('omen%').value)*.01;
        if(document.getElementById('MonaC1').checked){
            if(reaction==="Vaporize"){
                VapMelt+=.15;
            }
        }
    }
    if(document.getElementById('Sara').checked){
        TotalAttack+=parseFloat(document.getElementById('SaraBase').value)*
        parseFloat(document.getElementById('sara%bonus').value)*.01;
        if(document.getElementById('SaraC6').checked){
            if(SkillElement=='Electro'){
                CritDamage+=.6;
            }
        }
    }

//final calculation
    
    DmgBonus+=OtherBonus+CharOther;
//bug w/ other dmg bonuses, hutao w/ 0 is good
// diluc w/ 15% is .18% off
//chongyun w/ 60% is 9.6%
//found out why: noblesse is meant to be in dmg bonus, not dmg scaling
    TotalAttack+=AtkBonus*BaseAttack;
    
    
//bonus scaling
    var BonusScale=0;
    BonusScale+=parseFloat(document.getElementById('bonusFlatScaling').value);

    var SkillTotal=TotalAttack*SkillScaling+BonusScale;
    var BurstTotal=TotalAttack*BurstScaling+BonusScale;
    if(document.getElementById('ShenHe').checked){
        if(SkillElement==='Cryo'){
            var ShenHeATK=parseFloat(document.getElementById('ShenHeATK').value);
            var ShenHeScale=parseFloat(document.getElementById('ShenHe%Bonus').value)*.01;
            SkillTotal+=ShenHeATK*ShenHeScale;
            BurstTotal+=ShenHeATK*ShenHeScale;
        }
        if(document.getElementById('ShenHeBurst').checked){
            ResShred+=parseFloat(document.getElementById('ShenHeResShred').value*.01);
        }
        if(document.getElementById("ShenHeA1").checked&&SkillElement==='Cryo'){
            DmgBonus+=.15;
        }
        if(document.getElementById("ShenHeA4").checked){
            DmgBonus+=.15;
        }

    }
    

    var ResPercent=Resistance-ResShred;//final resistance
    var ResMultiplier= ResistanceCalc(ResPercent);//get actual multiplier
    var DMGreduced=DefMultiplier*ResMultiplier*ReactionBonus;//excluding dmg scaling

    var SkillOut=SkillTotal*DMGreduced*(1+DmgBonus+SkillBonus+CharSkill);
    var SkillCrit=SkillOut*(CritDamage);
    var Skillavg=SkillOut*(1-CritRate)+SkillCrit*CritRate;

    var BurstOut=BurstTotal*DMGreduced*(1+DmgBonus+BurstBonus+CharBurst);
    var BurstCrit=BurstOut*(CritDamage);
    var Burstavg=BurstOut*(1-CritRate)+BurstCrit*CritRate;



    // document.getElementById("output").textContent='non-crit hit:\t'
    // + IncomingDmg.toFixed(0)
    // +'\nCrit Hit:\t'+IncomingCrit.toFixed(0);


    // //detailed console calculation
    document.querySelector(`#console${num}`).innerHTML=
    'Character level:\t\t'+CharacterLevel+
    '\nAttack:\t\t\t\t'+(TotalAttack.toFixed(1)||0)+
    //'\nAdditive Damage:\t\t'+AddBonus*AddPercent+
    "\nElemental Mastery:\t" +
    EM +
    "\nMelt/ Vaporize Bonus:" +
    ((VapMelt * 100).toFixed(1) || 0) +
    "%" +
    "\nCrit Rate:\t\t\t" +
    (CritRate * 100).toFixed(1) +
    "%\nCrit Damage:\t\t\t" +
    ((CritDamage - 1) * 100).toFixed(1) +
    "%" +
    "\nTarget is affected by: \t" +
    ElementTarget +
    "\nDamage Element is: \t" +
    SkillElement +
    "\nEnergyRecharge%:\t" +
    EnergyRecharge.toFixed(1) +
    "%\nDamage Bonus:\t\t" +
    (DmgBonus * 100).toFixed(1) +
    "%" +
    "\nReactionBonus:\t\t" +
    ReactionBonus.toFixed(2) +
    "\nEnemy Level:\t\t\t" +
    EnemyLevel +
    "\nEnemy Defense:\t\t" +
    EnemyDefense.toFixed(2) +
    "\nResistance Multiplier:" +
    ResMultiplier.toFixed(2) +
    "\nBonus FlatDamage\t\t" +
    BonusScale +
    "\nSkill Out:\t\t\t" +
    SkillOut.toFixed(1) +
    "\nDMG Reduction:\t\t" +
    DMGReduction.toFixed(3) +
    "\nDEF Multiplier:\t\t" +
    DefMultiplier.toFixed(3);

  document.querySelector(`#skill${num}`).innerHTML =
    "SKILL DAMAGE\nNon-Crit:\t" +
    SkillOut.toFixed(0) +
    "\nCrit Hit:\t\t" +
    SkillCrit.toFixed(0) +
    "\nAverage:\t\t" +
    Skillavg.toFixed(0);

  document.querySelector(`#burst${num}`).innerHTML =
    "BURST DAMAGE\nNon-Crit:  \t" +
    BurstOut.toFixed(0) +
    "\nCrit Hit:  \t" +
    BurstCrit.toFixed(0) +
    "\nAverage:  \t" +
    Burstavg.toFixed(0);
  // document.getElementById('console2').style.display='inline-block';
  // document.getElementById('skill2').style.display='inline-block';
  // document.getElementById('burst2').style.display='inline-block';

  // var elements=document.getElementById("Characters").elements;

  // for (var i = 0, element; element = elements[i++];) {
  //     if (element.type === "text" && element.value === "")
  //         alert("some inputs are empty");
  // }

  //fix it so that each box updates ONLY its corresponding console box
}

function unCheck(checkbox) {
  document.getElementById(checkbox).checked = false;
}

function ElementalReaction(skill, target, VapMelt) {
  if (skill === "Pyro" && target === "Cryo") {
    reaction = "Melt";
    return 2 * (1 + VapMelt);
  } else if (skill === "Cryo" && target === "Pyro") {
    reaction = "Melt";
    return 1.5 * (1 + VapMelt);
  } else if (skill === "Pyro" && target === "Hydro") {
    reaction = "Vaporize";
    return 1.5 * (1 + VapMelt);
  } else if (skill === "Hydro" && target === "Pyro") {
    reaction = "Vaporize";
    return 2 * (1 + VapMelt);
  } else {
    return 1;
  }
}

function ResistanceCalc(res) {
  if (res >= 0.75) {
    return 1 / (4 * res + 1);
  } else if (res >= 0) {
    return 1 - res;
  }
  return 1 - res / 2;
}
function ChangeFontColor(Element, cons) {
  var fontColor = document.querySelector(`#char${cons}DMG`);
  var ElementText = document.querySelector(`.character${cons}> #DmgELE`);
  if (Element == "Pyro") {
    fontColor.style.color = "#fd9a00";
    ElementText.style.color = "#fd9a00";
  } else if (Element == "Cryo") {
    fontColor.style.color = "#9bfdfe";
    ElementText.style.color = "#9bfdfe";
  } else if (Element == "Hydro") {
    fontColor.style.color = "#36cdff";
    ElementText.style.color = "#36cdff";
  } else if (Element == "Electro") {
    fontColor.style.color = "#dd9dfd";
    ElementText.style.color = "#dd9dfd";
  } else if (Element == "Anemo") {
    fontColor.style.color = "#5dffd9";
    ElementText.style.color = "#5dffd9";
  } else if (Element == "Geo") {
    fontColor.style.color = "#ffca64";
    ElementText.style.color = "#ffca64";
  } else if (Element == "Physical") {
    fontColor.style.color = "#ffffff";
    ElementText.style.color = "#ffffff";
  }
}

function ChangeEnemyFontColor(Element, cons) {
  var ElementText = document.getElementById(cons);
  if (Element == "Pyro") {
    ElementText.style.color = "#fd9a00";
  } else if (Element == "Cryo") {
    ElementText.style.color = "#9bfdfe";
  } else if (Element == "Hydro") {
    ElementText.style.color = "#36cdff";
  } else if (Element == "Electro") {
    ElementText.style.color = "#dd9dfd";
  } else if (Element == "Anemo") {
    ElementText.style.color = "#5dffd9";
  } else if (Element == "Geo") {
    ElementText.style.color = "#ffca64";
  } else if (Element == "None") {
    ElementText.style.color = "#ffffff";
  }
}

//big brain stuff here
//sets div image based on what element is selected

function changeBG(ElementName, divId) {
  var url = `images/Element_${ElementName}.png`;
  var div = document.getElementById(divId);
  div.style.backgroundImage = `url(${url})`;
}
function show(id, divId) {
  var div = document.getElementById(divId);
  if (document.getElementById(id).checked) {
    div.style.display = "contents";
  }
  if (!document.getElementById(id).checked) {
    div.style.display = "none";
  }
}

function copyOver(from, to) {
  //think it works?
  document.querySelector(`.character${to} > #lv`).value =
    document.querySelector(`.character${from} > #lv`).value;
  document.querySelector(`.character${to} > #BATK`).value =
    document.querySelector(`.character${from} > #BATK`).value;
  document.querySelector(`.character${to} > #FATK`).value =
    document.querySelector(`.character${from} > #FATK`).value;
  document.querySelector(`.character${to} > #EM`).value =
    document.querySelector(`.character${from} > #EM`).value;
  document.querySelector(`.character${to} > #ER`).value =
    document.querySelector(`.character${from} > #ER`).value;
  document.querySelector(`.character${to} > #CR`).value =
    document.querySelector(`.character${from} > #CR`).value;
  document.querySelector(`.character${to} > #CD`).value =
    document.querySelector(`.character${from} > #CD`).value;
  document.querySelector(`.character${to} > #DMGBonus`).value =
    document.querySelector(`.character${from} > #DMGBonus`).value;
  var element = document.querySelector(`.character${from} > #DmgELE`).value;
  document.querySelector(`.character${to} >#DmgELE`).value =
    document.querySelector(`.character${from} > #DmgELE`).value;
  changeBG(element, document.querySelector(`#charac${to}`).id);
  ChangeFontColor(element, to);
  document.querySelector(`.character${to} > #SkillScaling`).value =
    document.querySelector(`.character${from} > #SkillScaling`).value;
  document.querySelector(`.character${to} > #BurstScaling`).value =
    document.querySelector(`.character${from} > #BurstScaling`).value;
  document.querySelector(`.character${to} > #otherx`).value =
    document.querySelector(`.character${from} > #otherx`).value;
  document.querySelector(`.character${to} > #otherxS`).value =
    document.querySelector(`.character${from} > #otherxS`).value;
  document.querySelector(`.character${to} > #otherxB`).value =
    document.querySelector(`.character${from} > #otherxB`).value;
}

function loadBody() {
  //If detects a change, runs the process file function
  document
    .getElementById("imported")
    .addEventListener("change", processFile, false);
}

function processFile() {
  try {
    const uploadedFile = document.getElementById("imported").files[0];
    //console.log(uploadedFile);
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(uploadedFile); //Read as string
    fileReader.onloadend = () => {
      //When done reading
      const configArr = fileReader.result.split(",").map((e) => parseFloat(e));
      //console.log(configArr);
      updateHtmlImport(configArr);
    };
  } catch (err) {
    console.log("No file selected!");
  }
}

function uploadConfig() {
  document.getElementById("imported").click();
}

function updateHtmlImport(configArr) {
  CharacterLevel = configArr[0];
  BaseAttack = configArr[1];
  TotalAttack = configArr[2];
  EM = configArr[3];
  EnergyRecharge = configArr[4];
  CritRate = configArr[5];
  CritDamage = configArr[6];
  DmgBonus = configArr[7];
  SkillScaling = configArr[8];
  BurstScaling = configArr[9];

  document.getElementById("lv").value = CharacterLevel;
  document.getElementById("BATK").value = BaseAttack;
  document.getElementById("FATK").value = TotalAttack;
  document.getElementById("EM").value = EM;
  document.getElementById("ER").value = EnergyRecharge;
  document.getElementById("CR").value = CritRate;
  document.getElementById("CD").value = CritDamage;
  document.getElementById("DMGBonus").value = DmgBonus;
  document.getElementById("SkillScaling").value = SkillScaling;
  document.getElementById("BurstScaling").value = BurstScaling;
  calculate("character1", 1);
  //console.log("File uploaded!");
}

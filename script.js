function calculate(){
    // alert("Character level is: "+document.getElementById("BATK").value);
    // all variables needed for calculation
//front stats
    var CharacterLevel= parseFloat(document.getElementById("lv").value);//character level
    var BaseAttack= parseInt(document.getElementById("BATK").value);//base attack for bonuses
    var TotalAttack= parseFloat(document.getElementById("FATK").value);//total attack
    var EM= parseFloat(document.getElementById("EM").value);//Elemental Mastery
    var VapMelt= parseFloat((2.78*EM)/(EM+1400));//Melt/ Vaporize bonus
//crit
    var CritRate=parseFloat(document.getElementById("CR").value)*.01;
    var CritDamage=parseFloat(document.getElementById("CD").value)*.01+1;

//elemental reaction related
    var SkillElement=document.getElementById("DmgELE").value;//element of the skill
    var ElementTarget=document.getElementById("AELE").value;//element on target
//dmg bonuses
var DmgBonus=parseFloat(document.getElementById("DMGBonus").value)*.01;//damage bonus
var DmgScaling=parseFloat(document.getElementById("Scaling").value)/100;//damage scaling
if(document.getElementById("4witch").checked){
    VapMelt+=.15;
}
var ReactionBonus=ElementalReaction(SkillElement,ElementTarget,VapMelt);
// problem here^^
//identified problem: melt undercalculates dmg, needs boost
    
//enemy stats
    var EnemyLevel=parseFloat(document.getElementById("eLv").value);
    var EnemyDefense=5*EnemyLevel+500;
    var Resistance= parseFloat(document.getElementById("resist").value)*.01;
    
    
    // var Btest=parseFloat(document.getElementById("Btest").value);
    // var Atest=parseFloat(document.getElementById("Atest").value);
    var DMGReduction=EnemyDefense/(EnemyDefense+(5*CharacterLevel)+500);
    var DefMultiplier=1-DMGReduction;
    //play around with this dmg is about 10% off if EnemyLevel+[200]
    
//buffs
    var bennetBase=parseFloat(document.getElementById('bennetBase').value);
    var bennetBonus=parseFloat(document.getElementById('%bonus').value)*.01;
    if(document.getElementById('bennet').checked){
        TotalAttack+=bennetBase*bennetBonus;
    }
    if(document.getElementById('noblesse').checked){
        DmgScaling+=.2;
    }
    if(document.getElementById('4noblesse').checked){
        TotalAttack+=.2*BaseAttack;
    }
    
//final calculation
    var ResShred=parseFloat(document.getElementById("resShred").value)*.01;//count resistance shred like 4pc VV
    var ResPercent=Resistance-ResShred;//final resistance
    var ResMultiplier= ResistanceCalc(ResPercent);//get actual multiplier
    var OtherBoosts=parseFloat(document.getElementById("other").value)*.01;//adding other boosts ex: from constellations
    DmgBonus+=OtherBoosts;
    var OutgoingDamage=TotalAttack*DmgScaling*(1+DmgBonus);
    var IncomingDmg= OutgoingDamage*DefMultiplier*ResMultiplier*ReactionBonus;
    var IncomingCrit=IncomingDmg*CritDamage;

    // document.getElementById("output").textContent='non-crit hit:\t'
    // + IncomingDmg.toFixed(0)
    // +'\nCrit Hit:\t'+IncomingCrit.toFixed(0);


    //detailed console calculation
    document.getElementById("console").textContent=
    'Character level:\t'+CharacterLevel+
    '\nAttack:\t'+TotalAttack+'\nElemental Mastery:\t'+EM
    +'\nMelt/ Vaporize Bonus:\t'+(VapMelt*100).toFixed(1)+'%'
    +'\nCrit Rate:\t'+(CritRate*100).toFixed(1)+'%\nCrit Damage:\t'+((CritDamage-1)*100).toFixed(1)+'%'
    +'\nTarget is affected by: \t'+ElementTarget+'\nDamage Element is: \t'+SkillElement
    +'\nDamage Scaling:\t'+(DmgScaling*100).toFixed(1)+'%\nExisting Damage Bonus:\t'+(DmgBonus*100).toFixed(1)+'%'
    +'\nReactionBonus:\t'+ReactionBonus.toFixed(2)
    +'\nEnemy Level:\t'+EnemyLevel+'\nEnemy Defense:\t'+EnemyDefense.toFixed(1)+'\nResistance Multiplier:\t'+ResMultiplier.toFixed(1)
    +'\nOutgoing Damage:\t'+OutgoingDamage.toFixed(1)+"\nDMG Reduction:\t"+DMGReduction
    +'\nDEF Multiplier:\t'+DefMultiplier
    +'\n\nnon-crit hit:\t'+ IncomingDmg.toFixed(0)
    +'\nCrit Hit:\t'+IncomingCrit.toFixed(0);
    
    // var elements=document.getElementById("Characters").elements;

    // for (var i = 0, element; element = elements[i++];) {
    //     if (element.type === "text" && element.value === "")
    //         alert("some inputs are empty");
    // }
}

function ElementalReaction(skill, target, VapMelt){
    if (skill==='Pyro'&&target==='Cryo'){
        return 2*(1+VapMelt);
    }
    else if(skill==='Cryo'&&target==='Pyro'){
        return 1.5*(1+VapMelt);
    }
    else if(skill==='Pyro'&&target==='Hydro'){
        return 1.5*(1+VapMelt);
    }
    else if(skill==='Hydro'&&target==='Pyro'){
        return 2*(1+VapMelt);
    }
    else{
        return 1;
    }
    
}

function ResistanceCalc(res){
    if(res>=.75){
        return 1/(4*res+1);
    }
    else if(res>=0){
        return 1-res;
    }
    return 1-(res/2);
}
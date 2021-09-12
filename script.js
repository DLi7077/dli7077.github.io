function calculate(ID,num){
    // alert("Character level is: "+document.getElementById("BATK").value);
    // all variables needed for calculation
//front stats
// alert(document.querySelector(`.${ID} > #lv`).value);
    

    var CharacterLevel= parseFloat(document.querySelector(`.${ID} > #lv`).value);//character level
    var BaseAttack= parseInt(document.querySelector(`.${ID} > #BATK`).value);//base attack for bonuses
    var TotalAttack= parseFloat(document.querySelector(`.${ID} > #FATK`).value);//total attack

    
//crit
    var CritRate=parseFloat(document.querySelector(`.${ID} > #CR`).value)*.01;
    var CritDamage=parseFloat(document.querySelector(`.${ID} > #CD`).value)*.01+1;


//dmg bonuses
var DmgBonus=parseFloat(document.querySelector(`.${ID} > #DMGBonus`).value)*.01;//damage bonus
var SkillScaling=parseFloat(document.querySelector(`.${ID} > #SkillScaling`).value)/100;//skill scaling
var BurstScaling=parseFloat(document.querySelector(`.${ID} > #BurstScaling`).value)/100;//burst scaling

// problem here^^
//identified problem: melt undercalculates dmg, needs boost
    
//enemy stats
    
    var EnemyLevel=parseFloat(document.getElementById("eLv").value);
    var EnemyDefense=5*EnemyLevel+500;
    var Resistance= parseFloat(document.getElementById("resist").value)*.01;
    var DefReduce=parseFloat(document.getElementById('DefShred').value)*.01;
    
    
    // var Btest=parseFloat(document.getElementById("Btest").value);
    // var Atest=parseFloat(document.getElementById("Atest").value);
    var DMGReduction=(CharacterLevel+100)/(CharacterLevel+EnemyLevel+200);
    if(DefReduce>0){
        EnemyDefense-=DefReduce*EnemyDefense;
        DMGReduction=EnemyDefense/(EnemyDefense+5*CharacterLevel+500);
    }
    var DefMultiplier=1-DMGReduction;
    

    //var DefMultiplier=1-DMGReduction;  not sure if this is right

    //enemy Defense
    var ResShred=parseFloat(document.getElementById("resShred").value)*.01;//count resistance shred like 4pc VV
    
    if(document.getElementById('4VV').checked){
        ResShred+=.4;
    }
    
    var ResPercent=Resistance-ResShred;//final resistance
    var ResMultiplier= ResistanceCalc(ResPercent);//get actual multiplier
    var OtherBonus=parseFloat(document.getElementById("other").value)*.01;//adding other boosts ex: from constellations
    var SkillBonus=parseFloat(document.getElementById("otherS").value)*.01;
    var BurstBonus=parseFloat(document.getElementById("otherB").value)*.01;
    //elemental reaction 
    var SkillElement=document.getElementById("DmgELE").value;//element of the skill
    var ElementTarget=document.getElementById("AELE").value;//element on target

    //change background
    //change class name to div id somehow

    //done
    //changeBG(SkillElement,document.querySelector(`.${ID}`).id);




    var EM= parseFloat(document.querySelector(`.${ID} > #EM`).value);//Elemental Mastery
    var VapMelt=0;
    if(document.getElementById("4witch").checked){
        VapMelt+=.15;
    }
    //sucrose em buff
    if(document.getElementById('Sucrose').checked){
        if(document.getElementById('MollisFavonius').checked){
            EM+=.2*parseFloat(document.getElementById('SucroseEM').value);
        }
        if(document.getElementById('CatalystConversion').checked){
            EM+=50;
        }
    }
    var KazuEM=parseFloat(document.getElementById('KazEM').value);

    if(document.getElementById('Kazuha').checked){
        if(document.getElementById('PoF').checked){
            if(SkillElement==='Anemo'||SkillElement==='Geo'){
            }
            else{
                DmgBonus+=KazuEM*.0004;
            }
            
        }
        if(document.getElementById('C2').checked){
            EM+=200;
        }
    }

    //final em calculation
    VapMelt+= parseFloat((2.78*EM)/(EM+1400));//Melt/ Vaporize bonus
    var ReactionBonus=ElementalReaction(SkillElement,ElementTarget,VapMelt);

    //character buffs
    var bennetBase=parseFloat(document.getElementById('bennettBase').value);
    var bennetBonus=parseFloat(document.getElementById('%bonus').value)*.01;
    if(document.getElementById('bennett').checked){
        TotalAttack+=bennetBase*bennetBonus;
    }
    if(document.getElementById('noblesse').checked){
        BurstBonus+=.2;
    }
    if(document.getElementById('4noblesse').checked){
        TotalAttack+=.2*BaseAttack;
    }
    
    //something might be wrong with geoResonance, test it.
    if(document.getElementById('geoRes').checked){
        DmgBonus+=.15;
    }

    if(document.getElementById('thrillingTales').checked){
        TotalAttack+=.48*BaseAttack;
    }
    if(document.getElementById('Mona').checked){
        if(document.getElementById('omenDebuff').checked){
            DmgBonus+=parseFloat(document.getElementById('omen%').value)*.01;
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
    
    DmgBonus+=OtherBonus;
//bug w/ other dmg bonuses, hutao w/ 0 is good
// diluc w/ 15% is .18% off
//chongyun w/ 60% is 9.6%
//found out why: noblesse is meant to be in dmg bonus, not dmg scaling
    var DMGreduce=DefMultiplier*ResMultiplier*ReactionBonus;
    var DMGoutput=DMGreduce*TotalAttack;//excluding dmg scaling
    var SkillOut=DMGoutput*(1+DmgBonus+SkillBonus)*SkillScaling;
    var SkillCrit=SkillOut*(CritDamage);
    var Skillavg=SkillOut*(1-CritRate)+SkillCrit*CritRate;

    var BurstOut=DMGoutput*(1+DmgBonus+BurstBonus)*BurstScaling;
    var BurstCrit=BurstOut*(CritDamage);
    var Burstavg=BurstOut*(1-CritRate)+BurstCrit*CritRate;



    // document.getElementById("output").textContent='non-crit hit:\t'
    // + IncomingDmg.toFixed(0)
    // +'\nCrit Hit:\t'+IncomingCrit.toFixed(0);


    // //detailed console calculation
    document.querySelector(`#console${num}`).innerHTML=
    'Character level:\t\t'+CharacterLevel+
    '\nAttack:\t\t\t\t'+TotalAttack.toFixed(1)+'\nElemental Mastery:\t\t'+EM
    +'\nMelt/ Vaporize Bonus:\t'+(VapMelt*100).toFixed(1)+'%'
    +'\nCrit Rate:\t\t\t'+(CritRate*100).toFixed(1)+'%\nCrit Damage:\t\t\t'+((CritDamage-1)*100).toFixed(1)+'%'
    +'\nTarget is affected by: \t'+ElementTarget+'\nDamage Element is: \t'+SkillElement
    +'\nDamage Scaling:\t\t'+(SkillScaling*100).toFixed(1)+'%\nDamage Bonus:\t\t'+(DmgBonus*100).toFixed(1)+'%'
    +'\nReactionBonus:\t\t'+ReactionBonus.toFixed(2)
    +'\nEnemy Level:\t\t\t'+EnemyLevel+'\nEnemy Defense:\t\t'+EnemyDefense.toFixed(1)+'\nResistance Multiplier:\t'+ResMultiplier.toFixed(1)
    +'\nSkill Out:\t\t'+SkillOut.toFixed(1)+"\nDMG Reduction:\t\t"+DMGReduction.toFixed(3)
    +'\nDEF Multiplier:\t\t'+DefMultiplier.toFixed(3);

    document.querySelector(`#skill${num}`).innerHTML=
    'SKILL DAMAGE\nnon-crit hit:\t'+ SkillOut.toFixed(0)
    +'\nCrit Hit:\t\t'+SkillCrit.toFixed(0)
    +'\nAverage:\t\t'+Skillavg.toFixed(0);

    document.querySelector(`#burst${num}`).innerHTML=
    'BURST DAMAGE\nnon-crit hit:\t'+ BurstOut.toFixed(0)
    +'\nCrit Hit:\t\t'+BurstCrit.toFixed(0)
    +'\nAverage:\t\t'+Burstavg.toFixed(0);
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

//big brain stuff here
//sets div image based on what element is selected

function changeBG(ElementName,divId){
    var url=`images/Element_${ElementName}.png`;
    var div= document.getElementById(divId);
    div.style.backgroundImage=`url(${url})`;
}
function show(id,divId){
    var div= document.getElementById(divId);
    if(document.getElementById(id).checked){
        div.style.display="contents";
    }
    if(!document.getElementById(id).checked){
        div.style.display="none";
    }
}

function test(num){
    document.querySelector(`#console${num}`).innerHTML="CHANGED";
}

function copyOver(from,to){//think it works?
    document.querySelector(`.${to} > #lv`).value=document.querySelector(`.${from} > #lv`).value;
    document.querySelector(`.${to} > #BATK`).value=document.querySelector(`.${from} > #BATK`).value;
    document.querySelector(`.${to} > #FATK`).value=document.querySelector(`.${from} > #FATK`).value;
    document.querySelector(`.${to} > #EM`).value=document.querySelector(`.${from} > #EM`).value;
    document.querySelector(`.${to} > #CR`).value=document.querySelector(`.${from} > #CR`).value;
    document.querySelector(`.${to} > #CD`).value=document.querySelector(`.${from} > #CD`).value;
    document.querySelector(`.${to} > #DMGBonus`).value=document.querySelector(`.${from} > #DMGBonus`).value;

    document.querySelector(`.${to} > #DmgELE`).value=document.querySelector(`.${from} > #DmgELE`).value;
    
    document.querySelector(`.${to} > #SkillScaling`).value=document.querySelector(`.${from} > #SkillScaling`).value;
    document.querySelector(`.${to} > #BurstScaling`).value=document.querySelector(`.${from} > #BurstScaling`).value;
    changeBG(document.querySelector(`.${to} > #DmgELE`).value,document.querySelector(`.${to}`).id);

}
function calculate(ID,num){
    // alert("Character level is: "+document.getElementById("BATK").value);
    // all variables needed for calculation
//front stats
// alert(document.querySelector(`.${ID} > #lv`).value); 
    
    var CharacterLevel= parseFloat(document.querySelector(`.${ID} > #lv`).value);//character level
    var BaseAttack= parseInt(document.querySelector(`.${ID} > #BATK`).value);//base attack for bonuses
    var TotalAttack= parseFloat(document.querySelector(`.${ID} > #FATK`).value);//total attack
    var EnergyRecharge=parseInt(document.querySelector(`.${ID} > #ER`).value);//energy recharge
    
//crit
    var CritRate=parseFloat(document.querySelector(`.${ID} > #CR`).value)*.01;
    var CritDamage=parseFloat(document.querySelector(`.${ID} > #CD`).value)*.01+1;


//dmg bonuses
    var DmgBonus=parseFloat(document.querySelector(`.${ID} > #DMGBonus`).value)*.01;//damage bonus
    var SkillScaling=parseFloat(document.querySelector(`.${ID} > #SkillScaling`).value)/100;//skill scaling
    var BurstScaling=parseFloat(document.querySelector(`.${ID} > #BurstScaling`).value)/100;//burst scaling



//---<FIXED>---identified problem: melt undercalculates dmg, needs boost
//reaction
    var reaction= "";
    
//enemy stats
    
    var EnemyLevel=parseFloat(document.getElementById("eLv").value);
    var EnemyDefense=5*EnemyLevel+500;
    var Resistance= parseFloat(document.getElementById("resist").value)*.01;
    var DefReduce=parseFloat(document.getElementById('DefShred').value)*.01;
    
    var DMGReduction=(CharacterLevel+100)/(CharacterLevel+EnemyLevel+200);
    var DefMultiplier=DMGReduction;
    if(DefReduce>0){
        EnemyDefense-=DefReduce*EnemyDefense;
        DMGReduction=EnemyDefense/(EnemyDefense+5*CharacterLevel+500);
        DefMultiplier=1-DMGReduction;
    }
    
    var OtherBonus=parseFloat(document.getElementById("other").value)*.01;//adding other boosts ex: from constellations
    var SkillBonus=parseFloat(document.getElementById("otherSkill").value)*.01;
    var BurstBonus=parseFloat(document.getElementById("otherBurst").value)*.01;
    var CharOther=parseFloat(document.querySelector(`.${ID}> #otherx`).value)*.01;
    var CharSkill=parseFloat(document.querySelector(`.${ID}> #otherxS`).value)*.01;
    var CharBurst=parseFloat(document.querySelector(`.${ID}> #otherxB`).value)*.01;
    var AtkBonus=parseFloat(document.querySelector(`#otherAtk`).value)*.01;
    var EMBonus=parseFloat(document.querySelector(`#otherEM`).value);
        //elemental reaction 

    //var DefMultiplier=1-DMGReduction;  not sure if this is right

    //enemy Defense
    var ResShred=parseFloat(document.getElementById("resShred").value)*.01;//count resistance shred like 4pc VV
    
    if(document.getElementById('4VV').checked){
        if(SkillElement==='Anemo'||SkillElement==='Geo'||SkillElement==='Physical'){
        }
        else{
            ResShred+=.4;
        }
    }
    

    //change background
    //change class name to div id somehow

    //done
    //changeBG(SkillElement,document.querySelector(`.${ID}`).id);

    //element of skill and target
    var SkillElement=document.querySelector(`.${ID}> #DmgELE`).value;//element of the skill
    var ElementTarget=document.getElementById("AELE").value;//element on target

    var EM= parseFloat(document.querySelector(`.${ID} > #EM`).value)+EMBonus;//Elemental Mastery
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
        if(document.getElementById('C2').checked){
            KazuEM+=200;
            EM+=200;
        }
        if(document.getElementById('PoF').checked){
            if(SkillElement==='Anemo'||SkillElement==='Geo'||SkillElement==='Physical'){
            }
            else{
                DmgBonus+=KazuEM*.0004;
            }
        }
        
    }
    //character buffs
    var bennetBase=parseFloat(document.getElementById('bennettBase').value);
    var bennetBonus=parseFloat(document.getElementById('%bonus').value)*.01;
    if(document.getElementById('bennett').checked){
        TotalAttack+=bennetBase*bennetBonus;
        if(document.getElementById('BennettC6').checked){
            if(SkillElement=='Pyro'){
                DmgBonus+=.15;
            }
        }
    }
    if(document.getElementById('noblesse').checked){
        BurstBonus+=.2;
    }
    if(document.getElementById('4noblesse').checked){
        TotalAttack+=.2*BaseAttack;
    }

    if(document.getElementById('Totm').checked){
        TotalAttack+=.2*BaseAttack;
    }

    if(document.getElementById('emblem').checked){
        if(EnergyRecharge>=300){
            BurstBonus+=.75;
        }
        else{
            BurstBonus+=.25*EnergyRecharge*.01;
        }
    }
    if(document.getElementById('archaic').checked){
        DmgBonus+=.35;
    }
    if(document.getElementById('Lavawalk').checked){
        if(ElementTarget=='Pyro'){ 
            DmgBonus+=.35;
        }
    }
    if(document.getElementById('thunderSooth').checked){
        if(ElementTarget=='Electro'){ 
            DmgBonus+=.35;
        }
    }
    if(document.getElementById('4instructor').checked){
        EM+=120;
    }

    if(document.getElementById('adeptus').checked){
        TotalAttack+=371;
        CritRate+=.12;
    }
        
    if(document.getElementById('potion').checked){
        DmgBonus+=.25;
    }
    if(document.getElementById('NoTomorrow').checked){
        CritRate+=.2;
        CritDamage+=.2;
    }

    if(document.getElementById('thrillingTales').checked){
        TotalAttack+=.48*BaseAttack;
    }

    //something might be wrong with geoResonance, test it.
    if(document.getElementById('geoRes').checked){
        DmgBonus+=.15;
        if(SkillElement=="Geo"){
            ResShred+=.2;
        }
    }
    if(document.getElementById('supcon').checked){
        if(SkillElement=='Physical'){
            ResShred+=.4;
        }
    }

    
    
    
    //final em calculation
    VapMelt+= parseFloat((2.78*EM)/(EM+1400));//Melt/ Vaporize bonus
    var ReactionBonus=ElementalReaction(SkillElement,ElementTarget,VapMelt);

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


    var ResPercent=Resistance-ResShred;//final resistance
    var ResMultiplier= ResistanceCalc(ResPercent);//get actual multiplier
    
    
    

//final calculation
    
    DmgBonus+=OtherBonus+CharOther;
//bug w/ other dmg bonuses, hutao w/ 0 is good
// diluc w/ 15% is .18% off
//chongyun w/ 60% is 9.6%
//found out why: noblesse is meant to be in dmg bonus, not dmg scaling
    var DMGreduced=DefMultiplier*ResMultiplier*ReactionBonus;//excluding dmg scaling
    TotalAttack+=AtkBonus*BaseAttack;
    var SkillTotal=TotalAttack*SkillScaling;
    var BurstTotal=TotalAttack*BurstScaling;
    if(document.getElementById('ShenHe').checked){
        if(SkillElement==='Cryo'){
            var ShenHeATK=parseFloat(document.getElementById('ShenHeATK').value);
            var ShenHeScale=parseFloat(document.getElementById('ShenHe%Bonus').value)*.01;
            SkillTotal+=ShenHeATK*ShenHeScale;
            BurstTotal+=ShenHeATK*ShenHeScale;
        }
    }

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
    '\nElemental Mastery:\t'+EM
    +'\nMelt/ Vaporize Bonus:'+((VapMelt*100).toFixed(1)||0)+'%'
    +'\nCrit Rate:\t\t\t'+(CritRate*100).toFixed(1)+'%\nCrit Damage:\t\t\t'+((CritDamage-1)*100).toFixed(1)+'%'
    +'\nTarget is affected by: \t'+ElementTarget+'\nDamage Element is: \t'+SkillElement
    +'\nEnergyRecharge%:\t'+(EnergyRecharge).toFixed(1)+'%\nDamage Bonus:\t\t'+(DmgBonus*100).toFixed(1)+'%'
    +'\nReactionBonus:\t\t'+ReactionBonus.toFixed(2)
    +'\nEnemy Level:\t\t\t'+EnemyLevel+'\nEnemy Defense:\t\t'+EnemyDefense.toFixed(2)+'\nResistance Multiplier:'+ResMultiplier.toFixed(2)
    +'\nSkill Out:\t\t\t'+SkillOut.toFixed(1)+"\nDMG Reduction:\t\t"+DMGReduction.toFixed(3)
    +'\nDEF Multiplier:\t\t'+DefMultiplier.toFixed(3);

    document.querySelector(`#skill${num}`).innerHTML=
    'SKILL DAMAGE\nNon-Crit:\t'+ SkillOut.toFixed(0)
    +'\nCrit Hit:\t\t'+SkillCrit.toFixed(0)
    +'\nAverage:\t\t'+Skillavg.toFixed(0);

    document.querySelector(`#burst${num}`).innerHTML=
    'BURST DAMAGE\nNon-Crit:  \t'+ BurstOut.toFixed(0)
    +'\nCrit Hit:  \t'+BurstCrit.toFixed(0)
    +'\nAverage:  \t'+Burstavg.toFixed(0);
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

function unCheck(checkbox){
    document.getElementById(checkbox).checked=false;
}

function ElementalReaction(skill, target, VapMelt){
    if (skill==='Pyro'&&target==='Cryo'){
        reaction="Melt";
        return 2*(1+VapMelt);
    }
    else if(skill==='Cryo'&&target==='Pyro'){
        reaction="Melt";
        return 1.5*(1+VapMelt);
    }
    else if(skill==='Pyro'&&target==='Hydro'){
        reaction="Vaporize";
        return 1.5*(1+VapMelt);
    }
    else if(skill==='Hydro'&&target==='Pyro'){
        reaction="Vaporize";
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
function ChangeFontColor(Element,cons){
    var fontColor=document.querySelector(`#char${cons}DMG`);
    
    if(Element=='Pyro'){
        fontColor.style.color='#fd9a00';
    }
    if(Element=='Cryo'){
        fontColor.style.color='#9bfdfe';
    }
    if(Element=='Hydro'){
        fontColor.style.color='#36cdff';
    }
    if(Element=='Electro'){
        fontColor.style.color='#dd9dfd';
    }
    if(Element=='Anemo'){
        fontColor.style.color='#5dffd9';
    }
    if(Element=='Geo'){
        fontColor.style.color='#ffca64';
    }
    if(Element=='Physical'){
        fontColor.style.color='#ffffff';
    }
    // else{
    //     fontColor.style.color="white";
    // }//why is that this is the first priority??

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

function copyOver(from,to){//think it works?
    document.querySelector(`.${to} > #lv`).value=document.querySelector(`.${from} > #lv`).value;
    document.querySelector(`.${to} > #BATK`).value=document.querySelector(`.${from} > #BATK`).value;
    document.querySelector(`.${to} > #FATK`).value=document.querySelector(`.${from} > #FATK`).value;
    document.querySelector(`.${to} > #EM`).value=document.querySelector(`.${from} > #EM`).value;
    document.querySelector(`.${to} > #ER`).value=document.querySelector(`.${from} > #ER`).value;
    document.querySelector(`.${to} > #CR`).value=document.querySelector(`.${from} > #CR`).value;
    document.querySelector(`.${to} > #CD`).value=document.querySelector(`.${from} > #CD`).value;
    document.querySelector(`.${to} > #DMGBonus`).value=document.querySelector(`.${from} > #DMGBonus`).value;

    var element=document.querySelector(`.${from} > #DmgELE`).value;
    document.querySelector(`.${to} > #DmgELE`).value=element;
    changeBG(document.querySelector(`.${to} > #DmgELE`).value,document.querySelector(`.${to}`).id);
    ChangeFontColor(element,String(to)[9]);
    document.querySelector(`.${to} > #SkillScaling`).value=document.querySelector(`.${from} > #SkillScaling`).value;
    document.querySelector(`.${to} > #BurstScaling`).value=document.querySelector(`.${from} > #BurstScaling`).value;
    document.querySelector(`.${to} > #otherx`).value=document.querySelector(`.${from} > #otherx`).value;
    document.querySelector(`.${to} > #otherxS`).value=document.querySelector(`.${from} > #otherxS`).value;
    document.querySelector(`.${to} > #otherxB`).value=document.querySelector(`.${from} > #otherxB`).value;
}

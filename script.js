

function displayInputRangeValue(id, value) {
    document.getElementById(id).innerHTML = value;
}

const rechnerForm = document.getElementById("rechnerForm")

rechnerForm.addEventListener("submit", e => {
e.preventDefault();
rechner();
});

rechnerForm.addEventListener("click", function(event) {
    const target = event.target;
    targetClassList = target.classList;
    const label = target.parentElement.parentElement.getAttribute('for');
    inputElement = rechnerForm.elements[label];
    console.log(inputElement);
    const step = inputElement.getAttribute('step');
    console.log(step);
    plus = targetClassList.contains("number-right");
    plusandminusFields2(plus, inputElement, step)
    rechner();
    
}
);

function rechner() {
    const anzahlTeigballenElement = rechnerForm.elements["Anzahl-Teigballen"];
    const anzahlTeigballen = anzahlTeigballenElement.value;

    const teigballengewichtElement = rechnerForm.elements["teigballengewicht"];
    const teigballengewicht = teigballengewichtElement.value;

    const Gesamtmenge = anzahlTeigballen * teigballengewicht;

    document.getElementById("hauptteigMenge").innerHTML = Gesamtmenge + "g";

    const wasserAnteil = rechnerForm.elements["wasser"].value / 100;
    const salzAnteil = rechnerForm.elements["salz"].value / 100;
    const mehlAnteil = mehlAnteilBerechnen(wasserAnteil, salzAnteil);
    const mehlMenge1 = mehlAnteil * Gesamtmenge;

    document.getElementById("mehlAnteilSpan").innerHTML = Math.round(mehlMenge1) + "g";
    document.getElementById("wasserAnteilSpan").innerHTML = Math.round(wasserAnteil * mehlMenge1) + "g";
    document.getElementById("salzAnteilSpan").innerHTML = Math.round(salzAnteil * mehlMenge1) + "g";

    const hefetypElement = rechnerForm.elements["hefetyp"];
    const hefetyp = hefetypElement.value;

    const gehzeitElement = rechnerForm.elements["gehzeit"];
    const gehzeit = gehzeitElement.value;

    const temperaturElement = rechnerForm.elements["raumtemperatur"];
    const temperatur = temperaturElement.value;
    const hefeMenge = hefeBerechnen(hefetyp, mehlMenge1, gehzeit, temperatur);
    const hefeMengeGerundet = hefeMenge.toFixed(4);
    document.getElementById("hefeAnteilSpan").innerHTML = hefeMengeGerundet + "g";
}

function hefeBerechnen(hefetyp, mehlMenge, gehzeit, temperatur) {
    // Skalierungsfaktor für Frische Hefe (andere Hefetypen können leicht ergänzt werden)
    const skalenfaktor = 
    hefetyp === "Frische Hefe" ? 1452.44 :
    hefetyp === "Aktive Trockenhefe" ? 1452.44 * 0.51111111111 :
    hefetyp === "Instant Trockenhefe" ? 1452.44 * 0.42222222222 :
    hefetyp === "Trockene Lievito Madre" ? 1452.44  * 42.4444444 :
    hefetyp === "Flüssige Lievito Madre" ? 1452.44 * 32 :
    1452.44;

    console.log("Hefetyp:" + hefetyp);


    // Parameter der Formel
    //const exponentGehzeit = -1.38;
    const exponentGehzeit = -1.34048 * (1 - 0.00023119662); //passt bei 22 Grad 22 h
    const exponentTemperatur = 0.165;

    // Berechnung der Hefemenge basierend auf Gehzeit und Temperatur
    let hefemenge = skalenfaktor * Math.pow(gehzeit, exponentGehzeit) * Math.exp(-exponentTemperatur * temperatur);

    // Optional: Menge an Mehl berücksichtigen (proportional zur Hefemenge, falls benötigt)
    // Beispiel: Falls Mehlmenge standardisiert werden soll
    if (mehlMenge > 0) {
        hefemenge *= mehlMenge / 1000; // Basis: 1kg Mehl
    }

    // Ergebnis zurückgeben
    console.log("Hefemgen:" + hefemenge);
    return hefemenge; 
}

function plusandminusFields2(plus, inputElement, step) {
    const max = parseInt(inputElement.max *10);
    const min = parseInt(inputElement.min *10);
    const currentValue = parseInt(inputElement.value *10);
    const stepInt = parseInt(step *10);

    if (plus && max > currentValue) {
        currentValue
        const wert = currentValue + stepInt;
        inputElement.value = wert/10;
    } else if (!plus && min < currentValue) {
        const wert = currentValue - stepInt;
        inputElement.value = wert/10;
    } else {
        console.log("Grenzwert erreicht");
    }

    return
};




//Button ausgrauen wenn der Grenzwert erreicht ist :)

/*
 hefeBerechnen Notizen:
Umso höher die Temeperatur umso weniger Hefe
Umso länger die Gehzeit umso weniger Hefe
Danach eigentlich nur umrechnungen wieviel Hefe von verschiedenen Typen Hefe in frische Hefe ist
- da Hefe in der PizzApp weniger wird umso mehr Wasser wir haben muss es auch von der Mehlmenge ausgehen

Ich suche mir erst die beiden Edge cases raus:
Standardwerte sind immer 6 teigballen a 200g 60% Wasser 3% Salz

1h Gehzeit 22 Grad = 38,3g Hefe
1h Gehzeit 10 Grad = 278g Hefe
1h Gehzeit 40 Grad = 1,4g Hefe
100h Gehzeit 22 Grad = 0,05g Hefe
100h Gehzeit 10 Grad = 0,46g Hefe
100h Gehzeit 40 Grad = 0,002g Hefe
50h Gehzeit 40 Grad = 0,005g Hefe
50h Gehzeit 30 Grad = 0,031g Hefe
50h Gehzeit 22 Grad = 0,14g Hefe
50h Gehzeit 10 Grad = 1,27g Hefe

*/


function mehlAnteilBerechnen(wasserAnteil, salzAnteil) {
    const mehlAnteil = 1/(1+wasserAnteil+salzAnteil);
    return mehlAnteil;
};


function calculateGesamtmenge(anzahl, gewichtpro) {
return anzahl * gewichtpro;
};

//Gesamtmenge mal Bäckerprozente (einfach gute Rezepte herraussuchen und auf Bäckerprozente rechnen)





function calculateMengen() {
    //Wasser auch vom Mehltyp abhänig
}


/* Notizen:
https://www.pizzamaking.com/forum/index.php/topic,22649.0.html#google_vignette
https://www.wraithnj.com/breadpics/rise_time_table/bread_model_bwraith.html
https://www.researchgate.net/publication/369585819_Study_of_Physico-Chemical_Properties_of_Dough_and_Wood_Oven-Baked_Pizza_Base_The_Effect_of_Leavening_Time

Eventuelle Ergänzungen:
Man könnte noch eine Einstellung für Pizza Style machen und dann würde man voreingestellte werte erhalten für Hydration etc. vielleicht auch einen schwierigkeitsgrad
Oben eine Einstellung für "Profi-Modus"
Nutzer sollen Feedback geben können wie gut Ihr Ergebnis war und was geändert werden soll

Wichtig:
Glutenrot?
Der PH Wert hat auch einen Einfluss
Higher hydration doughs ferment more quickly.

Gehen wir es doch einfach logisch an: Wie schnell vermehrt sich Hefe bei welcher Temperatur?
*/
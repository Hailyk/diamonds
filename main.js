'use strict';

function button_save(){
    let dataSave = {};
    dataSave.numberQuestion = numberQuestion();
    dataSave.initDiff = initDiff();
    dataSave.diffSlope = diffSlope();
    dataSave.initNum = initNum();
    dataSave.numSlope = numSlope();
    dataSave.maxMult = maxMult();
    saveData(dataSave);
}

function button_load(){
    let dataLoaded = loadData();
    numberQuestion(dataLoaded.numberQuestion);
    initDiff(dataLoaded.initDiff);
    diffSlope(dataLoaded.diffSlope);
    initNum(dataLoaded.initNum);
    numSlope(dataLoaded.numSlope);
    maxMult(dataLoaded.maxMult);
}

function button_print_question(){
    if(!ui.notGenerated){
        window.open('./render.html?type=question', '_blank');
    }
}

function button_print_answer(){
    if(!ui.notGenerated){
        window.open('./render.html?type=answer', '_blank');
    }
}

function generateQuestions(){
    let d = linear(diffSlope()/100,initDiff());
    let n = linear(numSlope()/100, initNum());
    let m = maxMult();
    let q = numberQuestion();
    let genQuestions = generate(d,n,m,q);
    localStorage.setItem("answer", JSON.stringify(genQuestions[0]));
    localStorage.setItem("question", JSON.stringify(genQuestions[1]));
    ui.notGenerated = false;
    return genQuestions;
}

function loadData(){
    let data = JSON.parse(localStorage.getItem("save"));
    if(data == null) {
        data = {
            numberQuestion:"30",
            initDiff: "0",
            diffSlope: "12",
            initNum: "12",
            numSlope: "2",
            maxMult: "10",
            notGenerated: true
        }
    }
    data.notGenerated = true;
    return data;
}

function saveData(data){
    data = JSON.stringify(data);
    return localStorage.setItem("save", data);
}

function numberQuestion(number){
    if(number != undefined){
        ui.numberQuestion = number;
    }
    else{
        return ui.numberQuestion;
    }
    return null;
}

function initDiff(number){
    if(number != undefined){
        ui.initDiff = number;
    }
    else{
        return ui.initDiff;
    }
    return null;
}

function diffSlope(number){
    if(number != undefined){
        ui.diffSlope = number;
    }
    else{
        return ui.diffSlope;
    }
    return null;
}

function initNum(number){
    if(number != undefined){
        ui.initNum = number;
    }
    else{
        return ui.initNum;
    }
    return null;
}

function numSlope(number){
    if(number != undefined){
        ui.numSlope = number;
    }
    else{
        return ui.numSlope;
    }
    return null;
}

function maxMult(number){
    if(number != undefined){
        ui.maxMult = number;
    }
    else{
        return ui.maxMult;
    }
    return null;
}

let data = loadData();

var ui = new Vue({
  el: '#interface',
  data: data,
  methods: {
    button_save: button_save,
    button_load: button_load,
    generate: generateQuestions,
    button_print_question: button_print_question,
    button_print_answer: button_print_answer
  }
})

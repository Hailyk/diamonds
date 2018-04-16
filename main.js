'use strict';

function button_save(){
    let dataSave = {};
    dataSave.l1 = l1();
    dataSave.l2 = l2();
    dataSave.l3 = l3();
    dataSave.l4 = l4();
    dataSave.initNum = initNum();
    dataSave.numSlope = numSlope();
    dataSave.maxMult = maxMult();
    saveData(dataSave);
}

function button_load(){
    let dataLoaded = loadData();
    l1(dataLoaded.l1);
    l2(dataLoaded.l2);
    l3(dataLoaded.l3);
    l4(dataLoaded.l4);
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
    let d = [l1(),l2(),l3(),l4()];
    let n = linear(numSlope()/100, initNum());
    let m = maxMult();
    let genQuestions = generate(d,n,m);
    localStorage.setItem("answer", JSON.stringify(genQuestions[0]));
    localStorage.setItem("question", JSON.stringify(genQuestions[1]));
    ui.notGenerated = false;
    return genQuestions;
}

function loadData(){
    let data = JSON.parse(localStorage.getItem("save"));
    if(data == null) {
        data = {
            l1: "5",
            l2: "5",
            l3: "5",
            l4: "5",
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

function l1(number){
    if(number != undefined){
        ui.l1 = number;
    }
    else{
        return ui.l1;
    }
    return null;
}

function l2(number){
    if(number != undefined){
        ui.l2 = number;
    }
    else{
        return ui.l2;
    }
    return null;
}

function l3(number){
    if(number != undefined){
        ui.l3 = number;
    }
    else{
        return ui.l3;
    }
    return null;
}

function l4(number){
    if(number != undefined){
        ui.l4 = number;
    }
    else{
        return ui.l4;
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

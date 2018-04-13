'use strict';


let data ={ 
    diamonds:[
        {id:0,a:1,b:1,c:2,d:1},
        {id:1,a:3,b:2,c:3,d:5},
        {id:2,a:5,b:8,c:5,d:8}
    ]
}

Vue.component('cell', {
    template: '#template',
    props: ['diamond']
});

let diamonds = new Vue({
    el:"#sheet",
    data(){
        return data
    }
});

function saveArray(data){
    localStorage.setItem('answer', data[0]);
    localStorage.setItem('question', data[1]);
}

function getArray(answer){
    if(answer){
        return localStorage.getItem('answer');
    }
    return localStorage.getItem('question');
}

function generateToVueInterface(data){
    let newArray = [];
    for(let i = 0; i<data.length; i++){
        newArray[i] = {
            id:i,
            a:data[i][0],
            b:data[i][1],
            c:data[i][2],
            d:data[i][3],
        }
    }
    return newArray;
}

function createQuestion(number, difficult, numberRange, answer){
    let diamondQuestions = generate(difficult, numberRange, diffBTWAB, number);
    saveArray(diamondQuestions);
    if(answer){
        data.diamonds = generateToVueInterface(diamondQuestions[0]);
    }
    data.diamonds = generateToVueInterface(diamondQuestions[1]);
}

let diff = new linear(.25, 1); // difficulty modifier linear equation any 1 - 4 scale >4 --> 4
    
let numMul = new linear(.15, 1); // number modifier linear equation

let diffBTWAB = 20; // max difference between left and right number

let numberOfQuestion = 35; //how many questions to generate

createQuestion(numberOfQuestion, diff, numMul, false);
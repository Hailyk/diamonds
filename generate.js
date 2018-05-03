'use strict';

function getSum(a, b){
    return a + b;
}

function getProduct(a, b){
    return a * b;
}

function cloneObj(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = new obj.constructor(); 
    for(var key in obj)
        temp[key] = cloneObj(obj[key]);

    return temp;
}

function randomNumber(amount, whole, min, max){
    max = max + 1;
    let numArray = [];
    for(let i = 0; i < amount; i++){
        let number = Math.random() * (max-min) + min;
        if(whole){
            number = Math.floor(number);
        }
        numArray[i] = number;
    }
    return numArray;
}

function generateAnswer(a, b){
    let ansArr = [a,b];
    ansArr[2] = getProduct(a,b);
    ansArr[3] = getSum(a,b);
    return ansArr;
} 

function difficulty(diff, diamonObj){
    if(diff > 3){
        diff = 3;
    }
    if(diff == 0){
        diamonObj[2] = "";
        diamonObj[3] = "";
    }
    else if(diff == 1){
        diamonObj[3] = "";
        const toRemove = Math.round(Math.random());
        diamonObj[toRemove] = "";
        
    }
    else if(diff == 2){
        diamonObj[2] = "";
        const toRemove = Math.round(Math.random());
        diamonObj[toRemove] = "";
    }
    else{
        diamonObj[0] = "";
        diamonObj[1] = "";
    }
    return diamonObj;
}

function linear(m,b){
    let linearObj = {};
    linearObj.m = m;
    linearObj.b = b;
    linearObj.getY = function(x){
        return (this.m * x) + this.b;
    };
    linearObj.getX = function(y){
        return (y-this.b)/this.m;
    };
    return linearObj;
}

function generate(diff, max, min){
    
    let numQuest = Number(diff[0]) + Number(diff[1]) + Number(diff[2]) + Number(diff[3]);
    
    let questions = [[],[]];
    let diamonds = [];
    for(let i = 0; i < numQuest; i++){
        let numbers = randomNumber(2, true , parseInt(min), parseInt(max));
        
        let answer = generateAnswer(numbers[0],numbers[1]);
        questions[0][i] = {
            id:i,
            a:answer[0],
            b:answer[1],
            c:answer[2],
            d:answer[3],
        }
        
        diamonds[i] = answer;
    }
    
    let c=0;
    let difficultyTracker = [Number(diff[0]),Number(diff[1]),Number(diff[2]),Number(diff[3])];
    for(let i = 0;i<numQuest;i++){
        let d = -1;
        let taken = true
        while(taken == true){
            d = Math.round(Math.random()*3);
            if(d == 0){
                if(difficultyTracker[0] > 0){
                    difficultyTracker[0]--;
                    taken = false;
                }
            }
            else if(d == 1){
                if(difficultyTracker[1] > 0){
                    difficultyTracker[1]--;
                    taken = false;
                }
            }
            else if(d == 2){
                if(difficultyTracker[2] > 0){
                    difficultyTracker[2]--;
                    taken = false;
                }
            }
            else if(d == 3){
                if(difficultyTracker[3] > 0){
                    difficultyTracker[3]--;
                    taken = false;
                }
            }
            else{
                throw Error("Error Generating Difficulty,"+d+" is out of range generated");
            }
        }
        
        let q = difficulty(d,diamonds[c]);
            questions[1].push({
                id:c,
                a:q[0],
                b:q[1],
                c:q[2],
                d:q[3],
            });
            c++;
    }
    
    return questions;
}
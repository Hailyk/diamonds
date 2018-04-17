'use strict';
function readStorage(answer){
    if(answer){
        return JSON.parse(localStorage.getItem('answer'));
    }
    return JSON.parse(localStorage.getItem('question'));
}
function renderView(renderObj){
    data.diamonds = renderObj;
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
let data ={ 
    diamonds:[]
}
Vue.component('cell', {
    template: '#template',
    props: ['diamond']
});
let diamonds = new Vue({
    el:"#sheet",
    data(){
        return data;
    }
});
let list = {}
if(getParameterByName("type") == "answer"){
    console.log("answer");
    list = readStorage(true);
}
else{
    list = readStorage(false);
    
}
renderView(list);
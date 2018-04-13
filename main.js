'use strict';


    let data ={ 
        diamonds:[
            {id:0,a:1,b:1,c:2,d:1},
            {id:1,a:3,b:2,c:3,d:5},
            {id:2,a:5,b:8,c:5,d:8}
        ]
    }
    
    /*global Vue*/
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
    
    generate();

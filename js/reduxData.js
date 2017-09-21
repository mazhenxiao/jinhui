import {createStore} from "redux";
let $state={
    "INDEX":{
        actionCode:"abc"
    }
}

class data {
    constructor(){
       this.store = createStore(this.reducer);
       this.state = $state;         
    }
    reducer(state,action){
        state = $state;
        console.log(action);
        console.log("==========")
        switch(action.type){
            case "INDEX": return Object.assign({},state.INDEX,{ actionCode:action.actionCode}); break;
            default:return state
        }
    }

}
let $redux = new data();
export {$redux};
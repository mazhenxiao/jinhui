import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import {createStore} from "redux";
class store{
    state={
        primarykey:[]
    }
    counter(state,action){
        let {type}=action;
        switch(type){
            case "primarykey":this.bindPrimarykey();break;
        }
    }
    bindPrimarykey(){
        
    }
}
export default new store()
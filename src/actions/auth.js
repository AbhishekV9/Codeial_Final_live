import { APIUrls } from "../helpers/url";
import { LOGIN_START } from "./actionTypes";
import { getFormBody } from "../helpers/utils";


export function startLogin(){
    return{
        type:LOGIN_START,
    }
}

export function login(email,password){  //this is the asynchronus action, the action which will require redux thunk package,since this is an asynchronus action we will be returning a function from this
    return (dispatch)=>{
        const url=APIUrls.login();
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded' //my api are built in such a way that they require the data,whatever we are sending it to the server in a particular format that format is url-form-encoded so we have ro set that in headers and here i need to set the content type because i am sending the content type of a url-form-encoded and the form-encoded-url looks like:- application/x-www-form-urlencoded
            },
            body:getFormBody({email,password}) //body should also of type form-url-encoded

        });
    }

}
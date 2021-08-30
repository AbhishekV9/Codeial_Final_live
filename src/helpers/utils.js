export function getFormBody (params) {
    let formBody = [];

    for(let property in params){
        let encodedKey= encodeURIComponent(property);  // 1-'user name' =>2- 'user%20name' ---> 2 is urlencoded string of 1 and we want to convert string into urlencoded string that's why we are using encodeURIComponent
        let encodedValue =encodeURIComponent(params[property]);

        formBody.push(encodedKey+'=' + encodedValue);
    }
    return formBody.join('&'); // 'username=aalash&password=123 ---this will join both key and value like this
}
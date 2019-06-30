const https = require("https");
const path = require("path");
const fs = require("fs");
const getAccessToken = () => {
    let url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx2d67d747f8724544&secret=60676c2e59d0b83cf37cbdeca7e0b79b"

    let AccessToken = JSON.parse(fs.readFileSync(path.join(__dirname, "../json/AccessToken.json")));

    if (setTime() < AccessToken.expires_time) {
        return new Promise(resolve => {
            resolve(AccessToken.access_token);
        })
    } else {
        return new Promise((resolve) => {
            https.get(url, (res) => {
                let str = "";

                res.on("data", (data) => {
                    str += data;
                })

                res.on("end", () => {
                    let result = JSON.parse(str);
                    result.expires_time = setTime() + 7000;
                    fs.writeFileSync(path.join(__dirname, "../json/AccessToken.json"), JSON.stringify(result));
                    resolve(result.access_token);
                })
            })
        })
    }
}


const getjsapiTicket = (AccessToken) => {

    let url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${AccessToken}&type=jsapi`
    let jsapiTicket = JSON.parse(fs.readFileSync(path.join(__dirname, "../json/jsapiTicket.json")));
    console.log()
    if (setTime() < jsapiTicket.expires_time) {
        return new Promise(resolve => {
            resolve(jsapiTicket);
        })
    }else{
        return new Promise(resolve => {
            https.get(url, (res) => {
                let str = "";
                res.on("data", (data) => {
                    str += data;
                })
    
                res.on("end", () => {
                    let strObj = JSON.parse(str);
                    strObj.expires_time = setTime() + 7000;
                    fs.writeFileSync(path.join(__dirname, "../json/jsapiTicket.json"), JSON.stringify(strObj));
                    resolve(strObj);
                })
            })
        })
    }

    
}


const setTime = () => {
    return parseInt(new Date().getTime() / 1000);
}

module.exports = {
    getAccessToken,
    getjsapiTicket,
    setTime
}
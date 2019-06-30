const utils = require("../utils");
const sha1 = require("sha1")
const getJsSdk = async (req,res)=>{
    //获取accesstoken
    let AccessToken = await utils.getAccessToken();
    //获取jsapi_ticket
    let jsapi_ticket = await utils.getjsapiTicket(AccessToken);
    //设置随机字符串
    let noncestr = Math.random().toString(36).substr(2,15);
    //设置jsapi_ticket
    let ticket = jsapi_ticket.ticket;
    //设置时间戳
    let timestamp = utils.setTime();
    //设置url地址,这里应该是用户的url地址,通过req.query.url进行获取
    let url = "https://alleyzyh.natappvip.cc/"

    //进行字典排序以及sha1的加密
    let signature = sha1(`jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`);
    //发送给客户端
    res.send({
        appId: 'wx2d67d747f8724544', // 必填，公众号的唯一标识
        timestamp:timestamp , // 必填，生成签名的时间戳
        nonceStr: noncestr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名
    })
}   

module.exports = {
    getJsSdk
}
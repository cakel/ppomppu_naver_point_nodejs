import rp from "request-promise";
import jsdom from "jsdom";
import {Iconv} from "iconv";
import jschardet from "jschardet";
import randomUseragent from'random-useragent';

// Credit : https://min9nim.vercel.app/2018-11-19-node-scrapping/
function anyToUtf8(str) {
    const {encoding} = jschardet.detect(str);
    // console.log("source encoding = " + encoding);
    const iconv = new Iconv(encoding, 'utf-8//translit//ignore');
    return iconv.convert(str).toString();
}
rp({url:"https://www.ppomppu.co.kr/zboard/zboard.php?id=coupon&page_num=30&category=&search_type=sub_memo&keyword=%B3%D7%C0%CC%B9%F6",   headers: {
    'User-Agent': randomUseragent.getRandom((ua) => ua.deviceType === "")
  }, encoding:null})
    .then(anyToUtf8)
    .then(text => {
        const parser = new jsdom.JSDOM(text);
        const list = parser.window.document.querySelectorAll("a");
        for (let i=0; i<list.length;i++) {
            if(String(list[i].text).includes("네이버")){
                console.log(list[i].text.trim().split("\n")[0], `https://www.ppomppu.co.kr/zboard/${list[i].href}`)
            }
       }
    })

var Twit = require('twit');
var http = require('http');
var httpConfig = require('./httpConfig.json');

var T = new Twit({
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: '',
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
})

var stream = T.stream('user', {
    screen_name: 'binance'
});

stream.on('tweet', function (tweet) {
    var text = tweet['text'];
    var ts = parseInt(tweet['timestamp_ms']);
    console.log(text);
    console.log(new Date(ts));
    if (isListingSignalBinance(text)) {
        console.log('######  There is a new coin  Binance ########');
        let coin = extractListingCoinBinance(text)
        console.log(coin);
        //Send request
        sendRequest(coin,'binance')
    } else if (isListingSignalOkex) {
        console.log('######  There is a new coin  Okex ########');
        let coin = extractListingCoinOkex(text)
        console.log(coin);
        sendRequest(coin,'okex')
    }
});

var oldCoins = 'ETH,LTC,BNB,NEO,BCC,GAS,USDT,HSR,MCO,WTC,LRC,QTUM,YOYO,OMG,ZRX,STRAT,SNGLS,BQX,KNC,FUN,SNM,IOTA,LINK,XVG,SALT,MDA,MTL,SUB,EOS,SNT,ETC,MTH,ENG,DNT,ZEC,BNT,AST,DASH,OAX,ICN,BTG,EVX,REQ,VIB,TRX,POWR,ARK,XRP,MOD,ENJ,STORJ,VEN,KMD,RCN,NULS,RDN,XMR,DLT,AMB,BAT,BCPT,ARN,GVT,CDT,GXS,POE,QSP,BTS,XZC,LSK,TNT,FUEL,MANA,BCD,DGD,ADX,ADA,PPT,CMT,XLM,CND,LEND,WABI,TNB,WAVES,GTO,ICX,OST,ELF,AION,NEBL,BRD,EDO,WINGS,NAV,LUN,TRIG,APPC,VIBE,RLC,INS,PIVX,IOST,CHAT,STEEM,NANO,VIA,BLZ,AE,RPX,NCASH,POA,ZIL,ONT,STORM,XEM,WAN,WPR,QLC,SYS,GRS,CLOAK,GNT,LOOM,BCN,REP,TUSD,ZEN,SKY,IOTX,QKC,AGI,NXS';
var listCoins = oldCoins.split(',');

var isListingSignalBinance = function (msg) {
    var result = false;
    msg = msg.toLowerCase();
    if (msg.indexOf("binance lists") > -1 || msg.indexOf("binance will list") > -1) {
        result = true;
    }
    return result;
};
var isListingSignalOkex = function (msg) {
    var result = false;
    msg = msg.toLowerCase();
    if (msg.indexOf("is now listed on okex") > -1) {
        result = true;
    }
    return result;
};

var extractListingCoinBinance = function (msg) {
    var coin = 'not found';
    var pOpen = msg.indexOf("(");
    var pClose = msg.indexOf(")");
    if (pOpen > -1 && pClose > -1) {
        coin = coin.trim();
        coin = msg.substring(pOpen + 3, pClose);
    }
    return coin;
};

var extractListingCoinOkex = function (msg) {
    var coin = 'not found';
    var pOpen = msg.indexOf("(");
    var pClose = msg.indexOf(")");
    if (pOpen > -1 && pClose > -1) {
        coin = coin.trim();
        coin = msg.substring(pOpen + 1, pClose);
    }
    return coin;
};

const sendRequest = (coin, exch) => {
    var http = require('http');
    var options = {
        hostname: httpConfig['host']
        , method: 'GET'
        , headers: { 'Content-Type': "application/json" }
    };

    http.get(options, function (res) {
        response.end();
    });
}
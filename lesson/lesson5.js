//使用async控制并发连接数
var async=require('async')
var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/'
var app = express();

app.get('/', function (req, res, next) {
    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
    superagent.get(cnodeUrl)
      .end(function (err, sres) {
        // 常规的错误处理
        if (err) {
          return next(err);
        }
         
        var $ = cheerio.load(sres.text);
        var items = [];
        $('#topic_list .topic_title').each(function (idx, element) {
            var $element = $(element);
            // if(idx<20){
                items.push(url.resolve(cnodeUrl,$element.attr('href')));
            // }
        });

        async.mapLimit(items,5 ,function(item,callback){
            fetchUrl(item, callback);
        },function(err,result){
            console.log('final:');
            // console.log(err,result)
            result = result.map(function (topicPair) {
                var topicUrl = topicPair.url;
                var topicHtml = topicPair.html;
                var $ = cheerio.load(topicHtml);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim(),
                });
            });
            res.send(err || result);
        })
    });
});

var fetchUrl = function (url, callback) {
    superagent.get(url)
    .end(function(err,res){
        // if(err){
        //     callback(err,true)
        // }else{
            callback(err,{url,html:res.text})
        // }
    });
};

app.listen(3000, function (req, res) {
    console.log('开启3000');
  });

// async.mapLimit(urls, 5, function (url, callback) {
//     fetchUrl(url, callback);
// }, function (err, result) {
//     console.log('final:');
//     console.log(result);
// });





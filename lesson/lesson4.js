//使用eventproxy控制并发

var eventproxy = require('eventproxy');
var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
// var utility = require('utility');

var cnodeUrl = 'https://cnodejs.org/'
// 建立 express 实例
var app = express();

app.get('/', function (req, res, next) {
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get(cnodeUrl)
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var ep = new eventproxy()
      var item = [];
      var items= [];
      $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        if(idx<12){         //异步太高超出cnodeUrl网站上线就会报错
            item.push(url.resolve(cnodeUrl,$element.attr('href')));
        }
        
      });

      ep.after('get_main', item.length, function (list) {
        list = list.map(function (topicPair) {
            // 接下来都是 jquery 的用法了
            var topicUrl = topicPair[0];
            var topicHtml = topicPair[1];
            var $ = cheerio.load(topicHtml);
            return ({
                title: $('.topic_full_title').text().trim(),
                href: topicUrl,
                comment1: $('.reply_content').eq(0).text().trim(),
            });
        });
        res.send(list);
      });

      ep.fail(function(err){
        res.send(err);
      });

      item.forEach(function (topicUrl) {
        superagent.get(topicUrl)
        .end(
            ep.done('get_main',function (res) {
                return [topicUrl, res.text]
            })
        );
      });


    //   res.send(items);
    });
});

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});
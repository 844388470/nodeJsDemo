var http = require('http');
var url = require("url");
var fs = require("fs");
var mime = require('mime'); 
var util = require('util'); 
// var querystring = require('querystring');
// var path = require('path');

// var express = require('express');

// http.createServer(function (request, response) {
//     // let n=JSON.stringify(request)
//     // 发送 HTTP 头部 
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     // console.log(JSON.stringify(request))
//     let arr=[]
//     for(let i in request){
//         if(i[0]!=="_"){
//             arr.push(i)
//         }
//     }
//     response.writeHead(200, {'Content-Type': 'text/plain'});
    
//     // 发送响应数据 "Hello World"
//     response.end(`${request.url},${url.parse(request.url).pathname}`);
// }).listen(8888);

// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8888/');

function start(route) {
    function onRequest(request, response) {
      let pathname = url.parse(request.url).pathname;
      let arr=[];
      // console.log(request.method)
      // console.log("Request for " + pathname + " received.");
      for(let i in request){
        if(i.indexOf('_')===-1){
          arr.push(i)
        }
      }
      route.route(pathname);
    //   console.log(route.routeList)
      if(pathname==='/'){
        response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8'});
        fs.readFile(__dirname+'/index.html', function(err, data) {
            if (err) {
              // console.log(err,data)
                response.statusCode = 404;
                response.end('404文件不存在');
            } else {
                response.statusCode = 200;
                response.end(data, "binary");
            }
        });
      }else if(route.routeList.indexOf(pathname)!==-1){
        // response.writeHead(200, { 'Content-Type': 'text/plain'});
        // response.write(JSON.stringify({a:arr}));
        // setTimeout(()=>{
          route.route(request,response)
      }else{
        response.writeHead(200, { 'Content-Type': mime.getType(request.url)});
        fs.readFile(__dirname+pathname, function(err, data) {
            if (err) {
                response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8'});
                response.statusCode = 404;
                response.end('404文件不存在');
            } else {
                response.statusCode = 200;
                response.end(data, "binary");
            }
        });
      }
    }
   
    http.createServer(onRequest).listen(8080);
    console.log("Server has started.");
}

exports.start = start;
var url = require("url");

function routeFilter(request,response) {
    let pathname = url.parse( String(request.url) ).pathname;
    if(routeList.indexOf(pathname)!==-1){
        routeFnc[routeList.indexOf(pathname)](request,response)
    }
    // if(request.method=='GET'){
    //     response.end(JSON.stringify({a:arr}));
    // }else{
    //     let data = '';
    //     request.on('data', function (chunk) {
    //         // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
    //         data += chunk;
    //     });
    //     request.on('end', function(){    
    //         // data = querystring.parse(data);
    //         // response.end(util.inspect(data));
    //         response.end(data);
    //     });
    // }
}


let isApi=function(request,response){
    if(request.method=='GET'){
        response.writeHead(200, { 'Content-Type': 'application/json'});
        response.end(JSON.stringify({a:6666}));
    }else{
        let data = '';
        request.on('data', function (chunk) {
            // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
            data += chunk;
        });
        console.log(data)
        console.log(request.headers)
        // for(let i in request){
        //     console.log(i)
        // }
        response.writeHead(200, { 'Content-Type': 'application/json' });
        request.on('end', function(){    
            // data = querystring.parse(String(data));
            console.log(data)
            // response.end(util.inspect(data));
            response.end(data);
        });
    }
}

let isQbz=function(request){

}

let isCcp=function(request){

}

var routeList=['/api','/qbz','/ccp']
var routeFnc=[isApi,isQbz,isCcp]
exports.routeList = routeList;
exports.route = routeFilter;
var fs = require("fs");
var zlib = require('zlib');
var data = '';

const read=()=>{
    // 创建可读流
    var readerStream = fs.createReadStream('input.txt');

    // 设置编码为 utf8。
    readerStream.setEncoding('UTF8');

    // 处理流事件 --> data, end, and error
    readerStream.on('data', function(chunk) {
        data += chunk;
    });

    readerStream.on('end',function(){
        console.log(data);
    });

    readerStream.on('error', function(err){
        console.log(err.stack);
    });

    console.log("程序执行完毕");
}

const write=(data)=>{
    var fs = require("fs");
    // var data = '999999999';

    // 创建一个可以写入的流，写入到文件 output.txt 中
    var writerStream = fs.createWriteStream('output.txt');

    // 使用 utf8 编码写入数据
    writerStream.write(data,'UTF8');

    // 标记文件末尾
    writerStream.end();

    // 处理流事件 --> data, end, and error
    writerStream.on('finish', function() {
        console.log("写入完成。");
    });

    writerStream.on('error', function(err){
        console.log(err.stack);
    });

    console.log("程序执行完毕");
}

const pop=()=>{
    // 创建一个可读流
    var readerStream = fs.createReadStream('input.txt');

    // 创建一个可写流
    var writerStream = fs.createWriteStream('output.txt');

    // 管道读写操作
    // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
    readerStream.pipe('9'+writerStream);

    console.log("程序执行完毕");
}

const yasuo=()=>{
    // 压缩 input.txt 文件为 input.txt.gz
    fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('input.txt.gz'));
    
    console.log("文件压缩完成。");
}

const jieya=()=>{
    
    // 解压 input.txt.gz 文件为 input.txt
    fs.createReadStream('input.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('input.txt'));
    
    console.log("文件解压完成。");
}

exports.write=write
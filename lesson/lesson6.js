var assert=require('assert')
var should=require('should')

var fibonacci = function (n) {
    if (typeof n !== 'number') {
        throw new Error('n should be a Number');
    }
    if (n < 0) {
    throw new Error('n should >= 0');
    }
    if (n > 10) {
    throw new Error('n should <= 10');
    }
    if (n === 0) {
    return 0;
    }
    if (n === 1) {
    return 1;
    }

    return fibonacci(n-1) + fibonacci(n-2);
};

var sum=function (...rest) {
    var sum = 0;
    for (let n of rest) {
        sum += n;
    }
    return sum;
};


// if (require.main === module) {
//     console.log(true)
//     // 如果是直接执行 main.js，则进入此处
//     // 如果 main.js 被其他文件 require，则此处不会执行。
//     var n = Number(process.argv[2]);
//     console.log('fibonacci(' + n + ') is', fibonacci(n));
// }

// assert.strictEqual(sums(1), 1);

describe('lesson6.js', () => {
    it('should equal 0 when n === 0', function () {
        fibonacci(0).should.equal(0);
      });
    
      it('should equal 1 when n === 1', function () {
        fibonacci(1).should.equal(1);
      });
    
      it('should equal 55 when n === 10', function () {
        fibonacci(10).should.equal(55);
      });
    
      it('should throw when n > 10', function () {
        (function () {
          fibonacci(11);
        }).should.throw('n should <= 10');
      });
    
      it('should throw when n < 0', function () {
        (function () {
          fibonacci(-1);
        }).should.throw('n should >= 0');
      });
    
      it('should throw when n isnt Number', function () {
        (function () {
          fibonacci('呵呵');
        }).should.throw('n should be a Number');
      });
});

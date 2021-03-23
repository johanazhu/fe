# 手写Promise

我要按照自己的思路一步一步写promise



别人写的

```javascript
function myPromise(constructor){
    let self=this;
    self.status="pending" //定义状态改变前的初始状态
    self.value=undefined;//定义状态为resolved的时候的状态
    self.reason=undefined;//定义状态为rejected的时候的状态
    self.onFullfilledArray=[];
    self.onRejectedArray=[];
    function resolve(value){
       if(self.status==="pending"){
          self.value=value;
          self.status="resolved";
          self.onFullfilledArray.forEach(function(f){
                f(self.value);
                //如果状态从pending变为resolved，
                //那么就遍历执行里面的异步方法
          });

       }
    }
    function reject(reason){
       if(self.status==="pending"){
          self.reason=reason;
          self.status="rejected";
          self.onRejectedArray.forEach(function(f){
              f(self.reason);
             //如果状态从pending变为rejected，
             //那么就遍历执行里面的异步方法
          })
       }
    }
    //捕获构造异常
    try{
       constructor(resolve,reject);
    }catch(e){
       reject(e);
    }
}

myPromise.prototype.then=function(onFullfilled,onRejected){
    let self=this;
    let promise2;
    switch(self.status){
      case "pending":
        promise2 = new myPromise(function(resolve,reject){
             self.onFullfilledArray.push(function(){
                setTimeout(function(){
                  try{
	                 let temple=onFullfilled(self.value);
	                 resolvePromise(temple)
	                }catch(e){
	                   reject(e) //error catch
	                }
                })
             });
             self.onRejectedArray.push(function(){
                setTimeout(function(){
                   try{
	                   let temple=onRejected(self.reason);
	                   resolvePromise(temple)
	                 }catch(e){
	                   reject(e)// error catch
	               }
                })
             });
        })
      case "resolved":
        promise2=new myPromise(function(resolve,reject){
           setTimeout(function(){
               try{
	              let temple=onFullfilled(self.value);
	              //将上次一then里面的方法传递进下一个Promise状态
	              resolvePromise(temple);
	            }catch(e){
                  reject(e);//error catch
               }
           })
        })
        break;
      case "rejected":
        promise2=new myPromise(function(resolve,reject){
           setTimeout(function(){
             try{
               let temple=onRejected(self.reason);
               //将then里面的方法传递到下一个Promise的状态里
               resolvePromise(temple);
             }catch(e){
               reject(e);
             }
           })
        })
        break;
      default:
   }
   return promise2;
}

function resolvePromise(promise,x,resolve,reject){
  if(promise===x){
     throw new TypeError("type error")
  }
  let isUsed;
  if(x!==null&&(typeof x==="object"||typeof x==="function")){
      try{
        let then=x.then;
        if(typeof then==="function"){
           //是一个promise的情况
           then.call(x,function(y){
              if(isUsed)return;
              isUsed=true;
              resolvePromise(promise,y,resolve,reject);
           },function(e){
              if(isUsed)return;
              isUsed=true;
              reject(e);
           })
        }else{
           //仅仅是一个函数或者是对象
           resolve(x)
        }
      }catch(e){
         if(isUsed)return;
         isUsed=true;
         reject(e);
      }
  }else{
    //返回的基本类型，直接resolve
    resolve(x)
  }
}
```

https://segmentfault.com/a/1190000023690122?_ea=60466188
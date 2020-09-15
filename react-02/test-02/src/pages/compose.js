function f1(name) {
    console.log("f1:"+name);
   }
   function f2(name) {
    console.log("f2:"+name);
   }
   function f3(name) {
    console.log("f3:"+name);
   }
  // f3(f2(f1()));
  function compose(...funcs){
      console.log(funcs)
        if(funcs.length==0){
            console.log('empty')
        }else if(funcs.length===1){
            return funcs[0];
        }else{
            return funcs.reduce((pre,current)=>(...args)=>current(pre(...args)));
        }
  }
  compose(f1,f2,f3)();
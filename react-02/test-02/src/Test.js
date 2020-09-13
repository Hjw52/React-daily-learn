import React,{Component} from'react'
import { render } from 'react-dom'
const hoc=Cmp=>props=>{
    return (
        <div className='border'>
            <Cmp {...props}/>
        </div>
    )
}
const hoc2=Cmp=>props=>{
    return (
        <div style={{border:'solid 2px red'}}>
            <Cmp {...props}/>
        </div>
    )
}
@hoc
@hoc2
class Child extends Component{
    render(){
        return <div className="border">child</div>;
    }
   } 
class Test extends Component{
    
    render(){
       // var Foo=hoc2(hoc(Child));
        return(
            <div>
                <Child/>
            {/* <Foo/> */}
             </div>
        )
        
    }
}
export default Test;
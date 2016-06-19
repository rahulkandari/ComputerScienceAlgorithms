import * as React from "react";

import {observable,observe,computed} from  "mobx";

export interface HelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<HelloProps, {}> {
    testCall(){
     //alert("Test click called");
        this.observableObject["a"] = (Math.random()* 100).toString();

    }

    changePoweredValue(){
        alert("powered value:"+this.newPoweredValue.get());
    }

     newPoweredValue:any;

      total:any;

    //This is the observable object.
     observableObject = observable({a:"b",c:1});



    //Adding observer on component mount
    componentWillMount(){
        observe(this.observableObject,(change)=>
        {alert("New Number"+this.observableObject['a'])});
        this.newPoweredValue = computed(():any=>
                {return Math.pow(this.observableObject["a"],2);
                }
                );

        this.newPoweredValue.observe(newLabel => console.log(newLabel));
    }


    render() {

        return  <div>
            {this.props.compiler}
            {this.total}
            <button onClick={this.testCall.bind(this)}>Click for getting new values</button>
            <button onClick={this.changePoweredValue.bind(this)}>Get Powered</button>
        </div>
    }
}
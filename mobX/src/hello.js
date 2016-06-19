"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var mobx_1 = require("mobx");
var Hello = (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        _super.apply(this, arguments);
        //This is the observable object.
        this.observableObject = mobx_1.observable({ a: "b", c: 1 });
    }
    Hello.prototype.testCall = function () {
        //alert("Test click called");
        this.observableObject["a"] = (Math.random() * 100).toString();
    };
    Hello.prototype.changePoweredValue = function () {
        alert("powered value:" + this.newPoweredValue.get());
    };
    //Adding observer on component mount
    Hello.prototype.componentWillMount = function () {
        var _this = this;
        mobx_1.observe(this.observableObject, function (change) { alert("New Number" + _this.observableObject['a']); });
        this.newPoweredValue = mobx_1.computed(function () {
            return Math.pow(_this.observableObject["a"], 2);
        });
        this.newPoweredValue.observe(function (newLabel) { return console.log(newLabel); });
    };
    Hello.prototype.render = function () {
        return <div>
            {this.props.compiler}
            {this.total}
            <button onClick={this.testCall.bind(this)}>Click for getting new values</button>
            <button onClick={this.changePoweredValue.bind(this)}>Get Powered</button>
        </div>;
    };
    return Hello;
}(React.Component));
exports.Hello = Hello;

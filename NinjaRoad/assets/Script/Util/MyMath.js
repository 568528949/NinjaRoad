// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    movePreCircleDown(r,loc,angle,dev){
        var nodeListVar = [];
        var index = 0;
        for(var i=0;i<= angle;){
            var intevalX = Math.abs(r*Math.sin(angle/180*Math.PI) - r*Math.sin((angle-i)/180*Math.PI));
            var intevalY = Math.abs(r*Math.cos(angle/180*Math.PI) - r*Math.cos((angle-i)/180*Math.PI));
            nodeListVar[index] = cc.v2(loc.x + intevalX , loc.y - intevalY);  
            index ++;
            if(i == angle)
                break;
             
            i=i+dev;
            if(i > angle)
                i = angle;
        }
        return nodeListVar;
    },

    movePreCircleUp(r,loc,angle,dev){
        var nodeListVar = [];
        var index = 0;
        for(var i=0;i<= angle;){
            var intevalX = Math.abs(r*Math.sin(0/180*Math.PI) - r*Math.sin(i/180*Math.PI));
            var intevalY = Math.abs(r*Math.cos(0/180*Math.PI) - r*Math.cos(i/180*Math.PI));
            nodeListVar[index] = cc.v2(loc.x - intevalX , loc.y + intevalY);  
            index ++;
            if(i == angle)
                break;
             
            i=i+dev;
            if(i > angle)
                i = angle;
        }
        return nodeListVar;
    },

    movePostCircleDown(r,loc,angle,dev){
        var nodeListVar = [];
        var index = 0;
        for(var i=0;i<= angle;){
            var intevalX = Math.abs(r*Math.sin(angle/180*Math.PI) - r*Math.sin((angle-i)/180*Math.PI));
            var intevalY = Math.abs(r*Math.cos(angle/180*Math.PI) - r*Math.cos((angle-i)/180*Math.PI));
            nodeListVar[index] = cc.v2(loc.x - intevalX , loc.y - intevalY);  
            index ++;
            if(i == angle)
                break;
             
            i=i+dev;
            if(i > angle)
                i = angle;
        }
        return nodeListVar;
    },

    movePostCircleUp(r,loc,angle,dev){
        var nodeListVar = [];
        var index = 0;
        for(var i=0;i<= angle;){
            var intevalX = Math.abs(r*Math.sin(0/180*Math.PI) - r*Math.sin(i/180*Math.PI));
            var intevalY = Math.abs(r*Math.cos(0/180*Math.PI) - r*Math.cos(i/180*Math.PI));
            nodeListVar[index] = cc.v2(loc.x + intevalX , loc.y + intevalY);  
            index ++;
            if(i == angle)
                break;
             
            i=i+dev;
            if(i > angle)
                i = angle;
        }
        return nodeListVar;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});

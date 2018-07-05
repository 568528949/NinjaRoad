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

    actionCircleMove(context,r,angle,dev,interval,repeat){
        var maxAngle = 45;
        var MyMath = cc.find("Canvas/ConfigLayer").getComponent("MyMath");
        var nodeList1 = MyMath.movePreCircleDown(r,cc.v2(context.node.x,context.node.y),angle,dev);
        var nodeList2 = MyMath.movePostCircleUp(r,cc.v2(nodeList1[nodeList1.length-1].x,nodeList1[nodeList1.length-1].y),maxAngle,dev);
        var nodeList3 = MyMath.movePostCircleDown(r,cc.v2(nodeList2[nodeList2.length-1].x,nodeList2[nodeList2.length-1].y),maxAngle,dev);
        var nodeList4 = MyMath.movePreCircleUp(r,cc.v2(nodeList3[nodeList3.length-1].x,nodeList3[nodeList3.length-1].y),maxAngle,dev);

        var nodeList = [];
        for(var i = 0;i< nodeList1.length;i++)
            nodeList[i] = nodeList1[i];
        for(i = 0;i<nodeList2.length-1;i++)
            nodeList[nodeList1.length+i] = nodeList2[i+1];
        for(i = 0;i<nodeList3.length-1;i++)
            nodeList[nodeList1.length+nodeList2.length-1+i] = nodeList3[i+1];
        for(i = 0;i<nodeList4.length-1;i++)
            nodeList[nodeList1.length+nodeList2.length+nodeList3.length-2+i] = nodeList4[i+1];

        var delay = 0;

        var count = 1;
    
        context.schedule(function() {
            context.node.runAction(cc.moveTo(interval,nodeList[count]));
            count ++;
            if(count >=nodeList.length)
                count = 1;
        }, interval, (nodeList.length-count)*repeat,delay);

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});

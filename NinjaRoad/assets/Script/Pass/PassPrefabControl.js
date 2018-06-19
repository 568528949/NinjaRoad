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
        passType: null,

        //种类是平台时的参数
        moveX1 : null,
        moveX2 : null,
        moveY1 : null,
        moveY2 : null,

    },

    //平台相关方法
    onCollisionEnter: function (other,self) {

        this.node.destroy();

    },

    onBeginContatct:function(contact,selfCollider,otherCollider){
        this.node.destroy();

    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {

    },

    // update (dt) {},
});

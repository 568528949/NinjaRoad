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
        limitR:300,
        maxAngle:45,
    },

    // LIFE-CYCLE CALLBACKS:
    onBeginContact(contact, self, other) {
        other.getComponent("PlayerControl").setRopeInput(true);
        other.getComponent("PlayerControl").setRopePoint(this.node);
        other.getComponent("PlayerControl").setRopePointLoc(this.node.x+this.node.parent.x,this.node.y,this.maxAngle,this.limitR);
    },

    onLoad () {
        this.node.getChildByName("arrow").opacity = 255;
    },

    start () {

    },

    // update (dt) {},
});

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
        
    },

    onBeginContact(contact, self, other) {
        other.getComponent("PlayerControl").slopeNow(this.slopeSpeedX,this.slopeAngle);
    },

    onEndContact(contact, self, other){

        if(cc.pDistance(this.loc,cc.v2(other.node.x,other.node.y)) < this.range)
            return;

        other.getComponent("PlayerControl").changeActionState("jumping");
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.ActionConfig = cc.find("Canvas/ConfigLayer").getComponent("ActionConfig");
        this.slopeSpeedX = this.ActionConfig.slopeSpeedX;
        this.slopeAngle = this.node.rotation;
        this.loc = cc.v2(this.node.x,this.node.y);
        this.range = Math.sqrt(this.node.width*this.node.width + this.node.height*this.node.height);
    },

    start () {

    },

    // update (dt) {},
});

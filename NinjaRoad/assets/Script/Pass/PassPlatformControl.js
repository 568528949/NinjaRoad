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

    //平台相关方法
    onBeginContact(contact, self, other) {

        other.getComponent("PlayerControl").runNow(this.runSpeed);
        other.getComponent("PlayerControl").setJumpInput(true);
    },

    onEndContact(contact, self, other){
        other.getComponent("PlayerControl").jumpNow(0,0,0);
        other.getComponent("PlayerControl").setJumpInput(false);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.ActionConfig = cc.find("Canvas/ConfigLayer").getComponent("ActionConfig");
        this.runSpeed = this.ActionConfig.runSpeed;
    },

    start () {

    },

    // update (dt) {},
});

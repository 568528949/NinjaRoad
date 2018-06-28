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
        other.getComponent("PlayerControl").runNow(300);
        other.getComponent("PlayerControl").setInputModel("jump");
    },

    onEndContact(contact, self, other){
        other.getComponent("PlayerControl").jumpNow(0,0,0);
        other.getComponent("PlayerControl").setInputModel("nothing");
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {

    },

    // update (dt) {},
});

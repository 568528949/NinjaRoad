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
        controlNode:{
            default : null,
            type : cc.Node
        },
    },

    arrowShow(){
        if(this.playerControl.getPauseReason() == "reboundpause" && this.isShow == false){
            this.node.opacity = 255;
            this.node.x = this.controlNode.x;
            this.node.y = this.controlNode.y;
            this.isShow = true;
        }
    },

    arrowHide(){
        if(this.playerControl.getPauseReason() == "notpause" && this.isShow == true){
            this.node.opacity = 0;
            this.isShow = false;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.playerControl = this.controlNode.getComponent("PlayerControl");
        this.node.opacity = 0;
        this.isShow = false;
    },

    start () {

    },

    update (dt) {
        this.arrowShow();
        this.arrowHide();
    },
});

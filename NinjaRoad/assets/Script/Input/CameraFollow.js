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
        cameraNode:{
            default : null,
            type : cc.Node
        },
    },

    setCameraNodeLocation(){
        if(this.node.x <= this.canvasWidth/2)
            this.cameraNode.x = 0;
        else
            this.cameraNode.x = this.node.x - this.canvasWidth/2;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var StableConfig = cc.find("Canvas/ConfigLayer").getComponent("StableConfig");
        this.canvasHeight = StableConfig.canvasHeight;
        this.canvasWidth = StableConfig.canvasWidth;
    },

    start () {

    },

    update (dt) {
        //this.node.parent.x = 568;
        this.setCameraNodeLocation();
    },
});

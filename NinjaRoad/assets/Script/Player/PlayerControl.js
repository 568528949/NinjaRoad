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

    move(length){      
        if(this.playerSprite.x > this.canvasWidth/2)
            return;

        var lengthVar = length;
        if(this.playerSprite.x + length > this.canvasWidth/2)
            lengthVar = this.canvasWidth/2 - this.playerSprite.x;

        var moveVar = cc.moveTo(this.moveSpeed, cc.p(this.playerSprite.x + lengthVar, this.playerSprite.y));
        this.playerSprite.runAction(moveVar);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var StableConfig = cc.find("Canvas/ConfigLayer").getComponent("StableConfig");
        this.canvasWidth = StableConfig.canvasWidth;
        this.moveSpeed = StableConfig.moveSpeed;

        this.playerSprite = cc.find("Sprite",this.node.parent);
    },

    start () {

    },

    update (dt) {
       
    },
});

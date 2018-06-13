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
        playerNode:{
            default : null,
            type : cc.Node
        },

        backgroundNode: {
            default : null,
            type : cc.Node
        },
    },


    moveCanera(length){
        if(this.playerSprite.x < 0 && length + this.playerSprite.x > 0){
            this.playerControl.move(-this.playerSprite.x);

            var remainLenghtVar = this.backgroundControl.move(length);
            if(remainLenghtVar!=0){
                this.playerControl.move(remainLenghtVar);
            } 
        }
        else if(this.playerSprite.x < 0 && length + this.playerSprite.x <= 0){
            this.playerControl.move(length);
        }
        else{
            var remainLenghtVar = this.backgroundControl.move(length);
            if(remainLenghtVar!=0){
                this.playerControl.move(remainLenghtVar);
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var StableConfig = cc.find("Canvas/ConfigLayer").getComponent("StableConfig");
        this.canvasHeight = StableConfig.canvasHeight;
        this.canvasWidth = StableConfig.canvasWidth;
        this.moveSpeed = StableConfig.moveSpeed;

        this.playerControl = cc.find("Control",this.playerNode).getComponent("PlayerControl");
        this.playerSprite = cc.find("Sprite",this.playerNode);
        this.backgroundControl = cc.find("Control",this.backgroundNode).getComponent("BackgroundControl");
    },

    start () {
        
    },

    update (dt) {
    },
});

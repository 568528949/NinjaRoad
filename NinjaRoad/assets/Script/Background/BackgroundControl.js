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
        backgroundPrefab:{
            default : null,
            type : cc.Prefab
        },
    },

    showBackground(){
        while(this.backgroundIndex < this.backgroundNum ){
            var backgroundVar = cc.instantiate(this.backgroundPrefab);
            backgroundVar.x = this.backgroundIndex * this.backgroundWidth;
            backgroundVar.y = 0;
            
            this.node.addChild(backgroundVar);

            this.backgroundList[this.backgroundIndex] = backgroundVar;
            this.backgroundIndex ++;
        }
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var StableConfig = cc.find("Canvas/ConfigLayer").getComponent("StableConfig");
        this.canvasHeight = StableConfig.canvasHeight;
        this.canvasWidth = StableConfig.canvasWidth;
        this.backgroundHeight = StableConfig.backgroundHeight;
        this.backgroundWidth = StableConfig.backgroundWidth;
        this.backgroundNum = StableConfig.passMetelWidth * StableConfig.passMetelNum / StableConfig.backgroundWidth;

        this.backgroundList = [];
        this.backgroundIndex =0;

        this.moveLimit = this.backgroundWidth * this.backgroundNum - this.canvasWidth;
        this.moveLength = this.moveLimit;
    },

    start () {

    },

    update (dt) {
        this.showBackground();
    },
});

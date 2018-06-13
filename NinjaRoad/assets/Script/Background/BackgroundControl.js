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
        while(this.backgroundIndex < this.backgroundNum && this.backgroundWidth * this.backgroundIndex < this.canvasWidth + this.scrollWidth){
            var backgroundVar = cc.instantiate(this.backgroundPrefab);
            backgroundVar.x = this.backgroundIndex * this.backgroundWidth;
            backgroundVar.y = 0;
            backgroundVar.x += this.backgroundWidthDeviation;
            backgroundVar.y += this.backgroundHeightDeviation;
            backgroundVar.x -= this.scrollWidth;
            backgroundVar.y -= this.scrollHeight;
            
            this.node.addChild(backgroundVar);

            this.backgroundList[this.backgroundIndex] = backgroundVar;
            this.backgroundIndex ++;
        }
    },

    move(length){
        var moveLengthVar = 0;
        var remainLengthVar = 0;

        if(length < this.moveLength)
            moveLengthVar = length;
        else{
            moveLengthVar = this.moveLength;
            remainLengthVar = length - this.moveLength;
        }   

        while(this.backgroundIndex < this.backgroundNum && this.backgroundWidth * this.backgroundIndex < this.canvasWidth + this.scrollWidth + length){
            var backgroundVar = cc.instantiate(this.backgroundPrefab);
            backgroundVar.x = this.backgroundIndex * this.backgroundWidth;
            backgroundVar.y = 0;
            backgroundVar.x += this.backgroundWidthDeviation;
            backgroundVar.y += this.backgroundHeightDeviation;
            backgroundVar.x -= this.scrollWidth;
            backgroundVar.y -= this.scrollHeight;
            
            this.node.addChild(backgroundVar);

            this.backgroundList[this.backgroundIndex] = backgroundVar;
            this.backgroundIndex ++;
        }

        for(var i=0;i<this.backgroundIndex;i++){
            this.backgroundList[i].getComponent("BackgroundPrefabControl").move(moveLengthVar);
        }
        this.scrollWidth += moveLengthVar;
        this.moveLength -= moveLengthVar;

        return remainLengthVar;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var StableConfig = cc.find("Canvas/ConfigLayer").getComponent("StableConfig");
        this.canvasHeight = StableConfig.canvasHeight;
        this.canvasWidth = StableConfig.canvasWidth;
        this.backgroundHeight = StableConfig.backgroundHeight;
        this.backgroundWidth = StableConfig.backgroundWidth;
        this.backgroundHeightDeviation = StableConfig.backgroundHeightDeviation;
        this.backgroundWidthDeviation = StableConfig.backgroundWidthDeviation;
        this.backgroundNum = StableConfig.backgroundNum;

        this.backgroundList = [];
        this.backgroundIndex =0;
        this.scrollWidth = 0;
        this.scrollHeight =0;

        this.moveLimit = this.backgroundWidth * this.backgroundNum - this.canvasWidth;
        this.moveLength = this.moveLimit;
    },

    start () {

    },

    update (dt) {
        this.showBackground();
    },
});

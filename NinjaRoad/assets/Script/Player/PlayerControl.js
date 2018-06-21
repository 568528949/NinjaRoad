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

    //跑步动作相关
    runNow(){
        this.run = true;
    },

    actionRun(){
        if(this.run == true){
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(300,0);
            this.runing = true;
            this.jumping = false;
            this.stoping = false;
            this.downing =false;
            this.run = false;
        }
    },

    //停止动作相关
    stopNow(){
        this.stop = true;
    },

    actionStop(){
        if(this.stop == true){
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            this.stoping = true;
            this.runing = false;
            this.jumping = false;
            this.stop = false;
        }
    },


    //跳跃动作相关
    jumpNow(){
        if(this.jumping == false && this.downing == false)
            this.jump = true;
    },

    actionJump(){
        if(this.jump == true){
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(300,800);
            this.jumping = true;
            this.downing = false;
            this.jump = false;
        }
    },

    downNow(){
        this.down = true;
    },

    actionDown(){
        if(this.down == true){
            this.downing = true;
            this.jumping = true;
            this.down = false;
        }
    }, 

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var StableConfig = cc.find("Canvas/ConfigLayer").getComponent("StableConfig");
        this.canvasWidth = StableConfig.canvasWidth;
        this.moveSpeed = StableConfig.moveSpeed;

        this.playerSprite = cc.find("Sprite",this.node.parent);

        //玩家相关动作控制
        this.run = false;
        this.runing = false;

        this.stop = false;
        this.stoping = true;

        this.jump = false;
        this.jumping = false;

        this.down = false;
        this.downing = true;

        this.drop = false;
        this.droping = true;

        this.speedUp = false;
        this.speedDown = false;
        
        
    },

    start () {

    },

    update (dt) {
       this.actionRun();
       this.actionStop();
       this.actionJump();
       this.actionDown();
    },
});

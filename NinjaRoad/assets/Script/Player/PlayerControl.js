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


    //跳状态作相关
    jumpNow(jumpSpeedX,jumpSpeedY,jumpType){
        if(this.runing == true && this.stoping == false){
            this.jump = true;
            this.jumpSpeedX = jumpSpeedX;
            this.jumpSpeedY = jumpSpeedY;
            this.jumpType = jumpType;
        }   
    },

    actionJump(){
        if(this.jump == true){
            this.jump = false;

            if(this.jumpType == 1)//临时，以后对跳跃进行分类，现在用跳跃y速度为0代表坠落（空跳）
                this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.jumpSpeedX,this.jumpSpeedY);

            this.changeActionState("jumping");
        }
    },
    
    //跑步状态相关
    runNow(runSpeed){
        if(this.jumping == true && this.stoping == false){
            this.run = true;
            this.runSpeed = runSpeed;
        }     
    },

    actionRun(speedx){
        if(this.run == true){
            this.run = false;

            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.runSpeed,0);

            this.changeActionState("runing");      
        }
    },

    //停止状态相关
    stopNow(){
        if(true)
            this.stop = true;
    },

    actionStop(){
        if(this.stop == true){
            this.stop = false;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);

            this.changeActionState("stoping");   
            
            cc.find("Canvas/ConfigLayer").getComponent("GameConfig").showGameOverDialog();
        }
    },


    //改变目前运动状态，jumping、runing、stoping
    changeActionState(state){
        this.jumping = false;
        this.runing = false;
        this.stoping = false;

        if(state == "jumping")
            this.jumping = true;
        else if(state == "runing")
            this.runing = true;
        else if(state == "stoping")
            this.stoping = true;
    },

    initAction(){
        //玩家相关动作控制
        this.jump = false;
        this.jumping = false;

        this.run = false;
        this.runing = false;

        this.stop = false;
        this.stoping = false;

        this.changeActionState("jumping");

        this.jumpSpeedX = 300;
        this.jumpSpeedY = 300;
        this.jumpType = 1;

        this.runSpeed = 300;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var StableConfig = cc.find("Canvas/ConfigLayer").getComponent("StableConfig");
        this.canvasWidth = StableConfig.canvasWidth;
        this.moveSpeed = StableConfig.moveSpeed;

        this.playerSprite = cc.find("Sprite",this.node.parent);
        
        this.initAction();
    },

    start () {

    },

    update (dt) {
        this.actionJump();
        this.actionRun();
        this.actionStop(); 
    },
});

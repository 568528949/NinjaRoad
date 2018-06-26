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

    //站立动作相关
    standNow(){
        if(this.runing  == true && this.stoping == false){
            this.stand = true;
        }
    },

    actionStand(){
        if(this.stand == true){
            this.stand = false;

            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
        }
    },

    //跳状态作相关
    jumpNow(jumpSpeedX,jumpSpeedY,jumpType){
        if((this.runing == true || this.rebounding == true) && this.stoping == false){
            this.jump = true;
            this.jumpSpeedX = jumpSpeedX;
            this.jumpSpeedY = jumpSpeedY;
            this.jumpType = jumpType;
        }   
    },

    actionJump(){
        if(this.jump == true){
            this.jump = false;

            if(this.jumpType == 1)//跳跃种类为1为普通跳跃
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

    actionRun(){
        if(this.run == true){
            this.run = false;

            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.runSpeed,0);

            this.changeActionState("runing");      
        }
    },

    //反弹状态相关
    reboundNow(reboundSpeedX,reboundSpeedY){
        if(this.jumping == true || this.pauseing == true && this.stoping == false){
            this.rebound = true;
            this.reboundSpeedX = reboundSpeedX;
            this.reboundSpeedY = reboundSpeedY;
        }
    },

    actionRebound(){
        if(this.rebound == true){
            this.rebound = false;

            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.reboundSpeedX,this.reboundSpeedY);

            this.changeActionState("rebounding");
        }
    },

    //暂停和继续状态相关
    pauseNow(pauseReason){
        if(this.pauseing == false && this.stoping == false){
            this.pause = true;
            this.pauseReason = pauseReason;
        }
        else if(this.pauseing == true && this.stoping == false){
            this.continue = true;
            this.pauseReason = "notpause";
        }     
    },

    actionPause(){
        if(this.pause == true){
            this.pause = false;

            this.pauseSpeedX = this.getComponent(cc.RigidBody).linearVelocity.x;
            this.pauseSpeedY = this.getComponent(cc.RigidBody).linearVelocity.y;
            this.pauseGravityScale = this.getComponent(cc.RigidBody).gravityScale;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            this.getComponent(cc.RigidBody).gravityScale = 0;
            this.pauseState = this.state;

            this.changeActionState("pauseing");
        }
    },

    actionContinue(){
        if(this.continue == true){
            this.continue = false;

            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.pauseSpeedX,this.pauseSpeedY);
            this.getComponent(cc.RigidBody).gravityScale = this.pauseGravityScale;
            this.changeActionState(this.pauseState);
        }
    },

    getPauseReason(){
        return this.pauseReason;
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


    //改变目前运动状态，standing、jumping、runing、rebounding、pauseing、stoping、
    changeActionState(state){
        this.standing = false;
        this.jumping = false;
        this.runing = false;
        this.rebounding = false;
        this.pauseing = false;
        this.stoping = false;

        if(state == "standing")
            this.standing = true;
        else if(state == "jumping")
            this.jumping = true;
        else if(state == "runing")
            this.runing = true;
        else if(state == "rebounding")
            this.rebounding = true;
        else if(state == "pauseing")
            this.pauseing = true;
        else if(state == "stoping")
            this.stoping = true;

        this.state = state;
        
    },

    initAction(){
        //玩家相关动作控制
        this.stand = false;
        this.standing = false

        this.jump = false;
        this.jumping = false;

        this.run = false;
        this.runing = false;

        this.rebound = false;
        this.rebounding = false;

        this.pause = false
        this.continue = false;
        this.pauseing = false;

        this.stop = false;
        this.stoping = false;

        this.changeActionState("jumping");

        this.jumpSpeedX = 300;
        this.jumpSpeedY = 800;
        this.jumpType = 1;

        this.runSpeed = 300;

        this.reboundSpeedX = 300;
        this.reboundSpeedY = 800;

        this.pauseSpeedX = 0;
        this.pauseSpeedY = 0;
        this.pauseGravityScale = 0;
        this.pauseState = "";
        this.pauseReason = "notpause";
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
        this.actionStand();
        this.actionJump();
        this.actionRun();
        this.actionPause();
        this.actionContinue();
        this.actionRebound();
        this.actionStop(); 
    },
});

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

    //角色控制相关
    initInputModel(){
        this.jumpInput = true;
        this.reboundInput = false;
        this.ropeInput = false;
    },

    getJumpInput(){
        return this.jumpInput;
    },
    setJumpInput(inputModel){
        this.jumpInput = inputModel;
    },
    
    getReboundInput(){
        return this.reboundInput;
    },
    setReboundInput(inputModel){
        this.reboundInput = inputModel;
    },

    getRopeInput(){
        return this.ropeInput;
    },
    setRopeInput(inputModel){
        this.ropeInput = inputModel;
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
            this.jumpSpeedX = jumpSpeedX;
            this.jumpSpeedY = jumpSpeedY;
            this.jumpType = jumpType;

            if(this.jumpType == 1)//跳跃种类为1为普通跳跃
                this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.jumpSpeedX,this.jumpSpeedY);

            this.changeActionState("jumping");
        }   
    },
    
    //跑步状态相关
    runNow(runSpeed){
        if(this.jumping == true && this.stoping == false){
            this.runSpeed = runSpeed;

            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.runSpeed,0);

            this.changeActionState("runing");
        }     
    },

    //反弹状态相关
    reboundNow(reboundSpeedX,reboundSpeedY){
        if(this.jumping == true || this.pauseing == true && this.stoping == false){
            this.reboundSpeedX = reboundSpeedX;
            this.reboundSpeedY = reboundSpeedY;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.reboundSpeedX,this.reboundSpeedY);
            this.changeActionState("rebounding");
        }
    },


    //绳索状态相关
    setRopePoint(ropePoint){
        this.ropePoint = ropePoint;
    },
    setRopePointLoc(ropePointX,ropePointY){
        this.ropePointLoc = cc.v2(ropePointX,ropePointY);
    },
    getRopePointLoc(){
        return this.ropePointLoc;
    },
    addRope(rope){
        this.rope = rope;
        this.ropePoint.addChild(rope);
    },

    swingNow(rope,maxAngle,swingSpeed,swingRepeat){
        if(this.jumping == true || this.pauseing == true && this.stoping == false){

            this.rope = rope;
            this.swingR = cc.pDistance(cc.v2(this.node.x,this.node.y),this.ropePointLoc);
            this.swingAngle = Math.atan(Math.abs(this.node.x-this.ropePointLoc.x)/Math.abs(this.node.y-this.ropePointLoc.y))/Math.PI*180;
            this.maxAngle = maxAngle;
            this.swingSpeed = swingSpeed;
            this.swingRepeat = swingRepeat;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            this.limitR = this.ropePoint.getComponent("PassRopepointControl").limitR;

            if(this.rope.getComponent("RopeControl").hanged(this.swingR,this.limitR,this.swingAngle) == false)
                return;

            this.setRopeInput(false);
            this.ropePoint.getComponent(cc.RigidBody).enabledContactListener = false;

            this.rope.getComponent(cc.DistanceJoint).connectedBody = this.node.getComponent(cc.RigidBody);
            this.rope.getComponent(cc.DistanceJoint).anchor = cc.v2(0,-this.swingR);
            this.rope.getComponent(cc.DistanceJoint).apply();

            this.rope.getComponent("RopeControl").swing(this.swingAngle,this.maxAngle,this.swingSpeed,this.swingRepeat);
            this.changeActionState("swinging");
        }
    },

    swingStop(jumpSpeedX,jumpSpeedY){
        this.rope.destroy();
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(jumpSpeedX,jumpSpeedY);
        this.changeActionState("jumping");
        this.setJumpInput(false);
    },

    //暂停和继续状态相关
    pauseNow(){
        if(this.pauseing == false && this.stoping == false){
            this.pauseSpeedX = this.getComponent(cc.RigidBody).linearVelocity.x;
            this.pauseSpeedY = this.getComponent(cc.RigidBody).linearVelocity.y;
            this.pauseGravityScale = this.getComponent(cc.RigidBody).gravityScale;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            this.getComponent(cc.RigidBody).gravityScale = 0;
            this.pauseing = true;
        }
        else if(this.pauseing == true && this.stoping == false){

            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.pauseSpeedX,this.pauseSpeedY);
            this.getComponent(cc.RigidBody).gravityScale = this.pauseGravityScale;
            this.pauseing = false;
        }     
    },


    //停止状态相关
    stopNow(){
        if(true)
        {
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
        this.swinging = false;
        this.stoping = false;

        if(state == "standing")
            this.standing = true;
        else if(state == "jumping")
            this.jumping = true;
        else if(state == "runing")
            this.runing = true;
        else if(state == "rebounding")
            this.rebounding = true;
        else if(state == "swinging")
            this.swinging = true;
        else if(state == "stoping")
            this.stoping = true;

        this.state = state;
        
    },

    initAction(){
        //玩家相关动作控制
        this.standing = false
        this.jumping = false;
        this.runing = false;
        this.rebounding = false;
        this.swinging = false;
        this.stoping = false;

        this.pauseing = false;

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

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var StableConfig = cc.find("Canvas/ConfigLayer").getComponent("StableConfig");
        this.canvasWidth = StableConfig.canvasWidth;
        this.moveSpeed = StableConfig.moveSpeed;

        this.playerSprite = cc.find("Sprite",this.node.parent);
        
        this.initAction();
        this.initInputModel();
    },

    start () {

    },

    update (dt) {
    },
});

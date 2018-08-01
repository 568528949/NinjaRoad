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

        arrowPrefab:{
            default : null,
            type : cc.Prefab
        },

        ropePrefab:{
            default : null,
            type : cc.Prefab
        },
    },


    mouseAndTouchDown:function(event){
        if(this.ifBegin == true)
            return;

        this.beginX = event.getLocation().x;
        this.beginY = event.getLocation().y;

        if(this.playerControl.getJumpInput() == true && this.playerControl.slopeing == false){
            this.playerControl.jumpNow(this.jumpSpeedX,this.jumpSpeedY,1);
            this.playerControl.setJumpInput(false);

            this.ifBegin == true
            return;
        } 

        if(this.playerControl.getReboundInput() == true){  

            this.ifBegin = true;
            return;
        }

        if(this.playerControl.getRopeInput() == true && this.playerControl.jumping == true){
            this.rope = cc.instantiate(this.ropePrefab);
            this.playerControl.addRope(this.rope);

            if(true){
                var swingSpeed = this.ropeSwingSpeed;
                var swingRepeat = this.ropeSwingRepeat;
                this.playerControl.swingNow(this.rope,swingSpeed,swingRepeat);
            }

            this.ifBegin = true;
            return;
        }
        
        if(this.playerControl.swinging == true){
            var jumpSpeedX = this.ropeStopJumpSpeedX;
            var jumpSpeedY = this.ropeStopJumpSpeedY;
            this.playerControl.swingStop(jumpSpeedX,jumpSpeedY);

            this.ifBegin = true;
            return;
        }

        if(this.playerControl.slopeing == true){
            var slopeSpeedY = this.slopeSpeedY;
            var slopeSpeedWeight = this.slopeSpeedWeight;
            this.playerControl.slopeStop(slopeSpeedY,slopeSpeedWeight);

            this.ifBegin = true;
            return;
        }

        this.ifBegin = true;
            return;
    },

    mouseAndTouchMove:function(event){
        if(this.ifBegin == false) 
            return;

        this.endX = event.getLocation().x;
        this.endY = event.getLocation().y;

        if(this.playerControl.getReboundInput() == true){

            this.angle = 90 - Math.atan((this.endY - this.controlNode.y)/(this.endX - this.controlNode.x)) * 180 /Math.PI;

            if(this.angle > 90 && this.endX >= this.controlNode.x)
                this.angle = 0;
            else if(this.angle > 90 && this.endX < this.controlNode.x)
                this.angle = 90;

            return;
        }

        if(this.playerControl.getRopeInput() == true && this.playerControl.jumping == true){
            return;
        }
    },

    mouseAndTouchUp:function(){
        //if(this.endX - this.beginX <=5 && this.endx)
        if(this.ifBegin == false)
            return;

        if(this.playerControl.getReboundInput() == true){

            this.playerControl.pauseNow();
            var reboundSpeedX,reboundSpeedY;
            var speed = this.reboundSpeedTotal;
            reboundSpeedX = speed * Math.sin(this.angle/180*(Math.PI));
            reboundSpeedY = speed * Math.cos(this.angle/180*(Math.PI));
            this.playerControl.reboundNow(reboundSpeedX,reboundSpeedY);
            
            this.ifBegin = false;
            return;
        }

        if(this.playerControl.getRopeInput() == true && this.playerControl.jumping == true){
            
            this.ifBegin = false;
            return;
        }

        this.ifBegin = false;
            return;
    },

    initInput(){
        
        //鼠标离开和触控摁下响应函数
        //this.node.on('mousedown', this.mouseAndTouchDown, this);
        this.node.on('touchstart', this.mouseAndTouchDown, this);
        //鼠标离开和触控离开响应函数
        //this.node.on('mouseup', this.mouseAndTouchUp,this);
        this.node.on('touchend', this.mouseAndTouchUp,this);
        //鼠标移动和触控移动响应函数
        //this.node.on('mousemove', this.mouseAndTouchMove, this);
        this.node.on('touchmove', this.mouseAndTouchMove, this);


        //摁键响应函数，用于测试
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            switch(event.keyCode) {
                case cc.KEY.p:
                    this.playerControl.pauseNow();
            }
        }, this);
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.playerControl = this.controlNode.getComponent("PlayerControl");

        this.beginX = 0;
        this.beginY = 0;
        this.endX = 0;
        this.endY = 0;
        this.ifBegin = false;
        this.angle = 0;

        this.initInput();

        this.ActionConfig = cc.find("Canvas/ConfigLayer").getComponent("ActionConfig");
        
        this.runSpeed = this.ActionConfig.runSpeed;

        this.jumpSpeedX = this.ActionConfig.jumpSpeedX;
        this.jumpSpeedY = this.ActionConfig.jumpSpeedY;

        this.reboundSpeedTotal = this.ActionConfig.reboundSpeedTotal;

        this.ropeSwingSpeed = this.ActionConfig.ropeSwingSpeed;
        this.ropeSwingRepeat = this.ActionConfig.ropeSwingRepeat;
        this.ropeStopJumpSpeedX = this.ActionConfig.ropeStopJumpSpeedX;
        this.ropeStopJumpSpeedY = this.ActionConfig.ropeStopJumpSpeedY;
        
        this.slopeSpeedY = this.ActionConfig.slopeSpeedY;
        this.slopeSpeedWeight = this.ActionConfig.slopeSpeedWeight;
    },

    update (dt) {
    },
});

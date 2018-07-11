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
        }
    },


    mouseAndTouchDown:function(event){
        this.beginX = event.getLocation().x;
        this.beginY = event.getLocation().y;

        if(this.playerControl.getJumpInput() == true){
            this.playerControl.jumpNow(300,800,1);
            this.playerControl.setJumpInput(false);
        } 

        if(this.playerControl.getReboundInput() == true){   
            this.ifBegin = true;
        }

        if(this.playerControl.getRopeInput() == true && this.playerControl.jumping == true){
            //this.playerControl.pauseNow();

            this.rope = cc.instantiate(this.ropePrefab);
            this.playerControl.addRope(this.rope);

            this.rope.getComponent("RopeControl").ropeHide();

            this.ifBegin = true;
        }
        if(this.playerControl.swinging == true){
            this.playerControl.swingStop();
        }
    },

    mouseAndTouchMove:function(event){
        this.endX = event.getLocation().x;
        this.endY = event.getLocation().y;

        if(this.playerControl.getReboundInput() == true){

            if(this.ifBegin == false) 
                return;

            this.angle = 90 - Math.atan((this.endY - this.beginY)/(this.endX - this.beginX)) * 180 /Math.PI;

            if(this.angle > 90 && this.endX >= this.beginX)
                this.angle = 0;
            else if(this.angle > 90 && this.endX < this.beginX)
                this.angle = 90;
        }

        if(this.playerControl.getRopeInput() == true && this.playerControl.jumping == true){

            if(this.ifBegin == false) 
                return;

            this.angle = 90 - Math.atan((this.endY - this.beginY)/(this.endX - this.beginX)) * 180 /Math.PI;

            if(this.angle > 90 && this.endX >= this.beginX)
                this.angle = 90;
            else if(this.angle > 90 && this.endX < this.beginX)
                this.angle = 0;

            //this.rope.runAction(rotateAction);
        }
    },

    mouseAndTouchUp:function(){
        //if(this.endX - this.beginX <=5 && this.endx)

        if(this.playerControl.getReboundInput() == true){
            this.playerControl.pauseNow();
            var reboundSpeedX,reboundSpeedY;
            var speed = 1200;
            reboundSpeedX = speed * Math.sin(this.angle/180*(Math.PI));
            reboundSpeedY = speed * Math.cos(this.angle/180*(Math.PI));
            this.playerControl.reboundNow(reboundSpeedX,reboundSpeedY);
            
            this.ifBegin = false;
        }
        if(this.playerControl.getRopeInput() == true && this.playerControl.jumping == true){
            if(this.ifBegin == false)
                return;

            //this.playerControl.pauseNow();
            this.rope.getComponent("RopeControl").ropeShow();
            
            if(true){
                var maxAngle = 55;
                var swingSpeed = 0.6;
                var swingRepeat = 3;
                this.playerControl.swingNow(this.rope,maxAngle,swingSpeed,swingRepeat);
            }
            
            this.ifBegin = false;
        }
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
    },

    update (dt) {
    },
});

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

    initInput(){
        this.node.on('mousedown', function (event) {

            if(this.playerControl.getInputModel() == "nothing")
                return;
            else if(this.playerControl.getInputModel() == "jump")
                this.playerControl.jumpNow(300,800,1);

            else if(this.playerControl.getInputModel() == "rebound"){
                this.beginX = event.getLocation().x;
                this.beginY = event.getLocation().y;
                this.ifBegin = true;
            }

            else if(this.playerControl.getInputModel() == "rope"){
                this.playerControl.pauseNow();
                this.beginX = event.getLocation().x;
                this.beginY = event.getLocation().y;
                this.ifBegin = true;
            }

        }, this);

        //鼠标离开和触控离开响应函数
        this.node.on('mouseup', function (event) {

            
            if(this.playerControl.getInputModel() == "nothing")
                return;

            else if(this.playerControl.getInputModel() == "jump")
                return;

            else if(this.playerControl.getInputModel() == "rebound"){
                this.playerControl.pauseNow();
                var reboundSpeedX,reboundSpeedY;
                var speed = 1200;
                reboundSpeedX = speed * Math.sin(this.angle/180*(Math.PI));
                reboundSpeedY = speed * Math.cos(this.angle/180*(Math.PI));
                this.playerControl.reboundNow(reboundSpeedX,reboundSpeedY);
                
                this.ifBegin = false;
            }
            else if(this.playerControl.getInputModel() == "rope"){
                this.playerControl.pauseNow();
                this.ropeVar = cc.instantiate(this.ropePrefab);
                this.controlNode.addChild(this.ropeVar);
                this.ifBegin = false;
            }

        }, this);


        //鼠标移动和触控移动响应函数
        this.node.on('mousemove', function (event) {
            if(this.playerControl.getInputModel() == "nothing")
                return;

            else if(this.playerControl.getInputModel() == "jump")
                return;

            else if(this.playerControl.getInputModel() == "rebound"){

                if(this.ifBegin == false) 
                    return;

                this.endX = event.getLocation().x;
                this.endY = event.getLocation().y;
    
                this.angle = 90 - Math.atan((this.endY - this.beginY)/(this.endX - this.beginX)) * 180 /Math.PI;
    
                if(this.angle > 90 && this.endX >= this.beginX)
                    this.angle = 0;
                else if(this.angle > 90 && this.endX < this.beginX)
                    this.angle = 90;
            }

            else if(this.playerControl.getInputModel() == "rope"){

                if(this.ifBegin == false) 
                    return;

                this.endX = event.getLocation().x;
                this.endY = event.getLocation().y;
    
                this.angle = Math.atan((this.endY - this.beginY)/(this.endX - this.beginX)) * 180 /Math.PI;
    
                if(this.angle > 90 && this.endX >= this.beginX)
                    this.angle = 0;
                else if(this.angle > 90 && this.endX < this.beginX)
                    this.angle = 90;

                var rotateAction = cc.rotateTo(0,this.angle);
                this.ropeVar.runAction(rotateAction);
            }
            
        }, this);


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

        this.initInput();
    },

    update (dt) {
    },
});

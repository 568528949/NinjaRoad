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
            type : cc.Node
        }
    },

    initInput(){
        this.node.on('mousedown', function (event) {
            this.playerControl.jumpNow(300,800,1);
            this.beginX = event.getLocation().x;
            this.beginY = event.getLocation().y;
            this.ifBegin = true;
        }, this);

        this.node.on('touchstart', function (event) {
            this.playerControl.jumpNow(300,800,1);
        }, this);

        //
        this.node.on('mouseup', function (event) {
            this.ifBegin = false;
        }, this);

        this.node.on('touchend', function (event) {
            
        }, this);

        //鼠标移动和触控移动响应函数

        this.node.on('mousemove', function (event) {
            if(this.ifBegin == false)
                return;

            this.endX = event.getLocation().x;
            this.endY = event.getLocation().y;

            var angleVar = -Math.atan((this.endY - this.beginY)/(this.endX - this.beginX)) * 180 /Math.PI;
            var actionVar = cc.rotateTo(0,angleVar);
            this.arrowPrefab.runAction(actionVar);
        }, this);

        this.node.on('touchmove', function (event) {
            
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

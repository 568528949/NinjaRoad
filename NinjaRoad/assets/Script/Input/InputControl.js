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
        }
    },

    initInput(){
        this.node.on('mousedown', function (event) {
            this.playerControl.jumpNow(300,800,1);
        }, this);

        this.node.on('touchstart', function (event) {
            this.playerControl.jumpNow(300,300,1);
        }, this);

        //离开（触摸结束）响应，记录结束位置，根据差值判断是左移命令还是右移命令
        this.node.on('mouseup', function (event) {
            
        }, this);

        this.node.on('touchend', function (event) {
            
        }, this);
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.playerControl = this.controlNode.getComponent("PlayerControl");

        this.initInput();
    },

    update (dt) {
    },
});

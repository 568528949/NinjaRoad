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
        //Canvas相关参数
        canvasHeight : 640,
        canvasWidth : 1136,

        //Background相关参数
        backgroundHeight : 640,
        backgroundWidth : 500,
        backgroundHeightDeviation : 0,
        backgroundWidthDeviation : -318,
        backgroundNum : 20,

        //全局移动动画速度
        movespeed : 0.2,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //计算background的相关参数
        
    },

    start () {

    },

    // update (dt) {},
});

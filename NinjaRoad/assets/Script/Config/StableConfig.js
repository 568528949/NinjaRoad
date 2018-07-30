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
        backgroundHeight : 550,
        backgroundWidth : 500,
        //backgroundNum : 48,

        //Pass相关参数
        passMetelWidth : 800,
        passMetelNum :30,

        //全局移动动画速度
        moveSpeed : 0.2,

        //碰撞相关
        enabledDebugDraw : false,
        enabledDrawBoundingBox : false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //计算background的相关参数

        //启动物理系统
        cc.director.getPhysicsManager().enabled = true;

        //碰撞系统
        cc.director.getCollisionManager().enabled = true;                                           //true为启动碰撞
        cc.director.getCollisionManager().enabledDebugDraw = this.enabledDebugDraw;                 //true为显示碰撞检测范围
        cc.director.getCollisionManager().enabledDrawBoundingBox = this.enabledDrawBoundingBox;     //true为显示组件包围盒
        
    },

    start () {

    },

    // update (dt) {},
});

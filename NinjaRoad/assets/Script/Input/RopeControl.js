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
        angleDeviation : 10,
    },

    ropeShow(){
        this.node.opacity = 255;
    },

    ropeHide(){
        this.node.opacity = 0;
    },

    hanged(beginX,beginY,angle,ropePointLoc){
        this.beginX = beginX;
        this.beginY = beginY;

        this.angle = 90-Math.atan((ropePointLoc.y - this.beginY)/(ropePointLoc.x - this.beginX)) * 180 /Math.PI;

        if(this.angle - angle <= this.angleDeviation && this.angle - angle >= -this.angleDeviation )
            return true;
        else
            return false;
    },

    swing(){

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});

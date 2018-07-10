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
        this.r = cc.pDistance(cc.v2(beginX,beginY),ropePointLoc);

        if(true){
            this.node.rotation = this.angle;
            this.node.height = this.r;
            this.node.getComponent(cc.DistanceJoint);
            return true;
        }      
    },

    swing(swingAngle,maxAngel,swingSpeed,swingRepeat){
        this.node.runAction(cc.sequence(
            cc.rotateTo(swingSpeed*swingAngle/maxAngel,0),
            cc.rotateBy(swingSpeed,-maxAngel),
            cc.rotateBy(swingSpeed*2,maxAngel*2),
            cc.repeat(
                cc.sequence(
                    cc.rotateBy(swingSpeed*2,-maxAngel*2),
                    cc.rotateBy(swingSpeed*2,maxAngel*2)
                ),
                swingRepeat -1
            )
        ));

        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});

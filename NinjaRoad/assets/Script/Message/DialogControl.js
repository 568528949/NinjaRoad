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
        //对话框的prefab
        dialogPreFab : {
            default : null,
            type : cc.Prefab
        },
    },

    //显示对话框
    showDialog(){    
        var dialog = cc.instantiate(this.dialogPreFab);
        this.node.addChild(dialog);

        this.dialog = dialog;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //当前对话框是否显示
        this.isShowDialog = false;

        //当前显示的对话框
        this.dialog = null;
    },

    start () {

    },

    update (dt) {
    },
});

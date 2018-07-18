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
        passPrefabList:{
            default : [],
            type : cc.Prefab
        }
    },


    initPassNameMap(){
        this.passNameMap = new Map();
        for(var i=0;i < this.passPrefabList.length;i++){
            if(this.passPrefabList[i] == null)
                continue;

            this.passNameMap.set(this.passPrefabList[i].name,i);
        }
    },

    initPassSequence(){
        var sequenceNum = 50;
        this.passSequence = [];

        this.passSequence[0] = "P000";
        for(var i=1;i<sequenceNum;i++){
            var nextPassPossible = this.passLimitMap.get(this.passSequence[i-1]);
            this.passSequence[i] = nextPassPossible[this.MyMath.random(0,nextPassPossible.length-1)];
        }
        //this.passSequence = ["P000","P021","P021","P023","P012"];
    },

    initPass(){
        this.nextX = 0;
        for(var i = 0 ;i< this.passSequence.length;i++){
            
            if(true){
                var passVar = cc.instantiate(this.passPrefabList[this.passNameMap.get(this.passSequence[i])]);
                passVar.x = this.nextX;
                this.nextX += passVar.width;
                this.node.parent.addChild(passVar);
            }
            else{

            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.MyMath = cc.find("Canvas/ConfigLayer").getComponent("MyMath");
        this.initPassLimit();
        this.initPassNameMap();
        this.initPassSequence();
        this.initPass();
    },

    start () {

    },

    // update (dt) {},

    initPassLimit(){
        this.passLimitMap = new Map();
        
        //设置pass连接关系限制
        //platform的
        this.passLimitMap.set("P000",
        ["P000","P001","P002","P010","P011","P012","P020","P021","P022"]);
        this.passLimitMap.set("P001",
        ["P000","P001","P002","P003","P010","P011","P012","P013","P020","P021","P022","P023"]);
        this.passLimitMap.set("P002",
        ["P000","P001","P002","P003","P010","P011","P012","P013","P020","P021","P022","P023"]);
        this.passLimitMap.set("P003",
        ["P000","P001","P002","P003","P010","P011","P012","P013","P020","P021","P022","P023"]);
        this.passLimitMap.set("P010",
        ["P000","P001","P010","P011","P020","P021"]);
        this.passLimitMap.set("P011",
        ["P000","P001","P002","P010","P011","P012","P020","P021","P022"]);
        this.passLimitMap.set("P012",
        ["P000","P001","P002","P003","P010","P011","P012","P013","P020","P021","P022","P023"]);
        this.passLimitMap.set("P013",
        ["P000","P001","P002","P003","P010","P011","P012","P013","P020","P021","P022","P023"]);
        this.passLimitMap.set("P020",
        ["P000","P010","P020"]);
        this.passLimitMap.set("P021",
        ["P000","P001","P010","P011","P020","P021"]);
        this.passLimitMap.set("P022",
        ["P000","P001","P002","P010","P011","P012","P020","P021","P022"]);
        this.passLimitMap.set("P023",
        ["P000","P001","P002","P003","P010","P011","P012","P013","P020","P021","P022","P023"]);
    },
});

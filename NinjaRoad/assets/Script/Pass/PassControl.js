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
        var StableConfig = cc.find("Canvas/ConfigLayer").getComponent("StableConfig");
        var allPassWidth = StableConfig.passMetelWidth * StableConfig.passMetelNum;

        this.passSequence = [];
        this.nextX = 0;


        var debug = false;
        if(debug == true){
            this.passSequence = ["P011","S002","S002"];
            for(var i = 0;i < this.passSequence.length;i++){
                var passVar = cc.instantiate(this.passPrefabList[this.passNameMap.get(this.passSequence[i])]);
                passVar.x = this.nextX;
                this.nextX += passVar.width;
                this.node.parent.addChild(passVar);
            }
            return;
        }


        for(var i=0;;i++){
            if(this.nextX >= allPassWidth)
                break;

            if(i == 0)
                this.passSequence[0] = "P000";
            else{
                var nextPassPossible = this.passLimitMap.get(this.passSequence[i-1]);
                var nextPassWeight = this.passLimitWightMapAll.get(this.passSequence[i-1]);
                var nextPassIndex = this.MyMath.randomByWeight(0,nextPassPossible.length-1,nextPassWeight);
                //var nextPassIndex = this.MyMath.random(0,nextPassPossible.length-1);
                this.passSequence[i] = nextPassPossible[nextPassIndex];
            }
            
            var passVar = cc.instantiate(this.passPrefabList[this.passNameMap.get(this.passSequence[i])]);
            passVar.x = this.nextX;
            this.nextX += passVar.width;
            this.node.parent.addChild(passVar);
        }
        //this.passSequence = ["P003","S012","P000"];
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.MyMath = cc.find("Canvas/ConfigLayer").getComponent("MyMath");
        this.passObject = cc.find("Canvas/JsonLayer").getComponent("JsonPassLimit").json;

        this.initPassLimit();
        this.initPassNameMap();
        this.initPassSequence();
    },

    start () {

    },

    // update (dt) {},

    initPassLimit(){
        this.passLimitMap = new Map();
        
        //设置pass连接关系限制
        for(var i = 0;i<this.passObject.passLimit.length;i++){
            var key = this.passObject.passLimit[i].key;
            var value = [];
            for(var j = 0;j<this.passObject.passLimit[i].value.length;j++){
                value[j] = this.passObject.passLimit[i].value[j].nextPass;
            }
            this.passLimitMap.set(key,value);
        }

        //设置pass连接关系的权值
        this.passLimitWightMapAll = new Map();
        for(var i = 0;i<this.passLimitMap.size;i++){
            var key = this.passObject.passLimit[i].key;
            var value = [];
            for(var j = 0;j<this.passObject.passLimit[i].value.length;j++){
                value[j] = this.passObject.passLimit[i].value[j].nextWeight;
            }
            this.passLimitWightMapAll.set(key,value);
        }
    },

});

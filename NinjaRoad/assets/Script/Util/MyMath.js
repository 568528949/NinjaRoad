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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    random(min,max){
        var num;

        var randVar = Math.floor(Math.random() * (max-min+1)+min);
        num = randVar;

        return num;
    },

    randomByWeight(min,max,weightList){
        var interval = max - min + 1;
        if(interval != weightList.length)
            return;

        for(var i =0;i<weightList.length;i++){
            weightList[i] = parseInt(weightList[i]);
        }

        var allWeight = 0;
        for(var i=0;i<weightList.length;i++){
            allWeight +=weightList[i];
        }
        
        var randomVar = Math.random() * allWeight;
        var weightSope = 0;
        for(var i=0;i<weightList.length;i++){
            weightSope += weightList[i];
           
            if(randomVar < weightSope)
                return min+i;
            
        }
        return max;
    },

    randomList(min,max,num){
        var numListVar = [];

        for(var i = 0;i< num;i++){
            var randVar = Math.floor(Math.random() * (max-min+1)+min);
            numListVar[i] = randVar;
        }

        return numListVar;
    },

    listMerge(list1,list2,tag){
        var list = [];

        if(tag == false)
        {
            for(var i=0;i<list1.length;i++){
                list[i] = list1[i];
            }
    
            for(i=0;i<list2.length;i++){
                list[i+list1.length] = list2[i];
            }
        }
        else{
            for(var i=0;i<list1.length;i++){
                list[i] = list1[i];
            }
    
            for(i=1;i<list2.length;i++){
                list[i+list1.length-1] = list2[i];
            }
        }

        return list;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});

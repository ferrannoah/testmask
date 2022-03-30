var iframe = document.getElementById('model-frame');

var version = '1.7.1';

var uid = 'c899d32cd2c64ca996b0e4154635a850';

var client = new Sketchfab( version, iframe);

var nodes = [ 172,  187,  199,  211, 223, 235,  247,  259, 271,  283,  295,  307,  319, 331,  343,  355,  367,  379,  391,  403,  415,  427,  439,  451,  463,  475,  487,  499, 511, 523, 535, 547, 559, 571, 583, 595, 607, 619, 631, 643, 655, 667, 679, 691, 703, 715, 727];

var nodes = [172,189,200,221,238,255,270,279,282,294,306,312,318,338,344,350,370,382,394,406,418,430,442,454,466,478,490,502,514,526,538,550,562,574,586,598,610,622,634,646,658,670,682,694,706,718,730,742,754,766,778,790,802,814,826,838,850,862,874,886,898,910,922,934,946,958,970,982,994,1006,1018,1030,1042,1054,1066,1078,1090,1102,1114,1126,1138,1150,1162,1174]

var helmetnodes = [5,16,27,38,49,60,71,82,93,104,115];

costHTML = document.getElementById("cost"); 
selectedVisionHTML = document.getElementById("selectedVision");

var errorRed = false;
var red = 0;
var currentClass;
var cost = 100;

var clickedColor = "grey"; // gray
var clickableColor = "black"; // maroon
var blockedColor = "red"; // black

class bar{
    constructor(op, ag, name, price, needSet, cantSetop, cantSetag){
        this.op = op;
        this.ag = ag;
        this.name = name;
        this.classID = "#" + name;
        this.price = price;
        this.needSet = needSet;
        this.cantSetop = cantSetop;
        this.cantSetag = cantSetag;
        this.clicked = false;
        this.red = false;
        this.able = true;
        this.clickable = function clickable(click){
            this.able = click;
        }
        this.clickCase = function clickCase(click){
            this.clicked = click;
        }
        this.redOut = function redOut(click){
            this.red = click;
        }
        this.color = function(clicked, classID, color){
            if(color == null){
                if(clicked){
                    $(classID).css("color", clickedColor);
                }else{
                    $(classID).css("color", clickableColor);
                }
            }else{
                $(classID).css("color", color);
            }
        }
        this.getVision = function(vision){
            if(vision == "op"){
                return this.op;
            }else if(vision == "ag"){
                return this.ag;
            }
        }
        this.addCantSetop = function(cantSet){
            this.cantSetop = cantSet;
        }
        this.addToCantSetOp = function(cantSet){
            for(var i = 0; i < cantSet.length; i++){
                this.cantSetop.push(cantSet[i])
            }
        }
        this.addCantSetag = function(cantSet){
            this.cantSetag = cantSet;
        }
        this.addToCantSetAg = function(cantSet){
            for(var i = 0; i < cantSet.length; i++){
                this.cantSetag.push(cantSet[i])
            }
        }
    }
}

var v1 = new bar([382], [394], "v1", 12);
var v2 = new bar([826], [766], "v2", 22);
//var v3 = new bar([742], [730], "v3", 22);
var v3 = new bar([838], [778], "v3", 22);
var v4 = new bar([850], [790], "v4", 22);
var v5 = new bar([862], [802], "v5", 22);


var h3 = new bar(0, [874], "h3", 27);
var h4 = new bar([886], [634], "h4", 27);
var h5 = new bar([622], [622], "h5", 27);
var h6 = new bar([610], [610], "h6", 27);
var h7 = new bar([598], [598], "h7", 27);

var l1 = new bar([970], [586], "l1", 22, h6, [], []); //\\562 574
var l2 = new bar([982], [574], "l2", 22, h5, [], []);
var l3 = new bar([994], [562], "l3", 22, h4, [], []);
var l4 = new bar([1006], [550], "l4", 22, h3, [], []);
var l5 = new bar([1018], [538], "l5", 22, null, [], []);
var l6 = new bar([1030], [526], "l6", 22, null, [], []);
var l7 = new bar([1042], [514], "l7", 22, null, [], []);
var l8 = new bar([1054], [502], "l8", 22, null, [], []);
var l9 = new bar([1066], [490], "l9", 22, null, [], []);
var l10 = new bar(0, [478], "l10", 22, null, [], []);

var d1 = new bar([1078], [718], "d1", 22, h4, [l4], [v2,l4,l5,l6]);
var d2 = new bar([1090], [706], "d2", 22, h5, [v2,l3,l4,l5], [v2,v3,l3,l4,l5,l6,l7]); // \\//
var d3 = new bar([1102], [694], "d3", 22, h6, [v2,v3,l2,l3,l4,l5,l6], [v2,v3,v4,l2,l3,l4,l5,l6,l7,l8]);
var d4 = new bar([1114], [682], "d4", 22, h7, [v2,v3,v4,l1,l2,l3,l4,l5,l6,l7], [v2,v3,v4,v5,l2,l3,l4,l5,l6,l7,l8,l9]);
var d5 = new bar([1126], [670], "d5", 22, null, [v2,v3,v4,v5,l1,l2,l3,l4,l5,l6,l7,l8], [v2,v3,v4,v5,l1,l2,l3,l4,l5,l6,l7,l8,l9,l10]);
var d6 = new bar([1138], [658], "d6", 22, null, [v4,v5,l2,l3,l4,l5,l6,l7,l8,l9], [v4,v5,l2,l3,l4,l5,l6,l7,l8,l9]);
var d7 = new bar([1150], [646], "d7", 22, null, [l4,l5,l6], [l5,l6]);

var s1 = new bar([221],[221], "s1", 0, [],[],[]);
var s2 = new bar([172],[172], "s2", 0, [],[],[]);
var s3 = new bar([238],[238], "s3", 0, [],[],[]);

var e1 = new bar([922],0, "e1",0); // EG HD
var e2 = new bar([934],0, "e2",0); // HAWK HD
var e3 = new bar([454],[754], "e3",0); // OPEN
var e4 = new bar([466],0, "e4",0); // BECK

var b1 = new bar([1162],[1162], "b1",0,[],[],[]); // 2B
var b2 = new bar([910],[910], "b2",0,[],[],[]); // 2BD
var b3 = new bar([946],[946], "b3",0,[],[],[]); // HD

var shoc = new bar([189,200],[189,200], "shoc", 0,[],[],[]);

var beck = new bar([370],[1174], "beck", 0)
var beck808 = new bar([418], 0, "beck808", 0);
var h8082 = new bar([442],[430],"8082", 0);
var bull = new bar([958],[898], "bull", 0, [], [l3,v3,v4], [l4,l5,v3,v4]); // Open Bull
var h808 = new bar([430], 0,"808",0, [d4, bull, v3], [h6], [h6]);
var u = new bar([814],[814], "u", 0, [b2], [b1,b3], [b1,b3]); // U
var vn = new bar([406], [406], "vn", 22, [], [v1], [v1]);

var agF = new bar([338,344,350],[1174], "agF", 0, [], [], []);
var opF = new bar([306,312,318],[370], "opF", 0, [], [], []);

b1.addCantSetop([u]);b1.addCantSetag([u]);
b3.addCantSetop([u]);b3.addCantSetag([u]);

l1.addCantSetop([v2,d4]); l1.addCantSetag([v2,d4,d5]);
l2.addCantSetop([v2,v3,d3,d4,d5,d6]); l2.addCantSetag([v2,v3,d3,d4,d5,d6]);
l3.addCantSetop([v2,v3,v4,d2,d3,d4,d5,d6]); l3.addCantSetag([v2,v3,v4,d2,d3,d4,d5,d6]);
l4.addCantSetop([v2,v3,v4,v5,d1,d2,d3,d4,d5,d6,d7]); l4.addCantSetag([v2,v3,v4,v5,d1,d2,d3,d4,d5,d6]);
l5.addCantSetop([v3,v4,v5,d2,d3,d4,d5,d6,d7]); l5.addCantSetag([v2,v3,v4,v5,d1,d2,d3,d4,d5,d6,d7]);
l6.addCantSetop([v4,v5,d3,d4,d5,d6,d7]); l6.addCantSetag([v3,v4,v5,d1,d2,d3,d4,d5,d6,d7]);
l7.addCantSetop([v5,d4,d5,d6]); l7.addCantSetag([v4,v5,d2,d3,d4,d5,d6]);
l8.addCantSetop([d5,d6]); l8.addCantSetag([v5,d3,d4,d5,d6]);
l9.addCantSetop([d6]); l9.addCantSetag([d4,d5,d6]);
l10.addCantSetag([d5]);

var openStart = [v1.op, h4.op, v3.op, 306,312,318, b2.op];
var aggressiveStart = [v1.ag, h3.ag, v3.ag, 338,344,350, b2.ag];
var eyeNodes = [e1,e2,e3,e4]
var aggNodes = [v1,v3,h3,h4,b2];
var openNodes = [h4,h3,v1,v3,b2];
var allNodes = [b1,b2,b3,v1,v2,v3,v4,v5,h3,h4,h5,h6,h7,d1,d2,d3,d4,d5,d6,d7,l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,beck,h808,beck808,bull,u,b1,b2,b3,e1,e2,e3,e4];
var vertNodes = [v1,v2,v3,v4,v5];
var diagNodes = [d1,d2,d3,d4,d5,d6,d7,l1,l2,l3,l4,l5,l6,l7,l8,l9,l10];
var horizNodes = [h3,h4,h5,h6,h7];
var visorNodes = [s1,s2,s3,shoc];
var browbars = [b1,b2,b3];
var specNodes = [bull, h808, u, vn];
var toggleSet = [u,b1,b3,vn];

var hideSet = function(api, nodeSet){
    for(var i=0;i<nodeSet.length;i++){
        api.hide(nodeSet[i]);
    }
}
var hideSet2 = function(api, nodeSet){
    for(var i=0;i<nodeSet.length;i++){
        api.hide(nodeSet[i].getVision(vision));
    }
}

var showSet = function(api, nodeSet){
    for(var i=0;i<nodeSet.length;i++){
        api.show(nodeSet[i]);
    }
}

var toggleCost = function(classHead, toggledClass, document){
    $(document).ready(function(){
        $(classHead).click(function(){
            $(toggledClass).show();
            $("#colorInput").show();
            $("#colorText").show();
            $("#sumbit").show();
        });
    });
}

var colorAndAble = function(nodeSet, bool){
    for(var i = 0; i< nodeSet.length;i++){
        nodeSet[i].clickable(bool);
    }
    if(bool == false){
        colorAll(nodeSet,blockedColor);
    }else{
        colorAll(nodeSet);
    }
}

var checkEG = function(){
    if(b2.clicked){
        if(vision == "op"){
            colorAndAble(eyeNodes, true);
        }
    }
E
    if(vision == "ag"){
        /*e3.color(e3.clicked,e3.classID,clickableColor);
        e3.clickable(false);
        e6.color(e6.clicked,e6.classID,clickableColor);
        e6.clickable(false);*/
    }
}

var checkNodeInSet = function(node, set){
    for(var i = 0; i < set.length; i++){
        if(set[i].name == node.name){
            return true;
        }
    }
    return false;
}

var browCheck = function(nodeSet, api){
    if(vision == "op"){
        if(checkNodeInSet(nodeSet, browbars)){
            if(nodeSet.clicked == true){
                hideSet2(api, browbars);
                falseClick(browbars);
                colorAll(browbars,clickableColor);
                showSet(api,nodeSet.getVision(vision));
                nodeSet.clickCase(true);
                colorAndAble(nodeSet.cantSetop,false);
            }

            hideSet2(api, eyeNodes);
            falseClick(eyeNodes);
            colorAll(eyeNodes,clickableColor);
            nodeSet.color(nodeSet.clicked,nodeSet.classID);
        }

        if(checkNodeInSet(nodeSet, eyeNodes)){
            if(nodeSet.clicked == true){
                hideSet2(api,eyeNodes);
                falseClick(eyeNodes);
                colorAll(eyeNodes,clickableColor);
                showSet(api,nodeSet.getVision(vision));
                nodeSet.clickCase(true);
            }
            nodeSet.color(nodeSet.clicked,nodeSet.classID);
        }
    }else{
        if(checkNodeInSet(nodeSet, browbars)){
            if(nodeSet.clicked == true){
                hideSet2(api, browbars);
                falseClick(browbars);
                colorAll(browbars,clickableColor);
                showSet(api,nodeSet.getVision(vision));
                nodeSet.clickCase(true);
           }

            hideSet2(api, e3);
            falseClick(e3);
            colorAll(e3,clickableColor);
            nodeSet.color(nodeSet.clicked,nodeSet.classID);
        }

        if(nodeSet.name == "e3"){
            nodeSet.color(nodeSet.clicked,nodeSet.classID);
        }
    }
    for(var i = 0; i < browbars.length; i++){
        if(browbars.clicked){
            if(vision == "op"){
                colorAndAble(browbars[i].cantSetop,false);
                checkSpecOP(api);
            }else{
                colorAndAble(browbars[i].cantSetag,false);
                checkSpecAG(api);
            }
        }else{
            if(vision == "op"){
                colorAndAble(browbars[i].cantSetop,true);
                checkSpecOP(api);
            }else{
                colorAndAble(browbars[i].cantSetag,true);
                checkSpecAG(api);
            }
        }
    }
    
}

var visorToggle = function(api, classID, nodeSet){
    document.getElementById(classID).addEventListener('click',function(){
        
        for(var i = 0; i < visorNodes.length; i++){
            if(visorNodes[i].clicked && visorNodes[i] != nodeSet){
                hideSet(api, visorNodes[i].getVision(vision));
                visorNodes[i].clickCase(false);
                visorNodes[i].color(visorNodes[i].clicked,visorNodes[i].classID);
            }
        }
        if(!nodeSet.clicked){
            nodeSet.clickCase(true);
            nodeSet.clickable(true);
            showSet(api, nodeSet.getVision(vision));
            showSet(api, shoc.getVision(vision));
        }else{
            nodeSet.clickCase(false);
            nodeSet.clickable(true);
            hideSet(api, nodeSet.getVision(vision));
            hideSet(api, shoc.getVision(vision));
        }
        if(nodeSet.able && nodeSet.getVision(vision) != 0){
            nodeSet.color(nodeSet.clicked,nodeSet.classID);
        }else{
            console.log("unclickable");
        }
    });
}

var checkEye = function(api){
    if(vision == "op"){
        if(b1.clicked){
            colorAndAble(eyeNodes, false);
            hideSet2(api, eyeNodes);
        }else if(b2.clicked){
            //checkBeck??
            colorAndAble(eyeNodes, true);
            colorAndAble([e1], false);
            hideSet2(api, [e1]);
        }else if(b3.clicked){
            colorAndAble(eyeNodes, false);
            hideSet2(api, eyeNodes);
        }
    }else{
        if(b2.clicked){
            colorAndAble([e3], true);
        }else{
            colorAndAble([e3], false);
            hideSet2(api, [e3]);
            e3.clickCase(false);
        }
    }

}

var toggle808 = function(api, classID, nodeSet){
    document.getElementById(classID).addEventListener('click',function(){
        if(nodeSet.able && nodeSet.getVision(vision) != 0){
            if(!nodeSet.clicked){
                nodeSet.clickCase(true);
                nodeSet.clickable(true);
                if(!beck.clicked)
                    showSet(api, nodeSet.getVision(vision));
                else
                    showSet(api, beck808.getVision(vision));
            }else{
                nodeSet.clickCase(false);
                nodeSet.clickable(true);
                hideSet(api, nodeSet.getVision(vision));
                hideSet(api, beck808.getVision(vision));
            }
            nodeSet.color(nodeSet.clicked,nodeSet.classID);
        }else{
            console.log("unclickable");
        }
    });
}

var beckToggle =  function(api, classID, nodeSet){
    document.getElementById(classID).addEventListener('click',function(){
        if(!nodeSet.clicked){
            if(vision == "op"){
                hideSet(api, opF.op);
                if(h808.clicked){
                    hideSet(api, h808.op);
                    showSet(api, beck808.op)
                }
            }else{
                hideSet(api, agF.op);
            }
            nodeSet.clickCase(true);
            nodeSet.clickable(true);
            showSet(api, nodeSet.getVision(vision));
        }else{
            if(vision == "op"){
                showSet(api, opF.op);
                if(h808.clicked){
                    hideSet(api, beck808.op);
                    showSet(api, h808.op)
                }
            }else{
                showSet(api, agF.op);
            }
            nodeSet.clickCase(false);
            nodeSet.clickable(true);
            hideSet(api, nodeSet.getVision(vision));
        }
        if(nodeSet.able && nodeSet.getVision(vision) != 0){
            nodeSet.color(nodeSet.clicked,nodeSet.classID);
        }else{
            console.log("unclickable");
        }
    });
}

var barToggle = function(api, classID, nodeSet){
    document.getElementById(classID).addEventListener('click',function(){
        
        if(nodeSet.able && nodeSet.getVision(vision) != 0){
            if(!nodeSet.clicked){
                showSet(api, nodeSet.getVision(vision));
                cost += nodeSet.price;
                nodeSet.clickCase(true);
                nodeSet.clickable(true);
                if(vision == "op"){
                    checkDiagOP(api);
                    checkVertsOP(api);
                    checkSpecOP(api);
                }else{
                    checkDiagAG(api);
                    checkVertsAG(api);
                    checkSpecAG(api);
                }
            }else{
                hideSet(api, nodeSet.getVision(vision));
                cost -= nodeSet.price;
                nodeSet.clickCase(false);
                nodeSet.clickable(true);
                if(vision == "op"){
                    checkDiagOP(api);
                    checkVertsOP(api);
                    checkSpecOP(api);
                }else{
                    checkDiagAG(api);
                    checkVertsAG(api);
                    checkSpecAG(api);
                }
            }
        }
        if(nodeSet.able && nodeSet.getVision(vision) != 0){
            nodeSet.color(nodeSet.clicked,nodeSet.classID);
            browCheck(nodeSet, api);
            checkEye(api);
            checkToggle(nodeSet,api);
        }else{
            console.log("unclickable");
        }


        //check808(api);
        
        
        // checkNose(api);
        
        costHTML.innerHTML = "Total: $" + cost;
    });
}

var visionToggle = function(api, classID, nodeSet, visionNodes) {
    document.getElementById(classID).addEventListener('click', function(){

            
            if(vision == "op" && classID == 'open'){
                
            }else if(vision == "op" && classID == 'obeck'){}
            else if(vision == "ag" && classID == 'agg'){}
            else if(vision == "ag" && classID == 'abeck'){}
            
            else{
                hideSet(api, nodes);
                falseClick(allNodes);
                colorAll(allNodes);
                showSet(api, nodeSet);
                trueClick(visionNodes);
                colorAll(visionNodes);
            }
            
            
            
        if(classID == 'open'){
            vision = "op";
            changeColor("#open", clickedColor);
            changeColor("#agg", clickableColor);
            checkVertsOP(api);
            checkDiagOP(api);
            h3.color(h3.clicked, h3.classID, blockedColor);
            h3.clickCase(false);
            h3.clickable(false);
            colorAndAble([e1,bull,l10], false);
           // e3.clickable(true);
           // e6.clickable(true);
           // s2.color(s2.clicked, s2.classID, blockedColor);
           // s2.clickable(false);
            cost = 137;
            selectedVisionHTML.innerHTML = "OPEN VISION";
            
        } else if(classID == 'agg'){
            vision = "ag";
            changeColor("#open", clickableColor);
            changeColor("#agg", clickedColor);
           // e3.color(e3.clicked, e3.classID, clickableColor);
           // e3.clickable(false);
           // e6.color(e6.clicked, e6.classID, clickableColor);
           // e6.clickable(false);
           // s2.clickable(true);
            checkDiagAG(api);
            checkVertsAG(api);
            h3.clickable(true);
            colorAndAble([e1,e2,bull,e4,h808], false);
            cost = 137;
            selectedVisionHTML.innerHTML = "AGGRESSIVE VISION";
        }
        checkError(currentClass, document);
        check808(api);
        
        costHTML.innerHTML = "Cost: $" + cost;
        
    })
}

var colorAll = function (nodeSet, color) {
    for(var i= 0; i< nodeSet.length; i++){
        nodeSet[i].color(nodeSet[i].clicked, nodeSet[i].classID, color);
    }
}

var falseClick = function (barSet) {
    for(var i=0;i<barSet.length; i++){
        barSet[i].clickCase(false);
    }
}

var checkError = function(classHead, document){
    $(document).ready(function(){
        switch(classHead){
            case "#horiz":
                for(var i=0; i < horizNodes.length; i++){
                    if(!horizNodes[i].able){
                        errorRed = true;
                    }
                }
                break;
            case "#vert":
                for(var i=0; i < vertNodes.length; i++){
                    if(!vertNodes[i].able){
                        errorRed = true;
                    }
                }
                break;
            case "#diag":
                for(var i=0; i < diagNodes.length; i++){
                    if(!diagNodes[i].able){
                        errorRed = true;
                    }
                }
                break;
            case "#diag2":
                for(var i=0; i < diagNodes.length; i++){
                    if(!diagNodes[i].able){
                        errorRed = true;
                    }
                }
                break;
            case "#eye":
                for(var i=0; i < eyeNodes.length; i++){
                    if(!eyeNodes[i].able){
                        errorRed = true;
                    }
                }
                break;
                case "#spe":
                    for(var i=0; i < specNodes.length; i++){
                        if(!specNodes[i].able){
                            errorRed = true;
                        }
                    }
                    break;
            default:
                break
        }
        if(errorRed){
            $("#error").show();
        }else{
            $("#error").hide();
        }
        errorRed = false;
        currentClass = classHead;
    })
}

var trueClick = function (barSet) {
    for(var i=0;i<barSet.length; i++){
        barSet[i].clickCase(true);
    }
}

var checkHoriz = function(){
    for(var i=0;i<horizNodes.length;i++){
        if(!horizNodes[i].clicked){
            red += 1;
        }
    }
    if(red == horizNodes.length){
        red = 0;
        return true;
    } else {
        red = 0;
        return false;
    }  
}

var checkToggle = function(nodeset, api){
    if(checkNodeInSet(nodeset,toggleSet)){
        if(nodeset.clicked){
            if(vision == "op"){
                colorAndAble(nodeset.cantSetop, false);
            }else{
                colorAndAble(nodeset.cantSetag, false);
            }
        }else{
            if(vision == "op"){
                colorAndAble(nodeset.cantSetop, true);
            }else{
                colorAndAble(nodeset.cantSetag, true);
            }
        }
    }
}

var checkSpecOP = function(api){
    for(var i=0;i<specNodes.length;i++){
        for(var j=0; j< specNodes[i].cantSetop.length; j++){
            if(specNodes[i].cantSetop[j] == undefined){
                console.log(specNodes[i]);
            }else if(specNodes[i].cantSetop[j].clicked){
                red = 1;
            }else if(specNodes[i].clicked){
                specNodes[i].cantSetop[j].clickable(false);
                specNodes[i].cantSetop[j].color(specNodes[i].cantSetop[j].clicked,specNodes[i].cantSetop[j].classID,blockedColor);
            }
        }
        // checks if needSet is selected 
        var check = false;
        if(specNodes[i].needSet.length > 0){
            for(var j = 0; j < specNodes[i].needSet.length; j++){
                if(specNodes[i].needSet[j].clicked){
                    check = true;
                }
            }
        }else{
            check = true;
        }

        if(red != 1 && check == true){
            colorAndAble([specNodes[i]], true);
        }else{
            hideSet(api, specNodes[i].getVision(vision));
            specNodes[i].clickCase(false);
            colorAndAble([specNodes[i]], false);
        }
        red = 0;
        if(checkNodeInSet(specNodes[i],toggleSet)){
            if(!specNodes[i].clicked){
                colorAndAble(specNodes[i].cantSetop, true);
            }
        }
    }
}
var checkSpecAG = function(api){
    for(var i=0;i<specNodes.length;i++){
        for(var j=0; j< specNodes[i].cantSetag.length; j++){
            if(specNodes[i].cantSetag[j] == undefined){
                console.log(specNodes[i]);
            }else if(specNodes[i].cantSetag[j].clicked){
                red = 1;
            }else if(specNodes[i].clicked){
                
                specNodes[i].cantSetag[j].clickable(false);
                specNodes[i].cantSetag[j].color(specNodes[i].cantSetag[j].clicked,specNodes[i].cantSetag[j].classID,blockedColor);
            }
        }
        // checks if needSet is selected 
        var check = false;
        if(specNodes[i].needSet.length > 0){
            for(var j = 0; j < specNodes[i].needSet.length; j++){
                if(specNodes[i].needSet[j].clicked){
                    check = true;
                }
            }
        }else{
            check = true;
        }

        if(red != 1 && check == true && specNodes[i].name != "808"){
            colorAndAble([specNodes[i]], true);
        }else{
            hideSet(api, specNodes[i].getVision(vision));
            specNodes[i].clickCase(false);
            colorAndAble([specNodes[i]], false);
        }
        red = 0;
        if(checkNodeInSet(specNodes[i],toggleSet)){
            if(!specNodes[i].clicked){
                colorAndAble(specNodes[i].cantSetag, true);
            }
        }
    }
}

var checkVertsOP = function(api){
    for(var i=0; i<vertNodes.length;i++){
        for(var j=0;j<diagNodes.length;j++){
            for(var k=0;k<diagNodes[j].cantSetop.length;k++){
                if(diagNodes[j].clicked){
                    if(diagNodes[j].cantSetop[k] == vertNodes[i]){
                        red = 1;
                    }
                }
            }
        }
        if(red != 1){
            vertNodes[i].clickable(true);
            vertNodes[i].color(vertNodes[i].clicked,vertNodes[i].classID);
        }
        red = 0;
    }
}

var checkDiagOP = function(api){
    for(var i=0;i<diagNodes.length;i++){
        for(var j=0; j< diagNodes[i].cantSetop.length; j++){
            if(diagNodes[i].cantSetop[j] == undefined){
                console.log(diagNodes[i]);
            }else if(diagNodes[i].cantSetop[j].clicked){
                red = 1;
            }else if(diagNodes[i].clicked){
                
                diagNodes[i].cantSetop[j].clickable(false);
                diagNodes[i].cantSetop[j].color(diagNodes[i].cantSetop[j].clicked,diagNodes[i].cantSetop[j].classID,blockedColor);
            }
        }
        if(diagNodes[i].needSet == null){
        }
        else if((red != 1 && !diagNodes[i].needSet.clicked)){
            if(!v1.clicked && !vn.clicked){
                red = 1;
            }
        }
        if(red == 1 || checkHoriz() || diagNodes[i].name == "l10"){
            if(diagNodes[i].clicked){
                cost -= diagNodes[i].price;
            }
            hideSet(api, diagNodes[i].getVision(vision));
           // console.log(diagNodes[i].getVision(vision));
            diagNodes[i].clickCase(false);
            diagNodes[i].clickable(false);
            diagNodes[i].color(diagNodes[i].clicked,diagNodes[i].classID,blockedColor);
        }else{
            diagNodes[i].clickable(true);
            diagNodes[i].color(diagNodes[i].clicked,diagNodes[i].classID);
        }
        red = 0;
    }
}

var checkDiagAG = function(api){
    for(var i=0;i<diagNodes.length;i++){
        
        for(var j=0; j< diagNodes[i].cantSetag.length; j++){
            if(diagNodes[i].cantSetag[j] == undefined){
                console.log(diagNodes[i]);
            }else if(diagNodes[i].cantSetag[j].clicked){
                red = 1;
            }else if(diagNodes[i].clicked){
                diagNodes[i].cantSetag[j].clickable(false);
                diagNodes[i].cantSetag[j].color(diagNodes[i].cantSetag[j].clicked,diagNodes[i].cantSetag[j].classID,blockedColor);
            }
        }
        if(diagNodes[i].needSet == null){
        }
        else if((red != 1 && !diagNodes[i].needSet.clicked)){
            if(!v1.clicked&&!vn.clicked){
                red = 1;
            }
        }
        if(red == 1 || checkHoriz()){
            if(diagNodes[i].clicked){
                cost -= diagNodes[i].price;
            }
            hideSet(api, diagNodes[i].getVision(vision));
           // console.log(diagNodes[i].getVision(vision));
            diagNodes[i].clickCase(false);
            diagNodes[i].clickable(false);
            diagNodes[i].color(diagNodes[i].clicked,diagNodes[i].classID,blockedColor);
        }else{
            diagNodes[i].clickable(true);
            diagNodes[i].color(diagNodes[i].clicked,diagNodes[i].classID);
        }
        red = 0;
        
    }
}

var checkVertsAG = function(api){
    for(var i=0; i<vertNodes.length;i++){
        for(var j=0;j<diagNodes.length;j++){
            for(var k=0;k<diagNodes[j].cantSetag.length;k++){
                if(diagNodes[j].clicked){
                    if(diagNodes[j].cantSetag[k] == vertNodes[i]){
                        red = 1;
                    }
                }
            }
        }
        if(red != 1){
            vertNodes[i].clickable(true);
            vertNodes[i].color(vertNodes[i].clicked,vertNodes[i].classID);
        }
        red = 0;
    }
}

var check808 = function(api){
    if(vision == "op"){
        if(v3.clicked && !h6.clicked && !h5.clicked){
            //.clickable(true);
            //s1.color(s1.clicked,s1.classID);
        }else{
            //s1.clickable(false);
            //s1.clickCase(false);
            //s1.color(s1.clicked,s1.classID,clickableColor);
            //hideSet(api,s1.getVision(vision));
        }
    }else{
        if(v3.clicked && !h5.clicked){
            //s1.clickable(true);
           // s1.color(s1.clicked,s1.classID);
        }else{
            //s1.clickable(false);
            //s1.clickCase(false);
            //s1.color(s1.clicked,s1.classID,clickableColor);
            hideSet(api,s1.getVision(vision));
        }
    }   

    if(s1.clicked){
        if(vision == "op"){
            h5.clickable(false);
            h5.color(h5.clicked,h5.classID,clickableColor);
            h6.clickable(false);
            h6.color(h6.clicked,h6.classID,clickableColor);
        }else{
            h5.clickable(false);
            h5.color(h5.clicked,h5.classID,clickableColor);
        }
    }else{
        if(vision == "op"){
            h5.clickable(true);
            h5.color(h5.clicked,h5.classID);
            h6.clickable(true);
            h6.color(h6.clicked,h6.classID);
        }else{
            h5.clickable(true);
            h5.color(h5.clicked,h5.classID);
        }
    }
}

var toggleClass = function(classHead,toggledClass,document){
    $(document).ready(function(){
        $(classHead).click(function(){
            $(".horizontals").hide();
            $(".verticals").hide();
            $(".diagonals").hide();
            $(".eyeguards").hide();
            $(".diagonals2").hide();
            $(".specialty").hide();
            $(".visions").hide();
            $(".visors").hide();
            $(".browbars").hide();
            $(toggledClass).show();
            changeColor("#horiz", clickableColor);
            changeColor("#vert", clickableColor);
            changeColor("#diag", clickableColor)
            changeColor("#eye", clickableColor);
            changeColor("#diag2", clickableColor);
            changeColor("#spe", clickableColor);
            changeColor("#vision", clickableColor)
            changeColor("#brow", clickableColor)
            changeColor("#visor", clickableColor)
            changeColor(classHead, clickedColor);
            checkError(classHead, document);
        });
    });
}

var changeColor = function(classID, color){
    $(classID).css("color", color);
}

var beginToggle = function(classHead, document){
    $(document).ready(function(){
        $(classHead).click(function(){
            $("#eye").show();
            $("#brow").show();
            $("#spe").show();
            $("#visor").show();
            $("#diag").show();
            $("#diag2").show();
            $("#horiz").show();
            $("#vert").show();
            $("#placeholder").hide();
        });
    });
}

var buttonEvents = function(api){
    hideSet(api, nodes);
    showSet(api, [370]);
    visionToggle(api,'open',openStart,openNodes);
    visionToggle(api,'agg',aggressiveStart,aggNodes);
    barToggle(api, 'v1', v1);
    barToggle(api, 'v2', v2);
    barToggle(api, 'v3', v3);
    barToggle(api, 'v4', v4);
    barToggle(api, 'v5', v5);
    barToggle(api, 'h3', h3);
    barToggle(api, 'h4', h4);
    barToggle(api, 'h5', h5);
    barToggle(api, 'h6', h6);
    barToggle(api, 'h7', h7);
    barToggle(api, 'd1', d1);
    barToggle(api, 'd2', d2);
    barToggle(api, 'd3', d3);
    barToggle(api, 'd4', d4);
    barToggle(api, 'd5', d5);
    barToggle(api, 'd6', d6);
    barToggle(api, 'd7', d7);
    barToggle(api, 'l1', l1);
    barToggle(api, 'l2', l2);
    barToggle(api, 'l3', l3);
    barToggle(api, 'l4', l4);
    barToggle(api, 'l5', l5);
    barToggle(api, 'l6', l6);
    barToggle(api, 'l7', l7);
    barToggle(api, 'l8', l8);
    barToggle(api, 'l9', l9);
    barToggle(api, 'l10', l10);
    visorToggle(api, 's1', s1);
    visorToggle(api, 's2', s2);
    visorToggle(api, 's3', s3);
    //barToggle(api, 's4', s4);
    beckToggle(api, 'beck', beck);
    toggle808(api, '808', h808);
    barToggle(api, 'e1', e1);
    barToggle(api, 'e2', e2);
    barToggle(api, 'e3', e3);
    barToggle(api, 'e4', e4);
    barToggle(api, 'b1', b1);
    barToggle(api, 'b2', b2);
    barToggle(api, 'b3', b3);
    barToggle(api, 'bull', bull);
    barToggle(api, 'u', u);
    barToggle(api, 'vn', vn);
}

var success = function(api) {
    api.start(function() {
        api.addEventListener('viewerready', function() {
            buttonEvents(api);
            api.getNodeMap(function(err, nodes) {
                if (err) {
                    console.log('Error Loading Nodes');
                    return;
                }
                console.log(nodes);
            })
            api.getSceneGraph(function(err, result) {
                if (err) {
                    console.log('Error getting nodes');
                    return;
                }
                // get the id from that log
                console.log(result);
            });
        });
    }); 
};

client.init( uid, {
    camera: false,
	internal: false,
	ui_infos: false,
	ui_controls: false,
	ui_stop: false,
    watermark: false,
    success: success,
    error: function onError() {
        console.log('Viewer Error');
    }
});

$(document).ready(function(){
    changeColor("#error", clickableColor);
    $(".horizontals").hide();
    $(".verticals").hide();
    $(".diagonals").hide();
    $(".diagonals2").hide();
    $(".eyeguards").hide();
    $(".specialty").hide();
    $(".costClass").hide();
    $(".paypal").hide();
    $("#bar").hide();
    $("#sumbit").hide();
    $("#colorInput").hide();
    $("#colorText").hide();
    $("#maskID").hide();
    $("#eye").hide();
    $("#brow").hide();
    $("#spe").hide();
    $("#visor").hide();
    $("#diag").hide();
    $("#diag2").hide();
    $("#horiz").hide();
    $("#vert").hide();


    toggleClass("#horiz", ".horizontals", document);
    toggleClass("#vert", ".verticals", document);
    toggleClass("#diag", ".diagonals", document);
    toggleClass("#diag2", ".diagonals2", document);
    toggleClass("#eye", ".eyeguards", document);
    toggleClass("#spe", ".specialty", document);
    toggleClass("#vision", ".visions", document);
    toggleClass("#visor", ".visors", document);
    toggleClass("#brow", ".browbars", document);
    beginToggle("#open", document);
    beginToggle("#agg", document);
});

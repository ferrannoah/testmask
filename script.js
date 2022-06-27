var iframe = document.getElementById('model-frame');

var version = '1.7.1';

var uid = 'c899d32cd2c64ca996b0e4154635a850';

var client = new Sketchfab( version, iframe);
var nodes = [ 172,  187,  199,  211, 223, 235,  247,  259, 271,  283,  295,  307,  319, 331,  343,  355,  367,  379,  391,  403,  415,  427,  439,  451,  463,  475,  487,  499, 511, 523, 535, 547, 559, 571, 583, 595, 607, 619, 631, 643, 655, 667, 679, 691, 703, 715, 727];

var nodes = [172,189,200,221,238,255,270,279,282,294,306,312,318,338,344,350,370,382,394,406,418,430,442,454,466,478,490,502,514,526,538,550,562,574,586,598,610,622,634,646,658,670,682,694,706,718,730,742,754,766,778,790,802,814,826,838,850,862,874,886,898,910,922,934,946,958,970,982,994,1006,1018,1030,1042,1054,1066,1078,1090,1102,1114,1126,1138,1150,1162,1174]
var allNodes = []
var helmet_nodes = [5, 16, 27, 38, 49, 60, 71, 82, 93, 104, 115]

//		Open Vision == 0		: 		Aggressive Vision == 1			//
var OPEN = 0
var AGGRESSIVE = 1

var clickedColor = "gray"; // gray
var clickableColor = "black"; // maroon
var blockedColor = "red"; // black
var costHTML = document.getElementById("cost"); 
var cost;
var color;
var maskID;
var shipping_cost = -1;


var vision = OPEN

class bar{
	constructor(op, ag, name, price, necSet, blockedOP, blockedAG, togNodes ){
		this.name = name;
		this.classID = "#" + name
		//  Blocked Nodes are Nodes that cannot be selected if this Node is active  //
		this.blockedNodes = [[],[]]
		if(blockedOP)
			this.blockedNodes[0] = blockedOP
		if(blockedAG)
			this.blockedNodes[1] = blockedAG
		//  Necessary Nodes are ones that need to be active for this Node to be selectable  //
		this.necNodes = [[],[]]
		if (necSet)
			this.necNodes = [necSet, necSet]
	
		// Toggle Nodes these are the nodes that will toggle off when this node is active and vise versa
		this.togNodes = [[],[]]

		this.key = [op,ag]
		this.price = price
		
		this.addBlockedNodes = function addBlockedNodes(nodeSet){
			for(var i = 0; i < nodeSet[0].length; i++){
				this.blockedNodes[0].push(nodeSet[0][i])
				if(!nodeSet[0][i].blockedNodes[0].includes(this)){
					nodeSet[0][i].blockedNodes[0].push(this)
				}
			}
			for(var i = 0; i < nodeSet[1].length; i++){
				this.blockedNodes[1].push(nodeSet[1][i])
				if(!nodeSet[1][i].blockedNodes[1].includes(this)){
					nodeSet[1][i].blockedNodes[1].push(this)
				}
			}
		}
		this.addNecNodes = function addNecNodes(nodeSet){
			for(var i = 0; i < nodeSet[0].length; i++){
				this.necNodes[0].push(nodeSet[0][i])
			}
			for(var i = 0; i < nodeSet[1].length; i++){
				this.necNodes[1].push(nodeSet[1][i])
			}
		}
		this.addTogNodes = function addTogNodes(nodeSet){
			for(var i = 0; i < nodeSet[0].length; i++){
				this.togNodes[0].push(nodeSet[1][i])
			}
			for(var i = 0; i < nodeSet[0].length; i++){
				if(nodeSet[0][i].togNodes[0] != this.togNodes[0])
					nodeSet[0][i].togNodes[0] = this.togNodes[0]
			}

			for(var i = 0; i < nodeSet[1].length; i++){
				this.togNodes[1].push(nodeSet[1][i])
			}
			for(var i = 0; i < nodeSet[1].length; i++){
				if(nodeSet[1][i].togNodes[1] != this.togNodes[1])
					nodeSet[1][i].togNodes[1] = this.togNodes[1]
			}
		}
		allNodes.push(this)
	}
}

// var a = new node('a')
// var b = new node('b')
// var c = new node('c')
// var d = new node('d')

// var e = new node('e')
// var f = new node('f')
// var g = new node('g')

// a.addBlockedNodes([[b, c],[]])
// b.addBlockedNodes([[a],[]])
// c.addBlockedNodes([[d],[]])
// d.addBlockedNodes([[],[]])
// d.addNecNodes([[a],[]])
// e.addTogNodes([[e,f,g],[]])

var v1 = new bar([382], [394], "v1", 12);
var v2 = new bar([826], [766], "v2", 22);
var v3 = new bar([742], [730], "v3", 22);
var v3 = new bar([838], [778], "v3", 22);
var v4 = new bar([850], [790], "v4", 22);
var v5 = new bar([862], [802], "v5", 22);
var h3 = new bar([874], [874], "h3", 27);
var h4 = new bar([886], [634], "h4", 27);
var h5 = new bar([622], [622], "h5", 27);
var h6 = new bar([610], [610], "h6", 27);
var h7 = new bar([598], [598], "h7", 27);

var l1 = new bar([970], [586], "l1", 22, [h6], [], []); //\\562 574
var l2 = new bar([982], [574], "l2", 22, [h5], [], []);
var l3 = new bar([994], [562], "l3", 22, [h4], [], []);
var l4 = new bar([1006], [550], "l4", 22, [h3], [], []);
var l5 = new bar([1018], [538], "l5", 22, null, [], []);
var l6 = new bar([1030], [526], "l6", 22, null, [], []);
var l7 = new bar([1042], [514], "l7", 22, null, [], []);
var l8 = new bar([1054], [502], "l8", 22, null, [], []);
var l9 = new bar([1066], [490], "l9", 22, null, [], []);
var l10 = new bar([874], [478], "l10", 22, null, [], []);

var d1 = new bar([1078], [718], "d1", 22, [h4], [l4], [v2,l4,l5,l6]);
var d2 = new bar([1090], [706], "d2", 22, [h5], [v2,l3,l4,l5], [v2,v3,l3,l4,l5,l6,l7]); // \\//
var d3 = new bar([1102], [694], "d3", 22, [h6], [v2,v3,l2,l3,l4,l5,l6], [v2,v3,v4,l2,l3,l4,l5,l6,l7,l8]);
var d4 = new bar([1114], [682], "d4", 22, [h7], [v2,v3,v4,l1,l2,l3,l4,l5,l6,l7], [v2,v3,v4,v5,l2,l3,l4,l5,l6,l7,l8,l9]);
var d5 = new bar([1126], [670], "d5", 22, null, [v2,v3,v4,v5,l1,l2,l3,l4,l5,l6,l7,l8], [v2,v3,v4,v5,l1,l2,l3,l4,l5,l6,l7,l8,l9,l10]);
var d6 = new bar([1138], [658], "d6", 22, null, [v4,v5,l2,l3,l4,l5,l6,l7,l8,l9], [v4,v5,l2,l3,l4,l5,l6,l7,l8,l9]);
var d7 = new bar([1150], [646], "d7", 22, null, [l4,l5,l6], [l5,l6]);

var s1 = new bar([221],[221], "s1", 0, null,[],[]);
var s2 = new bar([172],[172], "s2", 0, null,[],[]);
var s3 = new bar([238],[238], "s3", 0, null,[],[]);

var e1 = new bar([922],[922], "e1",10); // EG HD

var e2 = new bar([934],[922], "e2",35); // HAWK HD
var e3 = new bar([454],[754], "e3",10); // OPEN
var e4 = new bar([466],[922], "e4",35); // BECK

var b1 = new bar([1162],[1162], "b1",0,null,[],[]); // 2B
var b2 = new bar([910],[910], "b2",0,null,[],[]); // 2BD
var b3 = new bar([946],[946], "b3",0,null,[],[]); // HD

e1.addBlockedNodes([[b1, b2, b3], [b1, b2, b3]])
e2.addBlockedNodes([[b3], [b3]])
e3.addBlockedNodes([[b3], [b3]])
e4.addBlockedNodes([[b3], [b3]])
e2.addNecNodes([[[b1, b2]], [[b1, b2]]])
e3.addNecNodes([[[b1, b2]], [[b1, b2]]])
e4.addNecNodes([[[b1, b2]], [[b1, b2]]])

// var shoc = new bar([189,200],[189,200], "shoc", 0,[],[],[]);

var beck = new bar([370],[1174], "beck", 135)
// var beck808 = new bar([418], 0, "beck808", 0);
// var h8082 = new bar([442],[430],"8082", 0);
var bull = new bar([958],[898], "bull", 35, null, [l3,v3,v4], [l4,l5,v3,v4]); // Open Bull
bull.addBlockedNodes([[l3, v3, v4], [l4, l5, v3, v4]])
var h808 = new bar([430], [430],"808",30, [[d4, bull, v3]], [h6], [h6]);
var u = new bar([814],[814], "u", 0, [b2], [b1,b3], [b1,b3]); // U
var vn = new bar([406], [406], "vn", 22, null, [], []);

// var agF = new bar([338,344,350],[1174], "agF", 0, [], [], []);
// var opF = new bar([306,312,318],[370], "opF", 0, [], [], []);

b1.addTogNodes([[b1, b2, b3], [b1, b2, b3]])
s1.addTogNodes([[s1,s2,s3],[s1,s2,s3]])
v1.addTogNodes([[v1, vn], [v1, vn]])
e1.addTogNodes([[e1, e2, e3, e4], [e1, e2, e3, e4]])
b1.addBlockedNodes([[u],[u]])
b3.addBlockedNodes([[u],[u]])

l1.addBlockedNodes([[v2,d4],[v2,d4,d5]])
l2.addBlockedNodes([[v2,v3,d3,d4,d5,d6],[v2,v3,d3,d4,d5,d6]])
l3.addBlockedNodes([[v2,v3,v4,d2,d3,d4,d5,d6],[v2,v3,v4,d2,d3,d4,d5,d6]])
l4.addBlockedNodes([[v2,v3,v4,v5,d1,d2,d3,d4,d5,d6,d7],[v2,v3,v4,v5,d1,d2,d3,d4,d5,d6]])
l5.addBlockedNodes([[v3,v4,v5,d2,d3,d4,d5,d6,d7],[v2,v3,v4,v5,d1,d2,d3,d4,d5,d6,d7]])
l6.addBlockedNodes([[v4,v5,d3,d4,d5,d6,d7],[v3,v4,v5,d1,d2,d3,d4,d5,d6,d7]])
l7.addBlockedNodes([[v5,d4,d5,d6],[v4,v5,d2,d3,d4,d5,d6]])
l8.addBlockedNodes([[d5,d6],[v5,d3,d4,d5,d6]])
l9.addBlockedNodes([[d6],[d4,d5,d6]])
l10.addBlockedNodes([[d5],[d5]])

var activeNodes = []
var blockedNodes = []
var permBlockedNodes = []

var refresh = function refresh(api){
	var aNodes = [] // PlaceHolder Active Nodes
	blockedNodes = [] // Resetting Blocked Nodes

	//		Checking to See if nodes have their Necessary Nodes Activated Else Removing Them & Adding to BlockedNodes  //
	for(var i=0; i < activeNodes.length; i++){
		if(necSelected(activeNodes[i]))
			aNodes.push(activeNodes[i])
		else
			blockedNodes.push(activeNodes[i])
	}
	activeNodes = aNodes

	//		Refreshing Current Blocked Nodes Based on Active Nodes 		//
	for(var i=0; i < activeNodes.length; i++){
		for(var j=0; j < activeNodes[i].blockedNodes[vision].length; j++){
			if (!blockedNodes.includes(activeNodes[i].blockedNodes[vision][j]))
				blockedNodes.push(activeNodes[i].blockedNodes[vision][j])
		}
	}

	// 		Checking if necNodes are in Blocked Nodes if so adding to BlockNodes  	 //

	for(var i=0; i < allNodes.length; i++){
		if((!blockedNodes.includes(allNodes[i]) && !necSelected(allNodes[i]) || cantSelected(allNodes[i]))){
			blockedNodes.push(allNodes[i])
		}
	}

	//		Hiding all Blocked Nodes  		//
	for(var i=0; i < blockedNodes.length; i++){
		hideSet(api, blockedNodes[i].key[vision])
	}

	for(var i = 0; i < permBlockedNodes.length; i++){
		blockedNodes.push(permBlockedNodes[i])
	}

	for(var i=0; i < allNodes.length; i++){
		if(activeNodes.includes(allNodes[i])){
			$(allNodes[i].classID).css("color", clickedColor);
		}else if(blockedNodes.includes(allNodes[i])){
			$(allNodes[i].classID).css("color", blockedColor);
		}else{
			$(allNodes[i].classID).css("color", clickableColor);
		}
	}

	cost = 120
	maskID = []
	for(var i=0; i< activeNodes.length; i++){
		cost += activeNodes[i].price
		if(activeNodes[i].key[vision].length == 1)
			maskID.push(activeNodes[i].key[vision][0])
	}

	costHTML.innerHTML = "TOTAL: $" + cost;


}

//		Checks to See if any Blocked Nodes are selected if so Current Node is unselectable		//
var cantSelected = function cantSelected(node){
	for (var i=0; i < node.blockedNodes[vision].length; i++){
		if (activeNodes.includes(node.blockedNodes[vision][i])){
			return true
		}
	}
	return false
}


//		Checks Too See if Nec Nodes are blocked              //
var necSelected = function necSelected(node){
	for (var i=0; i < node.necNodes[vision].length; i++){
		if (node.necNodes[vision][i].length > 1){
			// Checks for two nodes where either would be fine ex node bar and v1
			check = false
			for (var j = 0; j < node.necNodes[vision][i].length; j++){
				if (activeNodes.includes(node.necNodes[vision][i][j]))
					check = true
			}
			if (!check)
				return false
		}
		else if (!activeNodes.includes(node.necNodes[vision][i])){
			return false
		}
	}
	return true
}

//		Checks All togNodes and deactivates them when a togNode is Activated		//
var togSelected = function togSelected(api, node){
	// an = []
	// for (var i=0; i < activeNodes.length; i++){
	// 	if (!node.togNodes[vision].includes(activeNodes[i]) && activeNodes[i] != node){
	// 		an.push(activeNodes[i])
	// 	}else{
	// 		hideSet(api, activeNodes[i].key[vision])
	// 	}
	// }
	
	// activeNodes = an

	// IF NODE IS TOGGLE NODE REMOVE TOGGLE NODES FROM ACTIVE NODES AND HIDE THEM DO NOT BLOCK 
	if (node.togNodes[vision].length > 0){ 
		console.log(node.name + ": undergoing toggle check")
		for (var i = 0; i < node.togNodes[vision].length; i++){
			if (activeNodes.includes(node.togNodes[vision][i])){
				console.log(node.name + ": found toggle node -" + node.togNodes[vision][i].name + "- was active")
				activeNodes = activeNodes.filter(item => item !== node.togNodes[vision][i])
				hideSet(api, node.togNodes[vision][i].key[vision])
			}
		}
	}

}

// ***********	Main Function *********** //
var toggleNode = function toggleNode(api, classID, node){
	document.getElementById(classID).addEventListener('click',function(){
		beckN = [[306, 312, 318], [338, 344, 350]]
		//		If node is not blocked and all necessary accompanying nodes are selected as well as no blocking nodes are selected toggle Node  //
		if(!blockedNodes.includes(node) && !cantSelected(node) && necSelected(node)){
			//		If node is not already Activated =>   Toggle accompanying Nodes if needed and push current nodes to active nodes array		//
			if(!activeNodes.includes(node)){
				togSelected(api, node)
				showSet(api, node.key[vision])
				activeNodes.push(node)
				// Changing Basic Bar to Beck Bar
				if(node.name == 'beck'){
					hideSet(api, beckN[vision])
					if(activeNodes.includes(h808)){
						hideSet(api, h808.key[vision]);
						h808.key[vision] = [418]
						showSet(api, h808.key[vision])
					}
					h808.key[vision] = [418]
				}
			}
			//		Else remove node from active nodes  	//
			else{
				hideSet(api, node.key[vision])
				activeNodes = activeNodes.filter(item => item !== node)
				// Reshowing Basic Bars
				if(node.name == 'beck'){
					showSet(api, beckN[vision])
					if(activeNodes.includes(h808)){
						hideSet(api, h808.key[vision]);
						h808.key[vision] = [430]
						showSet(api, h808.key[vision])
					}
					h808.key[vision] = [430]
				}
			}
		}
		//		Run Refresh function to update the blocked nodes array		//
		refresh(api)
		console.log(activeNodes)
		console.log(blockedNodes)
	});
}

//		TOGGLES THE VISION FROM OPEN TO AGGRESSIVE AND VISE VERSA TAKES IN A 0 OR A 1 FOR OP/AG respectively 	//
var toggleVision = function toggleVision(api, classID, v){
	document.getElementById(classID).addEventListener('click',function(){
		hideSet(api, nodes)
		vision = v
		h808.key[vision] = [430]
		if(vision == OPEN){
			activeNodes = [h3]
			showSet(api, [306, 312, 318])
			permBlockedNodes = [h3, l10]
			changeColor("#open", clickedColor);
            changeColor("#agg", clickableColor);
			// 80
		}else if(vision == AGGRESSIVE){
			activeNodes = []
			showSet(api, [338, 344, 350])
			permBlockedNodes = [h808, e1, e2, e4]
			changeColor("#agg", clickedColor);
            changeColor("#open", clickableColor);
		}
		
		refresh(api)
		console.log(activeNodes)
		console.log(blockedNodes)
	});
}

var hideSet = function(api, nodeSet){
    for(var i=0;i<nodeSet.length;i++){
        api.hide(nodeSet[i]);
    }
}

var showSet = function(api, nodeSet){
    for(var i=0;i<nodeSet.length;i++){
        api.show(nodeSet[i]);
    }
}




var buttonEvents = function(api){
    hideSet(api, nodes);
	for(var i = 0; i < allNodes.length; i++){
		// try {
			toggleNode(api, allNodes[i].name, allNodes[i]);
		//   } catch (error) {
		// 	console.error(allNodes[i].name);
		//   }
		  
		
	}
	toggleVision(api, 'open', OPEN);
	toggleVision(api, 'agg', AGGRESSIVE);
	helmet(api)
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
        });
    });
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
		paypal.Buttons({ 
			createOrder: function(data, actions) {
				return actions.order.create({
					purchase_units: [{
						amount: {
							value: cost
						},
						description: "Color: "+color+" | MaskID: " + maskID +" | Verify Mask ferrannoah.github.io"
					}]
				});
			},
			// Finalize the transaction
			onApprove: function(data, actions) {
				screenShot(api);
				return actions.order.capture().then(function(details) {
					// Show a success message to the buyer
					alert('Transaction completed by ' + details.payer.address.country_code + '!' + details.purchase_units[0].shipping.address.admin_area_1  ); 
					$(".paypal").hide();

				});
			}
		}).render('#paypal-button-container');
    }); 
};

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

var submit = function(document){
	document.getElementById("submit").addEventListener('click', function(){
		$("#options").hide()
		$("#select").hide()
		$("#checkout").show()
		$("#co").show()
		$("#submit").hide()
	});
}

var helmet = function(api){
	document.getElementById("helmet_0").addEventListener('click', function(){
		$("#helmet_0").hide()
		$("#helmet_1").show()
		hideSet(api, helmet_nodes)
	})
	document.getElementById("helmet_1").addEventListener('click', function(){
		$("#helmet_1").hide()
		$("#helmet_0").show()
		showSet(api, helmet_nodes )
	})
}
var back = function(document){
	document.getElementById("back").addEventListener('click', function(){
		$("#options").show()
		$("#select").show()
		$("#checkout").hide()
		$("#submit").show()
		$("#co").hide()
	});
}


var checkout = function(document){
	document.getElementById("co").addEventListener('click', function(){

		var e = document.getElementById("color");
		color = e.options[e.selectedIndex].text;

		var ele = document.getElementsByName('shipping');
		for(i = 0; i < ele.length; i++) {
			if(ele[i].checked){
				shipping_cost =  parseInt(ele[i].value);
			}
		}

		if(color == "Select Color" || shipping_cost == -1){
			alert("Color or Shipping Option was not selected")
		}else{
			$("#options").hide()
			$("#select").hide()
			$("#checkout").hide()
			$("#helmet_0").hide()
			$("#helmet_1").hide()
			$("#submit").hide()
			$("#submit2").hide()
			$("#co").hide()
			$(".menu").hide()	
			$("#paypal").show()
			$("#cost").hide()
			$("#cost2").show()
			$(".paypal").show()
			cost = cost + shipping_cost
			document.getElementById("cost2").innerHTML = "Final Total: $" + cost
		}

	});
}

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
	$("#helmet_1").hide();
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
	$("#co").hide()
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
	submit(document);
	back(document);
	checkout(document);
});

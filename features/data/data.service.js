dataModule.factory("data.service", ['utility', function (g) {

	var class1 = {
		left:' padding-left',
		right:'absolute white-back border rounded10 ',
		up:'absolute white-back border rounded10 padding-up'
	}

	var class2 = {
		left:'',
		right:'fa fa-5x fa-chevron-right',
		up:'fa fa-5x '
	}

	var iconSize = "font-70";

	var pages = [
	{
		id:"home",
		title:"Home",
		index:g.c.homeIndex,
		motion:false,
		game:false,
		page:{
			view:"home.html",
			back:"blue2-back",
			fore:"white-back",
			rect:{
				top:0,
				left:"25%"
			},
			border:{
				color:"black",
				width:1,
				radius:0
			}
		}
	},
	{
		id:"calibrate",
		title:"Calibrate",
		index:g.c.calibrateIndex,
		motion:false,
		game:false,
		page:{
			view:"page.html",
			back:"pink-back",
			fore:"white-back",
			menu:"pink-back",
			button:"transparent",
			backButton:{
				loc:{top:"10px", right:"10px"},
				padding:'padding-right',
				icon:"right",
				directive:g.c.back
			},
			rect:{
				top:0,
				left:0
			},
			border:{
				color:"black",
				width:1,
				radius:0
			}	
		},
		obj:{
			shape:g.c.circle,
			size:50,
			color:"black"
		},
		params:{
			interval:2,
			filterSize:3,
			factor:1,
			mu:0.1,
			damp:0.4,
			gravity:true,
			bounce:false
		}
	},
	{
		id:"gravity",
		title:"Gravity", 
		index:g.c.gravIndex,
		motion:true,
		game:false,
		page:{
			view:"page.html",
			back:"green2-back",
			fore:"white-back",
			menu:"green2-back",
			button:"transparent",
			backButton:{
				loc:{top:"10px", left:"10px"},
				icon:"left",
				directive:g.c.back
			},
			rect:{
				top:0,
				left:"50%"
			},
			border:{
				color:"black",
				width:1,
				radius:0
			}	
		},
		obj:{
			shape:g.c.circle,
			size:200,
			color:"black"
		},
		params:{
			interval:2,
			filterSize:3,
			factor:0.8,
			mu:0.1,
			damp:0.4,
			gravity:true,
			bounce:true
		}
	},
	{
		id:"float",
		title:"Float", 
		index:g.c.floatIndex,
		motion:true,
		game:false,
		page:{
			view:"page.html",
			back:"brown-back",
			fore:"white-back",
			menu:"brown-back",
			button:"transparent",
			backButton:{
				loc:{top:"10px", left:"10px"},
				icon:"left",
				directive:g.c.back
			},
			rect:{
				top:0,
				left:"75%"
			},
			border:{
				color:"black",
				width:1,
				radius:0
			}	
		},
		obj:{
			shape:g.c.circle,
			size:200,
			color:"black"
		},
		params:{
			interval:5,
			filterSize:3,
			factor:0.6,
			mu:0.1,
			damp:0.4,
			gravity:false,
			bounce:true
		}
	},
	{
		id:"enemies",
		title:"Enemies", 
		index:g.c.enemiesIndex,
		motion:true,
		game:true,
		page:{
			view:"page.html",
			back:"blue2-back",
			fore:"white-back",
			menu:"blue2-back",
			button:"transparent",
			backButton:{
				loc:{top:"10px", right:"10px"},
				icon:"up",
				directive:g.c.back
			},
			rect:{
				top:"50%",
				left:0
			},
			border:{
				color:"black",
				width:1,
				radius:0
			}	
		},
		obj:{
			shape:g.c.circle,
			size:200,
			color:"black"
		},
		params:{
			interval:5,
			filterSize:3,
			factor:0.6,
			mu:0.1,
			damp:0.4,
			gravity:true,
			bounce:true
		}
	},
	{
		id:"balance",
		title:"Balance", 
		index:g.c.balanceIndex,
		motion:true,
		game:true,
		page:{
			view:"page.html",
			back:"pink-back",
			fore:"white-back",
			menu:"pink-back",
			button:"transparent",
			backButton:{
				loc:{top:"10px", left:"10px"},
				icon:"up",
				directive:g.c.back
			},
			rect:{
				top:"50%",
				left:"25%"
			},
			border:{
				color:"black",
				width:1,
				radius:0
			}	
		},
		obj:{
			shape:g.c.circle,
			size:200,
			color:"black"
		},
		params:{
			interval:5,
			filterSize:3,
			factor:0.6,
			mu:0.08,
			damp:0.4,
			gravity:true,
			bounce:true
		}
	},
	{
		id:"space",
		title:"Space",
		index:g.c.spaceIndex,
		motion:true,
		game:false,
		page:{
			view:"page.html",
			back:"white-back",
			fore:"black-back",
			menu:"brown-back",
			button:"white-back",
			backButton:{
				loc:{top:"10px", left:"10px"},
				icon:'up',
				directive:g.c.back
			},
			rect:{
				top:"50%",
				left:"50%"
			},
			border:{
				color:"green-back",
				width:3,
				radius:20
			}	
		},
		obj:{
			shape:g.c.cross,
			size:300,
			color:"transparent",
			color2:"red"
		},
		params:{
			interval:1,
			filterSize:5,
			factor:0.4,
			mu:0.105,
			damp:0.4,
			gravity:true,
			bounce:false
		}

	}
	];

	var makeOptions = function () {

		var options = [];
		var j = 0;

		for (i in pages) {

			if (i != 0) {
				options[j++] = {
					id:pages[i].id,
					title:pages[i].title,
					index:pages[i].index,
					menu:pages[i].page.menu,
					rect:pages[i].page.rect,
					directive:g.c.option
				};
			}

		};

		pages[0].pages = options;
		
	}

	makeOptions();

	var getPageById = function (name) {

		for (i in pages) {

			if (pages[i].id == name) {

				return pages[i];
			}
		}

		return {};
	}

	var isPage = function (id) {

		console.log("is page", id);

		for (i in pages) {

			//console.log("page", pages[i], " ", id);

			if (pages[i].id == id) {

				return true;
			}
		}

		console.log("no page");

		return false;
	}

	var EnemyType = [
	{
		name:"breaker"
		description:"this will ruin you",
		shape:g.c.circle,
		size:90,
		color:"red",
		speed:1,
		reward:-5000,
		punish:0,
		percentage:0.02
	},
	{
		name:"maker",
		description:"gold mine",
		shape:g.c.circle,
		size:90,
		color:"gold",
		speed:1,
		reward:4000,
		punish:0,
		percentage:0.01
	},
	{
		name:"common"
		description:"everyday passerby",
		shape:g.c.circle,
		size:75,
		color:"blue",
		speed:0.6,
		reward:125,
		punish:-23,
		percentage:0.8
	},
	{
		name:"featured",
		description:"less you see, better it is when you do",
		shape:g.c.circle,
		size:100,
		color:"green",
		speed:0.4,
		reward:843,
		punish:-327,
		percentage:0.17
	}
	];

	EnemyType.sort(function (a,b) {

		return a.percentage > b.percentage;
	});

	EnemyType.forEach(function(value, index, array) {

		if (index == 0) {
			value.normal = value.percentage;
		}
		else {
			value.normal = value.percentage + array[index-1].normal;
		}

		//console.log("percentage: " + value.percentage + " range: " + value.normal);
	});



	return {
		bodyDir:g.c.body,
		pages:pages,
		enemydata:EnemyType,
		getPageById:getPageById,
		isPage:isPage
	}
}]);
managerModule.factory("data.service", ['utility', function (g) {

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
			interval:2,
			filterSize:5,
			factor:2,
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
			interval:2,
			filterSize:2,
			factor:0.9,
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
			interval:2,
			filterSize:2,
			factor:0.4,
			mu:0.01,
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
			interval:2,
			filterSize:3,
			factor:0.4,
			mu:0.15,
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

	var EnemyType = [
		{
			shape:g.c.circle,
			size:50,
			color:"blue",
			pieceColor:{red:255, green:255, blue:255},
			reward:1025,
			punish:-75
		},
		{
			shape:g.c.circle,
			size:75,
			color:"green",
			pieceColor:{red:255, green:255, blue:255},
			reward:565,
			punish:-132
		}
	];



	return {
		bodyDir:g.c.body,
		pages:pages,
		enemydata:EnemyType,
		getPageById:getPageById
	}
}]);
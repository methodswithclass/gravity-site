nuplaeModule.factory("params", function (global) {

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

	var games = [
	{
		name:"Calibrate",
		index:global.c.calibrateIndex,
		page:{
			view:"setup.html",
			back:"pink-back",
			fore:"white-back",
			menu:"pink-back",
			button:"transparent",
			backButton:{
				loc:{top:"10px", right:"10px"},
				padding:'padding-right',
				icon:'fa-chevron-right'
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
			shape:global.c.circle,
			size:50,
			color:"black"
		},
		params:{
			interval:1/300,
			filterSize:3,
			factor:1,
			mu:0.1,
			damp:0.4,
			gravity:true,
			bounce:false
		}
	},
	{
		name:"Gravity", 
		index:global.c.gravIndex,
		page:{
			view:"setup.html",
			back:"green2-back",
			fore:"white-back",
			menu:"green2-back",
			button:"transparent",
			backButton:{
				loc:function () {
					return {top:"10px", left:"10px"}
				},
				padding:'padding-left',
				icon:'fa-chevron-left'
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
			shape:global.c.circle,
			size:50,
			color:"black"
		},
		params:{
			interval:1/300,
			filterSize:3,
			factor:1,
			mu:0.1,
			damp:0.4,
			gravity:true,
			bounce:true
		}
	},
	{
		name:"Float", 
		index:global.c.floatIndex,
		page:{
			view:"setup.html",
			back:"brown-back",
			fore:"white-back",
			menu:"brown-back",
			button:"transparent",
			backButton:{
				loc:function () {
					return {top:"10px", left:"10px"}
				},
				padding:'padding-left',
				icon:'fa-chevron-left'
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
			shape:global.c.circle,
			size:50,
			color:"black"
		},
		params:{
			interval:1/300,
			filterSize:3,
			factor:3,
			mu:0.06,
			damp:0.4,
			gravity:false,
			bounce:true
		}
	},
	{
		name:"Enemies", 
		index:global.c.enemiesIndex,
		page:{
			view:"game.html",
			back:"blue2-back",
			fore:"white-back",
			menu:"blue2-back",
			button:"transparent",
			backButton:{
				loc:function () {
					return {top:"10px", right:"10px"}
				},
				padding:'padding-right',
				icon:'fa-chevron-up'
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
			shape:global.c.circle,
			size:50,
			color:"black"
		},
		params:{
			interval:1/300,
			filterSize:3,
			factor:1,
			mu:0.1,
			damp:0.4,
			gravity:true,
			bounce:true
		}
	},
	{
		name:"Balance", 
		index:global.c.balanceIndex,
		page:{
			view:"game.html",
			back:"pink-back",
			fore:"white-back",
			menu:"pink-back",
			button:"transparent",
			backButton:{
				loc:function () {
					return {top:"10px", left:"10px"}
				},
				padding:'padding-left',
				icon:'fa-chevron-up'
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
			shape:global.c.circle,
			size:50,
			color:"black"
		},
		params:{
			interval:1/300,
			filterSize:2,
			factor:2,
			mu:0.1,
			damp:0.4,
			gravity:true,
			bounce:true
		}
	},
	{
		name:"Space",
		index:global.c.spaceIndex,
		page:{
			view:"game.html",
			back:"white-back",
			fore:"black-back",
			menu:"brown-back",
			button:"white-back",
			backButton:{
				loc:function () {
					return {top:"10px", left:"10px"}
				},
				padding:'padding-left',
				icon:'fa-chevron-up'
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
			shape:global.c.cross,
			size:100,
			color:"red"
		},
		params:{
			interval:1/300,
			filterSize:3,
			factor:1,
			mu:0.1,
			damp:0.4,
			gravity:true
		}

	}
	];

	var home = {
		name:"Home",
		index:global.c.homeIndex,
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
		
	}

	var homeData = [];

	for (i in games) {

		homeData[i] = {
			name:games[i].name,
			index:games[i].index,
			menu:games[i].page.menu,
			rect:games[i].page.rect
		};

	};

	home.pages = homeData;

	games.unshift(home);

	return {
		pages:games
	}
});
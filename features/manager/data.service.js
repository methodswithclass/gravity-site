managerModule.factory("data.service", ['global', function (g) {

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

	var games = [
	{
		name:"Calibrate",
		index:g.c.calibrateIndex,
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
		index:g.c.gravIndex,
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
			interval:1/600,
			filterSize:3,
			factor:0.5,
			mu:0.1,
			damp:0.4,
			gravity:true,
			bounce:true
		}
	},
	{
		name:"Float", 
		index:g.c.floatIndex,
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
			interval:1/300,
			filterSize:3,
			factor:1.5,
			mu:0.06,
			damp:0.4,
			gravity:false,
			bounce:true
		}
	},
	{
		name:"Enemies", 
		index:g.c.enemiesIndex,
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
		name:"Balance", 
		index:g.c.balanceIndex,
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
			interval:1/300,
			filterSize:2,
			factor:1.3,
			mu:0.1,
			damp:0.4,
			gravity:true,
			bounce:true
		}
	},
	{
		name:"Space",
		index:g.c.spaceIndex,
		game:true,
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
			interval:1/300,
			filterSize:3,
			factor:0.7,
			mu:0.1,
			damp:0.4,
			gravity:true,
			bounce:false
		}

	}
	];

	var getPageByName = function (name) {

		for (i in games) {

			if (games[i].name == name) {

				return games[i];
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
			reward:10,
			punish:-5
		},
		{
			shape:g.c.square,
			size:75,
			color:"orange",
			pieceColor:{red:255, green:255, blue:255},
			reward:20,
			punish:-10
		}
	];



	return {
		bodyDir:g.c.body,
		pages:games,
		enemydata:EnemyType,
		getPageByName:getPageByName
	}
}]);
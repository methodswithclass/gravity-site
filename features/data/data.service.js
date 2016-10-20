dataModule.factory("data.service", ['utility', function (util) {

	var g = mcshared.utility;

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
		title:"home",
		index:util.c.homeIndex,
		type:{
			option:false,
			motion:false,
			accel:false,
			stages:false,
			game:false
		},
		page:{
			view:"home.html",
			back:"black-back",
			fore:"white-back",
			rect:{
				top:"25%",
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
		id:"validity",
		title:"validity",
		index:util.c.validIndex,
		type:{
			option:false,
			motion:false,
			accel:false,
			stages:false,
			game:false
		},
		page:{
			view:"validity.html",
			back:"black-back",
			fore:"black-back",
			rect:{
				top:0,
				left:0
			},
			border:{
				color:"black",
				width:1,
				radius:0
			}
		}
	},
	{
		id:"settings",
		title:"settings",
		index:util.c.settingsIndex,
		type:{
			option:false,
			motion:false,
			accel:false,
			stages:true,
			game:false
		},
		page:{
			view:"settings.html",
			back:"black-back",
			fore:"white-back",
			menu:{
				title:"settings",
				color:"color1-back"
			},
			backButton:{
				loc:{top:"10px", left:"10px"},
				padding:'padding-top',
				icon:"down",
				directive:util.c.back
			},
			rect:{
				top:0,
				left:"25%"
			},
			border:{
				color:"black",
				width:1,
				radius:0
			}	
		},
		obj:{
			shape:util.c.circle,
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
		id:"calibrate",
		title:"calibrate",
		index:util.c.calibrateIndex,
		type:{
			option:true,
			motion:false,
			accel:true,
			stages:true,
			game:false
		},
		page:{
			view:"calibrate.html",
			back:"color1-back",
			fore:"white-back",
			menu:{
				title:"re-calibrate",
				color:"color1-back"
			},
			backButton:{
				loc:{top:"10px", right:"10px"},
				padding:'padding-right',
				icon:"right",
				directive:util.c.back
			},
			rect:{
				top:"25%",
				left:0
			},
			border:{
				color:"black",
				width:1,
				radius:0
			}	
		},
		obj:{
			shape:util.c.circle,
			size:30,
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
		title:"gravity", 
		index:util.c.gravIndex,
		type:{
			option:true,
			motion:true,
			accel:true,
			stages:false,
			game:false
		},
		page:{
			view:"motion.html",
			back:"color2-back",
			fore:"white-back",
			menu:{
				title:"gravity",
				color:"color2-back"
			},
			backButton:{
				loc:{top:"10px", left:"10px"},
				icon:"left",
				directive:util.c.back
			},
			rect:{
				top:"25%",
				left:"50%"
			},
			border:{
				color:"black",
				width:1,
				radius:0
			}	
		},
		obj:{
			shape:util.c.circle,
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
		id:"slide",
		title:"slide", 
		index:util.c.floatIndex,
		type:{
			option:true,
			motion:true,
			accel:true,
			stages:false,
			game:false
		},
		page:{
			view:"motion.html",
			back:"color3-back",
			fore:"white-back",
			menu:{
				title:"slide",
				color:"color3-back"
			},
			backButton:{
				loc:{top:"10px", left:"10px"},
				icon:"left",
				directive:util.c.back
			},
			rect:{
				top:"25%",
				left:"75%"
			},
			border:{
				color:"black",
				width:1,
				radius:0
			}	
		},
		obj:{
			shape:util.c.circle,
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
		id:"enemy",
		title:"enemy", 
		index:util.c.enemiesIndex,
		type:{
			option:true,
			motion:true,
			accel:true,
			stages:true,
			game:true
		},
		page:{
			view:"game.html",
			back:"color4-back",
			fore:"white-back",
			menu:{
				title:"enemy",
				color:"color4-back"
			},
			backButton:{
				loc:{top:"10px", right:"10px"},
				icon:"up",
				directive:util.c.back
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
			shape:util.c.circle,
			size:200,
			color:"black"
		},
		params:{
			interval:8,
			filterSize:3,
			factor:0.2,
			mu:0.1,
			damp:0.4,
			gravity:true,
			bounce:true
		}
	},
	{
		id:"balance",
		title:"balance", 
		index:util.c.balanceIndex,
		type:{
			option:true,
			motion:true,
			accel:true,
			stages:true,
			game:true
		},
		page:{
			view:"game.html",
			back:"color5-back",
			fore:"white-back",
			menu:{
				title:"balance",
				color:"color5-back"
			},
			backButton:{
				loc:{top:"10px", left:"10px"},
				icon:"up",
				directive:util.c.back
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
			shape:util.c.circle,
			size:200,
			color:"black"
		},
		params:{
			interval:8,
			filterSize:3,
			factor:0.2,
			mu:0.08,
			damp:0.4,
			gravity:true,
			bounce:true
		}
	},
	{
		id:"space",
		title:"space",
		index:util.c.spaceIndex,
		type:{
			option:true,
			motion:true,
			accel:true,
			stages:true,
			game:true
		},
		page:{
			view:"game.html",
			back:"color6-back",
			fore:"black-back",
			menu:{
				title:"space",
				color:"color6-back"
			},
			button:"white-back",
			backButton:{
				loc:{top:"10px", left:"10px"},
				icon:'up',
				directive:util.c.back
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
			shape:util.c.cross,
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

			if (pages[i].type.option) {
				options[j++] = {
					id:pages[i].id,
					title:pages[i].title,
					index:pages[i].index,
					menu:pages[i].page.menu,
					rect:pages[i].page.rect,
					directive:util.c.option
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

		console.log("check if", id, "is page");

		for (i in pages) {

			//console.log("page", pages[i], " ", id);

			if (pages[i].id == id) {
				console.log(id, "is a page");
				return true;
			}
		}

		console.log(id, "is not a page");

		return false;
	}

	var EnemyType = [
	{
		meta:{
			name:"breaker",
			description:"this will ruin you"
		},
		shape:util.c.circle,
		size:90,
		color:"red",
		speed:0.3,
		hit:-0.8,
		miss:0.1,
		percentage:0.04,
		destroy:{
			color:"red",
			speed:0.5
		}
	},
	{
		meta:{
			name:"maker",
			description:"gold mine"
		},
		shape:util.c.circle,
		size:90,
		color:"yellow",
		speed:0.05,
		hit:0.2,
		miss:0,
		percentage:0.04,
		destroy:{
			color:"yellow",
			speed:0.5
		}
	},
	{
		meta:{
			name:"common",
			description:"everyday passerby"
		},
		shape:util.c.circle,
		size:75,
		color:"blue",
		speed:0.1,
		hit:83,
		miss:-32,
		percentage:0.72,
		destroy:"standard"
	},
	{
		meta:{
			name:"featured",
			description:"doesn't come out to play much"
		},
		shape:util.c.circle,
		size:100,
		color:"green",
		speed:0.3,
		hit:103,
		miss:-64,
		percentage:0.2,
		destroy:"standard"
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

		if (Math.abs(value.hit) < 1) {
			value.meta.hit = (value.hit < 0 ? "-" : "+") + Math.abs(value.hit)*100 + "%";
		}
		else {
			value.meta.hit = (value.hit < 0 ? "-" : "+") + Math.abs(g.round(value.hit, Math.abs(value.hit) > 20 ? 10 : 5)) + "pts";
		}

		if (Math.abs(value.miss) < 1) {
			value.meta.miss = (value.miss < 0 ? "-" : "+") + Math.abs(value.miss)*100 + "%";
		}
		else {
			value.meta.miss = (value.miss < 0 ? "-" : "+") + Math.abs(g.round(value.miss, Math.abs(value.miss) > 20 ? 10 : 5)) + "pts";
		}


		//console.log("percentage: " + value.percentage + " normal: " + value.normal);
	});



	return {
		bodyDir:util.c.body,
		pages:pages,
		enemydata:EnemyType,
		getPageById:getPageById,
		isPage:isPage
	}
}]);
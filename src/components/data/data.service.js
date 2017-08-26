dataModule.factory("data.service", ['utility.service', 'cookie.service', function (util, cookie) {

    var g = mcshared.utility;

    var stats = false;

	var pages = [
	{
		id:"home",
		title:{
			text:"home",
			class:"black"
		},
		index:util.c.homeIndex,
		type:{
			option:false,
			motion:false,
			accel:false,
			stages:false,
			game:false
		},
		page:{
			view:"home.view.html",
			back:"black-back",
			fore:"white-back",
			rect:{
				top:"25%",
				left:"25%"
			}
		}
	},
	{
		id:"validity",
		title:{
			text:"validity",
			class:"black"
		},
		index:util.c.validIndex,
		type:{
			option:false,
			motion:false,
			accel:false,
			stages:false,
			game:false
		},
		page:{
			view:"validity.view.html",
			back:"black-back",
			fore:"black-back",
			rect:{
				top:0,
				left:0
			}
		}
	},
	{
		id:"settings",
		title:{
			text:"settings",
			class:"black"
		},
		index:util.c.settingsIndex,
		type:{
			option:false,
			motion:false,
			accel:false,
			stages:true,
			game:false
		},
		settings:{
			items:[
				{
					id:"session-factor",
					title:"sensitivity",
					view:"setting.session-factor.view.html"
				},
				{
					id:"axes",
					title:"switch axes",
					view:"setting.axes.view.html"
				},
				{
					id:"obj-color",
					title:"object color",
                    view: "setting.obj-color.view.html",
                    getMarble: function (id) {
                        return this.marbles.find(function (p) {
                            return p.id == id;
                        })
                    },
                    marbles: [
                        {
                            id: "default",
                            shape: util.c.circle,
                            size:200,
                            color:"black",
                            selected:false
                        },
                        {
                            id: "marble1",
                            shape: util.c.image,
                            size: 200,
                            src: "../../assets/img/marbles/marble1.png",
                            selected:false
                        },
                        {
                            id: "marble2",
                            shape: util.c.image,
                            size: 200,
                            src: "../../assets/img/marbles/marble2.png",
                            selected: false
                        },
                        {
                            id: "marble3",
                            shape: util.c.image,
                            size: 200,
                            src: "../../assets/img/marbles/marble3.png",
                            selected: false
                        },
                        {
                            id: "marble4",
                            shape: util.c.image,
                            size: 200,
                            src: "../../assets/img/marbles/marble4.png",
                            selected: false
                        },
                        {
                            id: "marble5",
                            shape: util.c.image,
                            size: 200,
                            src: "../../assets/img/marbles/marble5.png",
                            selected: false
                        },
                        {
                            id: "marble6",
                            shape: util.c.image,
                            size: 200,
                            src: "../../assets/img/marbles/marble6.png",
                            selected: false
                        },
                        {
                            id: "marble7",
                            shape: util.c.image,
                            size: 200,
                            src: "../../assets/img/marbles/marble7.png",
                            selected: false
                        },
                        {
                            id: "marble8",
                            shape: util.c.image,
                            size: 200,
                            src: "../../assets/img/marbles/marble8.png",
                            selected: false
                        },
                        {
                            id: "marble9",
                            shape: util.c.image,
                            size: 200,
                            src: "../../assets/img/marbles/marble9.png",
                            selected: false
                        },
                        {
                            id: "marble10",
                            shape: util.c.image,
                            size: 200,
                            src: "../../assets/img/marbles/marble10.png",
                            selected: false
                        },
                        {
                            id: "marble11",
                            shape: util.c.image,
                            size: 200,
                            src: "../../assets/img/marbles/marble11.png",
                            selected: false
                        },
                        {
                            id: "marble12",
                            shape: util.c.image,
                            size: 200,
                            src: "../../assets/img/marbles/marble12.png",
                            selected: false
                        },
                        {
                            id: "marble13",
                            shape: util.c.image,
                            size: 200,
                            src: "../../assets/img/marbles/marble13.png",
                            selected: false
                        }
                    ]
				}
			]
		},
		page:{
			view:"settings/settings.view.html",
			back:"black-back",
			fore:"white-back",
			backButton:{
				loc:{top:"10px", left:"10px"},
				icon:"down"
			},
			rect:{
				top:0,
				left:"25%"
			}
		}
	},
	{
		id:"calibrate",
		title:{
			text:"calibrate",
			class:"black"
		},
		index:util.c.calibrateIndex,
		type:{
			option:true,
			motion:false,
			accel:true,
			stages:true,
			game:false
		},
		page:{
			view:"calibrate.view.html",
			back:"color1-back",
			fore:"white-back",
			menu:{
				title:"re-calibrate",
				color:"color1-back"
			},
			backButton:{
				loc:{top:"10px", right:"10px"},
				icon:"right"
			},
			rect:{
				top:"25%",
				left:0
			}
		},
		obj:{
			shape:util.c.circle,
			size:50,
			color:"transparent"
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
		id:"demo",
		title:{
			text:"demo",
			class:"black"
		},
		index:util.c.gravIndex,
		type:{
			option:true,
			motion:true,
			accel:true,
			stages:false,
			game:false
		},
		page:{
			view:"motion.view.html",
			back:"color2-back",
			fore:"white-back",
			menu:{
				title:"demo",
				color:"color2-back"
			},
			backButton:{
				loc:{top:"10px", left:"10px"},
				icon:"left"
			},
			rect:{
				top:"25%",
				left:"50%"
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
			factor:0.4,
			mu:0.1,
			damp:0.4,
			gravity:true,
			bounce:true
		}
	},
	{
		id:"slide",
		title:{
			text:"slide",
			class:"black"
		},
		index:util.c.floatIndex,
		type:{
			option:true,
			motion:true,
			accel:true,
			stages:false,
			game:false
		},
		page:{
			view:"motion.view.html",
			back:"color3-back",
			fore:"white-back",
			menu:{
				title:"slide",
				color:"color3-back"
			},
			backButton:{
				loc:{top:"10px", left:"10px"},
				icon:"left"
			},
			rect:{
				top:"25%",
				left:"75%"
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
			factor:0.3,
			mu:0.1,
			damp:0.4,
			gravity:false,
			bounce:true
		}
	},
	{
		id:"enemy",
		title:{
			text:"enemy",
			class:"black"
		},
		index:util.c.enemiesIndex,
		type:{
			option:true,
			motion:true,
			accel:true,
			stages:true,
			game:true
		},
		page:{
			view:"game.view.html",
			back:"color4-back",
			fore:"white-back",
			menu:{
				title:"enemy",
				color:"color4-back"
			},
			backButton:{
				loc:{top:"10px", right:"10px"},
				icon:"up"
			},
			rect:{
				top:"50%",
				left:0
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
		title:{
			text:"balance",
			class:"black"
		},
		index:util.c.balanceIndex,
		type:{
			option:true,
			motion:true,
			accel:true,
			stages:true,
			game:true
		},
		page:{
			view:"game.view.html",
			back:"color5-back",
			fore:"white-back",
			menu:{
				title:"balance",
				color:"color5-back"
			},
			backButton:{
				loc:{top:"10px", left:"10px"},
				icon:"up"
			},
			rect:{
				top:"50%",
				left:"25%"
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
			factor:0.1,
			mu:0.08,
			damp:0.4,
			gravity:true,
			bounce:true
		}
	},
	{
		id:"space",
		title:{
			text:"space",
			class:"white"
		},
		index:util.c.spaceIndex,
		type:{
			option:true,
			motion:true,
			accel:true,
			stages:true,
			game:true
		},
		page:{
			view:"game.view.html",
			back:"color6-back",
			fore:"black-back",
			menu:{
				title:"space",
				color:"color6-back"
			},
			backButton:{
				loc:{top:"10px", left:"10px"},
				icon:'up'
			},
			rect:{
				top:"50%",
				left:"50%"
			}
		},
		obj:{
			shape:util.c.cross,
			size:300,
			color:"red"
		},
		params:{
			interval:1,
			filterSize:5,
			factor:0.2,
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
					rect:pages[i].page.rect
				};
			}

		};

		pages[0].pages = options;
		
	}

	makeOptions();

	var getPageById = function (name) {


		return pages.find(function (p) {
			return p.id === name;
		})

    }

    var getSetting = function (id) {

        var settings = pages.find(function (p) {

            return p.id == "settings"
        });

        //console.log("settings", settings);

        return settings.settings.items.find(function (p) {

            return p.id == id;
        });
    }

    var getMarble = function (id) {

        console.log("get marble", id);

        if (id) {
            return getSetting("obj-color").marbles.find(function (p) {

                return p.id == id;
            });
        }
        else {
            return null;
        }
    }

    var selectCookieMarble = function () {

        var marble = getMarble(cookie.getCookie(util.c.objKey) || "default");

        marble.selected = true;
    }

    selectCookieMarble();

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
		size:30,
		color:"red",
		speed:0.03,
		hit:-0.4,
		miss:0.05,
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
		size:200,
		color:"yellow",
		speed:0.08,
		hit:0.2,
		miss:-0.1,
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
		size:50,
		color:"blue",
		speed:0.1,
		hit:83,
		miss:-22,
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
		speed:0.5,
		hit:103,
		miss:-254,
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
		pages:pages,
		enemydata:EnemyType,
        getPageById: getPageById,
        getSetting:getSetting,
        isPage: isPage,
        stats: stats,
        getMarble: getMarble
	}
}]);
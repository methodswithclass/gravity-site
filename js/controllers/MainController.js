app.controller('MainController', ['$scope', '$document', 'global', 'con', function ($scope, $document, global, con) {

	var self = this;

	self.projects = [
	{
		id:'nuplae',
		title:'nuplae',
		icon:'/img/box_icon.png',
		back:'/img/javascript_wallpaper.png',
		description:"<div class='paragraph line'><div class='tabp'>You are trapped in a box and all you can do is bounce off the walls.</div><div class='tabp'>You can't move yourself, but you can move the box. To get around, move the box left and right to bounce off the left and right walls. Sometimes you can tilt the box in the direction you want to go, but not always. If you can't, move the whole box.    </div>  <div class='tabp'>  The environment in the box can present many challenges, and games. Take your hand at each, and have fun!    </div>    </div><div class='paragraph line'>    <div class='tabp'>    Up until now, web pages were internal worlds to the devices they were viewed on. This JavaScript web app breaks the boundaries between the real world of the device and the web environment.    </div>  <div class='tabp'>    It utilizes the accelerometer in a unique and original manner to give the position of an object on the screen based on where the device moves in space.    </div>  <div class='tabp'>    There's a lot of math, but after processing, objects can be moved on the screen related to how the phone interacts with the real world.    </div>    </div><div class='paragraph'>    <div class='tabp'>    Some devices come equipped with accelerometers. This gives the rate of change of the device's velocity at a high rate of sampling.     </div>   <div class='tabp'>    Numerically integrating this value at each sample time gives the velocity of the device. And integrating again gives the position of the phone.  </div>  <div class='tabp'>    Reversing the direction of motion of the phone and applying it to an object on the screen gives the sensation that the ball is stable in space as the device moves around it.    </div>    </div>",
		maxSep:500
	},
	{
		id:'call',
		title:'call log',
		icon:'/img/calllog.png',
		back:'/img/android_wallpaper.png',
		description:"<div class='paragraph line'>  <div class='tabp'> When a call is completed, the Call Log app automatically checks whether it was made to a number of interest. If it was, it immediately offers an opportunity to log the call summary. If the caller is unable to log the call at that time, it can be saved for later. </div>  <div class='tabp'> A history of pending and logged calls is saved in the app. </div>  </div>",
		maxSep:150
	},
	{
		id:'gather',
		title:'gather up',
		icon:'/img/contacts.png',
		back:'/img/apple_wallpaper.png',
		description:"<div class='paragraph line'><div class='tabp'>Gather Up lets you sort your contacts into organized groups that fit your life or the painfully honest groups that we all put our friends in anyway, whichever you prefer.</div><div class='tabp'>You can either enter contacts manually or port them from your device's address book.</div></div><div class='paragraph line'>    <div class='tabp'>    The app is custom built so that data management and user interface are well under control.    </div>  <div class='tabp'>    There are a set of classes that handle only the data of the app, including Group, Person, Number, Email, etc. In addition, a delgate class oversees all the major group operations. </div>  <div class='tabp'>    These are independent of the UI classes which can be switched out for other UIViewControllers to provide a variety of user interfaces. </div>    </div><div class='paragraph'><div class='tabp'>    We developed a custom built formatting class that formats phone numbers while editing. The formatter allows for mid-number digit additions and deletions.    </div>  <div class='tabp'>    Why is this so important? Well, if the number were formatted with a regular expression only, with no other processing, then if a digit were added to or removed from the middle, the cursor position would be lost upon reformat.  </div>   <div class='tabp'>    However, this implementation takes this into account, so that mid-number editing and reformatting is possible and smooth. </div></div>",
		maxSep:500
	}];

	self.contact = {
		image:'/img/bio_photo2.png',
		bio:"<div class='paragraph line'><div class='tabp'> Methods with Class, located outside Washington, DC, is my on-going project to bring some of the things I do to a wider audience.   </div>  <div class='tabp'>  I have 5 years experience doing a smattering of mobile and web development. Over that time I have narrowed down on JavaScript. Early in my career, I spent a considerable amount of time doing native development without any serious framework dependencies. I deliberately did not rely on those tools but rather hand-coded solutions to the problems I faced while building apps. </div><div class='tabp'> These days I use Angular as an application framework and am open to using matured libraries if they are well documented. The time I spent in the native world learning how to develop my own filtering, navigation, parallax, and UI interaction modules has been invaluable. </div>  </div>  <div class='paragraph'>  <div class='tabp'> Send an email to <a class='blue' href='mailto:chris@methodswithclass.com'> chris@methodswithclass.com </a> with any questions or ideas.</div> </div>"
	};

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	})

}]);
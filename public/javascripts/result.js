var userIdToSearch = "walmart"; //ID of the user who's profile we're searching
var users = [];
var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
    username: "d2e5af13-2ac6-4860-8066-ad1f77d2b252",
    password: "EbHk45QRU0xv",
    version: 'v3',
    version_date: '2016-05-19 '
});


console.log('beginning');



function offense(offense)
	{
		this.offenses = [];
		this.counter = 0;

		this.addOffense = function(offense) {
			offenses.push(offense); 
			counter++;
		}
	}
function person(name,id,offense)
	{
		this.name = name;
		this.id = id;
		this.offense = new offense();

		this.getName = function() {
			return name;
		}

		this.addOffense = function(text) {
			this.offense.addOffense(text);
		}

		this.getOffensesCounter = function() {
			return this.offense.counter;
		}

		this.getOffenses = function() {
			return offenses;
		}
	}

function searchUsers(id){
	var found = false;
	users.forEach(checkId);

	for (user in users) {
		if(user.getName() === id) {
			found = true;
		}
	}

	return found;
}

logInWithFacebook = function() { //
	FB.login(function(response) {
		if (response.authResponse) {
			console.log('You are logged in & cookie set!');
			var accessToken = response.authResponse.accessToken;
			// Now you can redirect the user or do an AJAX request to
			// a PHP script that grabs the signed request from the cookie
			function testAPI() {
				console.log('Welcome!  Fetching your information.... ');

				FB.api(
					'/' + userIdToSearch,
					'GET',
					{"fields":"posts{comments{created_time,from,message}}"},
					function(response) {
						//console.log(response);
						posts = response['posts']['data'];

						var thisComment, authorId, authorName, commentBody;

						for (i = 0; i < posts.length; i++) { //I'M USING INCONSISTENT LOOPS BECAUSE THEY'RE DUMB

							for (k = 0; k < posts[i]['comments']['data'].length; k++) {

								//ask watson about individual comments
								comment = posts[i]['comments']['data'][k];
								authorId = comment['from']['id'];
								authorName = comment['from']['name'];

								commentBody = comment['message'];

								_self.open("peer-mlh.com/watson/search?text=" + encodeURIComponent(commentBody));

								tone_analyzer.tone({ text: commentBody },
        						function (err, tone) {
            					if (err)
                					console.log(err);
            					else
                					res.send(JSON.stringify(tone, null, 2));
        						});	
							}
						}						  		
				  }
				);
			}

			testAPI();


		} else {
			alert('Login failed.');
			console.log("FAILED");
		}
	});
	return false;
};


window.fbAsyncInit = function() {
	FB.init({
		appId: '165008204006667',
		cookie: true, // This is important, it's not enabled by default
		version: 'v2.8'
	});

};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

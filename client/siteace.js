Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_EMAIL"
});

	/////
	// template helpers
	/////

	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({},{sort:{vote:-1}});
		}
	});


	/////
	// template events
	/////

	Template.website_item.events({
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			if (Meteor.user()){
				var website_id = this._id;
				this.vote++;
				console.log("Up voting website with id "+website_id);
				console.log("Up voting +1 "+this.vote);
				Websites.update({ _id : website_id } ,{$inc: { vote:1 } });
				// put the code in here to add a vote to a website!
			}
			return false;// prevent the button from reloading the page
		},
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			if( Meteor.user() ){

				var website_id = this._id;
				this.vote--;
				Websites.update({ _id : website_id } ,{$inc: { vote:-1 } });
				console.log("Down voting website with id "+website_id);
				console.log("Up voting -1 "+this.vote);
				// put the code in here to remove a vote from a website!
			}

			return false;// prevent the button from reloading the page
		}
	})

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		},
		"submit .js-save-website-form":function(event){

			// here is an example of how to get the url out of the form:
			var title = event.target.title.value;
			var url = event.target.url.value;
			var description = event.target.description.value;

			if( Meteor.user() && (url !== "" && description !=="") ){
				console.log("The url they entered is: "+url);
				Websites.insert({
				  title: title,
				  url: url,
				  description: description,
				  vote: 0,
				  createdOn:new Date()
			  	});
				//  put your website saving code in here!
				$("#website_form").toggle('hide');
				event.target.title.value = "";
				event.target.url.value = "";
				event.target.description.value = "";
			}
			return false;// stop the form submit from reloading the page

		}
	});

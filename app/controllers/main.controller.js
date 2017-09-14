module.exports = {
	//show the home page
	showHome: function (req,res)  {
		//res.send('hello home')
//		 res.render(path.join(__dirname, 'home'));
 var topicHead = 'Home Page';

		res.render('pages/home',{topicHead:'Home Page'});

	}
};

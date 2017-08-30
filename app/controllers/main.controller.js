module.exports = {
	//show the home page
	showHome: (req,res) =>  {
		//res.send('hello home')
//		 res.render(path.join(__dirname, 'home'));
 var topicHead = 'Home Page';

		res.render('pages/home',{topicHead});
		
	} 
};

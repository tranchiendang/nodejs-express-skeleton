var Auth = 
{
	is_login: function (req, res, next)
	{
		if (!req.session.is_login){
			return res.redirect('/login');
		}
		next();
	},
	
	isLoggedIn: function (req, res, next){
		if (req.user){
			return next();
		}
		res.redirect('/login');
	}
};
module.exports = Auth;
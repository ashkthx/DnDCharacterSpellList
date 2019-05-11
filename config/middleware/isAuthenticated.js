// Restrict routes for user who isn't logged in
module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request
  if (req.user) {
    return next();
  }

  // If the user isn't logged in, redirect them to the login page
  return res.redirect("/");
};

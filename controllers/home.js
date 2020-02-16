const Jobsites = require('../models/jobsites');

const jobsiteObj = new Jobsites();

exports.homePage = (req, res, next) => {
  res.render('home', {
    pageTitle: 'Job Search',
    searchUrl: jobsiteObj.jobObjArray[0].siteName
  });
};
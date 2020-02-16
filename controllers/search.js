const Jobquery = require('../models/jobquery');
const Jobsites = require('../models/jobsites');
const request = require('request');
const apiSrv = require('../api/api-service');
const checkapierror = require('../util/checkapierror');

const createJob = new Jobquery();
const jobsiteObj = new Jobsites();
const api = new apiSrv();
const chkerr = new checkapierror();

exports.postSearch = (req, res, next) => {
  console.log('jobObjArray => ', jobsiteObj.jobObjArray);
  const firstUrl = jobsiteObj.jobObjArray[0];
  const paramUrl = firstUrl.siteName;
  console.log('postSearch : jobtitle => ', req.body.jobtitle);
  if (createJob.status !== 'wrong' && createJob.text !== '') {
    const apiConfig = api.checkApiUrl(firstUrl);
    const url = apiConfig.API_ENDPOINT_URL + '?' + apiConfig.API_QUERYTITLE + '=' + req.body.jobtitle;
    console.log('url => ', url);
    request.get(url, (err, response, body) => {
        if (err) {
            // return next(err);
            res.render('search', {
              pageTitle: 'Job Search Results',
              userValue: req.body.jobtitle,
              jobSites: jobsiteObj.jobObjArray,
              data: '',
              paramData: paramUrl,
              errorbody: err
            });
        } else {
          if (JSON.parse(body).length > 0) {
            res.render('search', {
              pageTitle: 'Job Search Results',
              userValue: req.body.jobtitle,
              jobSites: jobsiteObj.jobObjArray,
              data: JSON.parse(body),
              paramData: paramUrl,
              errorbody: ''
            });
          } else {
            res.render('search', {
              pageTitle: 'Job Search Results',
              userValue: req.body.jobtitle,
              jobSites: jobsiteObj.jobObjArray,
              data: JSON.parse(body),
              paramData: paramUrl,
              errorbody: 'Sorry!! You have given wrong search detail. Please enter correct seach title.'
            });
          }
        }
    });


  } else {
    res.redirect('/');
  }
};

exports.postSearchOption = (req, res, next) => {
  if (createJob.status !== 'wrong' && createJob.text !== '') {
    const paramUrl = req.query.url;
    const apiConfig = api.checkApiUrl(paramUrl);
    const jobTitle = req.query.jobtitle;
    const url = apiConfig.API_ENDPOINT_URL + '?' + apiConfig.API_QUERYTITLE + '=' + jobTitle;
    console.log('url => ', url);
    console.log('postSearchOption: jobtitle => ', req.body.jobtitle);
    request.get(url, (err, response, body) => {
        if (err) {
            // return next(err);
            console.log('err => ', err);
          res.render('search', {
            pageTitle: 'Job Search Results',
            userValue: req.body.jobtitle,
            jobSites: jobsiteObj.jobObjArray,
            data: '',
            paramData: paramUrl,
            errorbody: err
          });
        } else {
          const ln = chkerr.checkApiError(response.body);
          if (ln > 0) {
            res.render('search', {
              pageTitle: 'Job Search Results',
              userValue: req.body.jobtitle,
              jobSites: jobsiteObj.jobObjArray,
              data: '',
              paramData: paramUrl,
              errorbody: 'Search API is not working properly'
            });
          } else {
            res.render('search', {
              pageTitle: 'Job Search Results',
              userValue: req.body.jobtitle,
              jobSites: jobsiteObj.jobObjArray,
              data: JSON.parse(body),
              paramData: paramUrl,
              errorbody: ''
            });
          }
        }
    });


  } else {
    res.redirect('/');
  }
};
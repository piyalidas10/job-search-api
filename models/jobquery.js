module.exports = class Jobquery {
    constructor() {
    }

    checkQueryType(txt) {
      const obj = {
        text: '',
        status: ''
      }
      if (txt !== '') {
        obj.text = txt;
        obj.status = 'correct';
      } else {
        obj.text = 'Please enter correct details to search job';
        obj.status = 'wrong';
      }
      return obj;
    }
};
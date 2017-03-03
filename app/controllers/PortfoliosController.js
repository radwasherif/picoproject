var Student = require('../models/Student');

let PortfoliosController = {
    renderPortfoliosPage: function (req, res) {
        var singedIn = false;
        if (req.session.user)
            singedIn = true;
        Student.find(function (err, studentsDB) {
            if (err) {
                console.log(err);
            } else {
                var totalStudents = studentsDB.length,
                    pageSize = 10,
                    pageCount = Math.floor(totalStudents / pageSize),
                    currentPage = 1,
                    studentsArrays = [], //all students split into groups of 10
                    studentsList = []; //the current student list to be displayed
                if (totalStudents % pageSize != 0)
                    pageCount++;
                if (typeof req.query.page !== 'undefined') {
                    currentPage = +req.query.page;
                    // console.log("BETENGAN")
                }
                // console.log(currentPage);
                studentsList = studentsDB.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + (pageSize));
                // console.log(studentsList);
                res.render('portfolios', {
                    students: studentsList,
                    pageSize: pageSize,
                    totalStudents: totalStudents,
                    pageCount: pageCount,
                    currentPage: currentPage,
                    signedInUser: singedIn
                });

            }
        });
    },
    searchPortfolios: function (req, res) {
        var data = req.body.search;
        console.log(data);  
        var singedIn = false;
        if (req.session.user)
            singedIn = true;
        Student.find({ 'name': new RegExp(data, 'i')}, function (err, studentsDB) {
            if (err) {
                console.log(err);
            } else {
                var totalStudents = studentsDB.length,
                    pageSize = 4,
                    pageCount = Math.floor(totalStudents / pageSize),
                    currentPage = 1,
                    studentsArrays = [], //all students split into groups of 10
                    studentsList = []; //the current student list to be displayed
                if (totalStudents % pageSize != 0)
                    pageCount++;
                if (typeof req.query.page !== 'undefined') {
                    currentPage = +req.query.page;
                    // console.log("BETENGAN")
                }
                // console.log(currentPage);
                studentsList = studentsDB.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + (pageSize));
                // console.log(studentsList);
                res.render('portfolios', {
                    students: studentsList,
                    pageSize: pageSize,
                    totalStudents: totalStudents,
                    pageCount: pageCount,
                    currentPage: currentPage,
                    signedInUser: singedIn
                });
            }
        });
    }
};

module.exports = PortfoliosController; 
var mongoose  = require('mongoose'); 

var portfolioSchema = mongoose.Schema({
    name: {
        type: String, 
        require: true
    }, 
    profile_photo: String,
    student_id: Number, 
    projects: Number
});

var Portfolio = mongoose.model("portfolio", portfolioSchema); 

module.exports = Portfolio;  
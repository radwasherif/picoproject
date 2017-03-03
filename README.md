# picoproject
The SE course mini-project.

<h1>Documentation:  </h1>
<b> server.js:</b> The server setup of the project.  
 <b> app/routes.js: </b> Routing module. See comments in code. 

<b> app/models: </b> The main models of the project: <br>
     <li> Student.js: The student and portfolio are one and the same. Thus this model has the username, password, name, portfolio descriptio, and a list of projects. I have made this decision as a simplification. </li> 
       <li>  Project.js: It's not actually a model. It's a mongoose schema, not used except as a type definition in the Student model.  </li>
      
      
<b> app/controllers: </b> 
<li> StudentController: This is considered the main controller of the project. It contains all the main methods: 
      <ul> 
        <li>studentRegister: to register the student. </li>
      <li>studentSignIn: </li>
      <li>renderHomepage: This picks which homepage view to render depending on the current state of the user.  </li>
      <li>createPortfolio: </li>
      <li> signOut: </li>
      <li> addProject </li>
      </ul>
 
 <li>PortfoliosController: Responsible for the View All Portfolios use case. Either displays all portfolios available or searches portfolios depending on keyword entered by user. </li>
 
 <b>view:</b> Contains all the .ejs files of the project: 
 
 index --> The landing page.   
 home --> user's homepage.   
 portfolios --> all portfolios for the guest/user to view    
 create-portfolios --> The form presented to user to create his/her portfolio.    
 register and signin (self-explanatory)    
 
      
      
      
      
      

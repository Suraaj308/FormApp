===================================================================================================
Project Overview :

The following is a Frontend React JS based application. This application has a Login page.
The credentails are hardcoded. Username = admin & Password = password123
Upon starting the application, we land on the Login Page. And other than it, we have a Dashboard Page (localhost:3000/dashboard)
The dashboard page can't be directly accessed, we can only access it via Login.

After entering the Dashboard, the page has few metrics showcasing some values related to the Employees count.
Below it, we have an Employee Table. (Ideally it has 3 hardcoded records)
These hardcoded records can be changed. And more can be added via the +Add Employee (blue button)
Upon Clicking the +Add Employee or Edit Employee, we get a form to fill details correspondingly
In such manner an employee record can be added or altered. And other fileds would be updated based on it.
The Green button is the print button to print the table of list of employees based on filters.

There is a search bar that filters records based on text (Name of employees)
And other fields that filter records based on Gender and Activity Status of Employee. They can be overlapped as well
And finally a Delete Button to delete record in the table. And a Logout Button to sign out of the page.
After Sign out, all the stored Data is deleted. (Since this applciaiton is frontend based we don't store Data)

===================================================================================================
TechStack Used :

1. HTML
2. CSS (Vanilla CSS, No frameworks were used)
3. JS
4. ReactJS Framework for the Application
5. VS Code for Code Editing and Terminal
6. Google Chrome (As the browser)
===================================================================================================
Steps to run the project Locally :

The Project Folder would be FormApp. And inside this, there is the frontend folder.
1. Cd frontend  (in the VS code terminal)
2. npm start (to start the react app)
3. Go to chrome or any modren web-browser and enter localhost:3000 (React runs on default 3000 Port)
===================================================================================================
Design Desicions :

I've used a Logout Button, even tho it wasn't mentioned. Just to ensure the whole project comes full circle.
And I've put 3 hardcoded records to replicate the idea of data loaded table, instead of manual Additons
===================================================================================================
Login Credentials :

username : admin
password : password123
===================================================================================================
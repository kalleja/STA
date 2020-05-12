# Student Trivia App
#This is server side frame shcool project Metropolia UAS. Made with Create-React-App

## Short overview

A trivia app for students where they can register and play quizzes with other students, or add quiz games of thier own for practise to exam.

## API detailed overview
In the back-end graphql is attend to use for login, register, add & delet quizzes. Connection & inneraction from fron to back is done through WebSocket (a persistent connection between a client and server) with JWT authentication. Access is handel by passport and theres a validaitor function that validates and tells are the username and password within the parameter.


For now theres only option to play quizzes which questions and answers are downloaded from OpenTDB, parsed and inserted into database.

```sh
# In ./app folder
$ yarn start
# In ./server folder
$ yarn run server

```
# NOTE!
When you run the app folde by "yarn run app" commande, what user needs to know that in start script the HTTPS protocol is set to be true so that the application can and must be run safley in lochalhost enviroment. When you ahve install app and run it, the first thing that will pop up first time run is error message that your connection is not private:

https://i.stack.imgur.com/RbSRJ.png

In order to run application in you local machine privatly, follow the instruction in this blog uppdate: https://medium.com/@danielgwilson/https-and-create-react-app-3a30ed31c904 at the chapter "Trusting the SSL certificate" so that you can run the app in HTTPS enviroment.

#If user manage to login but cant start quiz, its just balnk then it idicates that there was an error in JWT auhtentication.

## Tools used

**Front-end**

-   React
-   (Redux)
-   Immutable.js

**Back-end**

-   NodeJS
-   Express
-   Gaphql
-   Passport authentication
-   WebSockets with JWT authentication

**Data**

-   OpenTDB (https://opentdb.com)

## TODO

-   [ ] How resolve the vulnerability that VsCode decets in app and suggest user to run npm audit fix.
        But that could lead to several breaking end and MongoDB connection could stop.
-   [ ] Reduce the implement of Redux in front end by using graphql queirs to login, register,
        add & delete own quizzes. Need to figur out how to use graphql queeris in login, regis, add & delet quizzes.
-   [ ] How to figure out function taht only specific user can add quizzes and decide how many time can same user particitape it. 
-   [ ] Add server timer to websocket-
-   [ ] Figur out how the "sing up" mutation checks from validation that user credential are witin absolut parameters.
 

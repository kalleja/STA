# Student Trivia App


## Short overview

A trivia app for students where they can register and play quizzes with other students, or add quiz games of thier own for practise to exam.

## API detailed overview
In the back-end graphql is attend to use for login, register, add & delet quizzes. Connection & inneraction from fron to back is done through WebSocket with JWT authentication. Access is handel by passport and theres a validaitor function that validates and tells are the username and password within the parameter

Fro now theres only option to play quizzes which questions and answers are downloaded from OpenTDB, parsed and inserted into database.

```sh
# In ./app folder
$ yarn run app
# In ./server folder
$ yarn run server

```

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


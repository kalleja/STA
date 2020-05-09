const graphql = require('graphql');
const Quiz = require('../models/quiz');
const Users = require('../models/user');

const validator = require("validator");


const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
            
} = graphql;

const bcrypt = require('bcrypt');
const saltRound = 12;


const AuthService = require('../routes/auth');

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
  id:  {type:  GraphQLID   },
    name: {type: GraphQLString},
    password: {type: GraphQLString },
    points: {type: GraphQLInt},
    total_points:{type: GraphQLInt},
    quizzes: {
      type: new GraphQLList(quizType),
      resolve(parent, args){
          return Quiz.find({ userd: parent.id });
      } 
  }
  }),
});


const quizType = new GraphQLObjectType({
  name: 'Quizzes',
  fields: ( ) => ({
      id: {type: GraphQLID },
      name: { type: GraphQLString },
      questions: {type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(quizType)))},
     answers:{type:new GraphQLList(new GraphQLNonNull(GraphQLString))},
     answer_id:{type: GraphQLID},
     _V:{type:GraphQLInt},               
      users: {
          type: new GraphQLList(userType),
          resolve(parent, args){
              return Users.findById({ userId: parent.id });
          }
      }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

     user: {
            type: userType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Users.findById(args.id);
            }
        },

        quiz: {
          type: quizType,
          args: { id: { type: GraphQLID } },
          resolve(parent, args){
              return Quiz.findById(args.id);
          }
      },
      quizzes: {
          type: new GraphQLList(quizType),
          resolve(parent, args){
              return Quiz.find({});
          }
      },
      users: {
          type: new GraphQLList(userType),
          resolve(parent, args){
              return Users.find({});    
              }
          },

          login: {
            type: userType,
            description: 'Login with username and password to receive token.',
            args: {
              name: {type: new GraphQLNonNull(GraphQLString)},
              password: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve: async (parent, args, {req, res}) => {
              console.log('arks', args);
              req.body = args; // inject args to reqest body for passport
              try {
                const authResponse = await AuthService.login(req, res);
                console.log('ar', authResponse);
              
              }
              catch (err) {
                throw new Error(err);
              }
            },
          },          

  }});




const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      
        addQuiz: {
            type: quizType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                questions: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLInt))) },
                answers:{type: new GraphQLList(new GraphQLNonNull(GraphQLString))},
                answer_id:{type: new GraphQLNonNull(GraphQLID)},
                quizId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let quiz = new Quiz({
                    name: args.name,
                    questions: args.questions,
                    answers: args.answers,
                    answer_id: args.answer_id,
                    quizId: args.quizId
                });
                return quiz.save();
            },   },             
/*const checkAuth = (req, res, rooli) => {
  passport.authenticate('jwt', (err, user) => {
    if (err || !user || req.user.role !== rooli) {
      throw new Error('Not authenticated or user expired');
    }
  })(req, res);
};
checkAuth(req, res, 'admin');*/



        deleteQuiz: {
            type: quizType,
            description: 'Delete quiz from app.',
            args: {
              id: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: async (parent, args, {req, res}) => {
              try {
                authController.checkAuth(req, res);
                // delete quiz
                const stat = await quiz.findById(args.id);
                               console.log('delete result', delResult);
                const result = await quiz.findByIdAndDelete(args.id);
                console.log('delete result', result);
                return result;
              }
              catch (err) {
                throw new Error(err);
              }
            },
          },


          signup: {
            type: userType,
            description: 'Register user.',
            args: {
              name: {type: new GraphQLNonNull(GraphQLString)},
              password: {type: new GraphQLNonNull(GraphQLString)},
              
            },
            resolve: async (parent, args, {req, res}) => {
              try {
                const hash = await bcrypt.hash(args.password, saltRound);
                const userWithHash = {
                  ...args,
                  password: hash,
                };
                const newUsers = new Users(userWithHash);
                const result = await newUsers.save();
                if (result !== null) {
                  // automatic login
                  req.body = args; // inject args to request body for passport
                  const authResponse = await AuthService.login(req, res);
                  console.log('ar', authResponse);
                  
                } else {
                  throw new Error('insert fail');
                }
              }
              catch (err) {
                throw new Error(err);
              }
            },
          },
      


          logout: {
            type: userType,
            resolve(parentValue, args, req) {
              const { user } = req;
              req.logout();
              return user;
            }
          },

        }})
      
    
  

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

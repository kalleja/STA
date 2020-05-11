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
    GraphQLInputObjectType
    
            
} = graphql;


const AuthService = require('../routes/authCheck');

const bcrypt = require('bcrypt');


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
          return Quiz.find( parent.userId );
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
              resolve:async (root,  { name, password }, { Users, userInfo }) => {
                let user = await Users.findOne({ name });
                if (!user) {
                  throw new LoginError();
                }          
                // validate password
                return bcrypt.compare(password, user.password).then(res => {
                  if (res) {
                    // create jwt
                    user = tokenize(user);
                    userInfo = { _id: user.id, name: user.name };
                    return user;
                  }
                  throw new LoginError();
                });
              }
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
            resolve: async (root, { name, password }, { User, userInfo }) => {
              let hash = await bcrypt.hash(password, 8);
              return await User.create({ firstName: name,  password: hash })
                .then(user => {
                  user = tokenize(user);
                  userInfo = { _id: user.id, name: user.name };
                  return user;
                })
                .catch(err => {
                  throw new RegistrationError();
                });
              
            }
          },


          changePassword:{
            type: userType,
            description: 'CHange password.',
            args: {
             
              password: {type: new GraphQLNonNull(GraphQLString)},
              
            },
            resolve:async (root, { oldPassword, newPassword }, { User, userInfo }) => {
              let user = await User.findOne({ ...userInfo });
              if (!user) {
                throw new nameDoesNotExistError();
              }
              let passwordCheck = await bcrypt.compare(oldPassword, user.password);
              if (!passwordCheck) {
                throw new IncorrectPasswordError();
              }
              user.password = await bcrypt.hash(newPassword, 8);
              try {
                user = await user.save();
                user = tokenize(user);
                return user;
              } catch (error) {
                return error;
              }
            }

            },

                logout: {
            type: userType,
            resolve(parentValue, args, req) {
              const { user } = req;
              req.logout();
              return user;
            }
          },

       
        }
        }
        )
      
      

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
    
   
});


const graphql = require('graphql');
const Quiz = require('../models/quiz');
const Users = require('../models/user');

const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
            
} = graphql;

const AuthService = require('../routes/auth');

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
  id:  {type:  (GraphQLList(GraphQLID))   },



    name: {type: GraphQLString},
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
      id: {type: (GraphQLList(GraphQLID))  },


      name: { type: GraphQLString },
      questions: {type: new GraphQLList(quizType)},
     answers:{type: new GraphQLList(GraphQLString)},
     answer_id:{type:GraphQLInt},
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
    users: {
      type: new GraphQLNonNull(new GraphQLList(userType)),

      args: { ID: {type: (GraphQLList(GraphQLID))}  },

      description: 'Get all user',
      resolve: async (parent, args) => {
        try {
          return Quiz.findById(args.id);
      }
      catch (e) {
        return new Error(e.message);
      }
    } 
  },

      quiz: {
          type: new GraphQLList(quizType),
          args: { id: {type: (GraphQLList(GraphQLID)) } },

          resolve: async (parent, args) => {
            try {
              return Quiz.findById(args);
          }
          catch (e) {
            return new Error(e.message);
          }
        }
      },
      quizzes: {
          type: new GraphQLList(quizType),
          
          resolve: async (parent, args) => {
            try {
              return Quiz.findById({});
          }
          catch (e) {
            return new Error(e.message);
          }
        }    
  }
}

});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      
        addQuiz: {
            type: quizType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                questions: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
                answers:{type: new GraphQLNonNull( GraphQLList(GraphQLString))},
                answer_id:{type: new GraphQLNonNull(GraphQLString)},
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
            args: {
              name: { type: GraphQLString },
              password: { type: GraphQLString },
            },
            // request below is the Request Object that is passed from the FE
            // (browser) to GraphQL.  (request === 'context' in some literature)
            resolve(parentValue, { name, password }, req) {
              return AuthService.signup({ name, password, req });
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

          login: {
      type:userType,
      args: {
        name: { type: GraphQLString},
        password: { type:GraphQLString }
      },
      resolve(parentValue, { name, password }, req) {
        return AuthService.logIn({ name, password, req });
      }
    }

        },         
    });
  

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

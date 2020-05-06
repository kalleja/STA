
import { gql } from  'apollo-boost';

const getQuizQuery = gql`
    { 
    quizzes{    
            name
            id
                       
        }
    }
`;
const getUsersQuery = gql` 
    {
        users {
            name 
            id
            points
            total_points 
        }
    }
`;


const ADD_USER = gql`
  mutation Signup($name: String, $password: String) {
    signup(name: $name, password: $password) {
      id
      name
    }
}`;
 

const LOGIN_MUTATION = gql`
  mutation Login ($name: String!,$password:String!){
    login (name:$name,password:$password){
        id
      name
        }
      }`;
    

    const LOGOUT = gql`
    mutation  {
  logout{
    password
    name
  }
}`;

const addQuizMutation = gql`
    mutation AddQuiz($name: String!, $questions: Array!, $users: Array!, $answers:Array! ){
        addQuiz(name: $name, questions: $questions, users: $users, answers: $answers){
            name
            questions
            answers
        }
    }
`;
 
const getQuizsQuery = gql`
    query GetQuiz($id: ID){
        quiz {
            id
            name
            questions{
                answers
            }
            users {
                id
                name
                points
               
                }
            }
        }
    
`;

export { getUsersQuery, getQuizsQuery,  getQuizQuery, addQuizMutation, ADD_USER, LOGIN_MUTATION, LOGOUT };

//

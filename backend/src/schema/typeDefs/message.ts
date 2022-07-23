
import { GraphQLBoolean,GraphQLObjectType, GraphQLString } from "graphql";

export const messageType= new GraphQLObjectType({
    name:"Messsage",    
    fields:{
        success:{type: GraphQLBoolean},
        message: {type:GraphQLString},
    },
});

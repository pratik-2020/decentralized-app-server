const { GraphQLString, GraphQLBoolean, GraphQLList, GraphQLID, GraphQLObjectType } = require('graphql');

const FileType = new GraphQLObjectType({
    name: 'File',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        cluster: { type: new GraphQLList(GraphQLString) },
        caption: { type: GraphQLString },
    })
});

module.exports = FileType;
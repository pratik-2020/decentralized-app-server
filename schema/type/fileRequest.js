const { GraphQLString, GraphQLBoolean, GraphQLList, GraphQLID, GraphQLObjectType } = require('graphql');

const FileRequestType = new GraphQLObjectType({
    name: 'Filerequest',
    fields: () => ({
        id: { type: GraphQLID },
        fileid: { type: GraphQLString },
        clustername: { type: GraphQLString },
        file_url: { type: GraphQLString },
        from: { type: GraphQLString }
    })
});

module.exports = FileRequestType;
const { GraphQLString, GraphQLBoolean, GraphQLList, GraphQLID, GraphQLObjectType } = require('graphql');

const ClusterType = new GraphQLObjectType({
    name: 'Cluster',
    fields: () => ({
        id: { type: GraphQLID },
        clustername: { type: GraphQLString },
        active: { type: GraphQLBoolean },
        netspeed: { type: GraphQLString },
        macaddress: { type: GraphQLString },
        clientType: { type: GraphQLString },
        files: { type: new GraphQLList(GraphQLString) },
    })
});

module.exports = ClusterType;
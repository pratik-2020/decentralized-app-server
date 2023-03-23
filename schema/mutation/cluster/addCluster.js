const { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLBoolean, resolveObjMapThunk } = require('graphql');
const ClusterType = require('../../type/cluster');
const clusterModel = require('../../../model/cluster');
const addCluster = {
    type: ClusterType,
    args: {
        clustername: {
            type: new GraphQLNonNull(GraphQLString)
        },
        active: {
            type: GraphQLBoolean
        },
        netspeed: {
            type: GraphQLString
        },
        macaddress: {
            type: GraphQLString
        },
        clientType: {
            type: GraphQLString
        }
    },
    async resolve(parent, args){
        let clusterm = new clusterModel();
        clusterm.clustername = args.clustername;
        clusterm.active = true;
        clusterm.netspeed = args.netspeed;
        clusterm.macaddress = args.macaddress;
        clusterm.clientType = args.clientType;
        clusterm.files = [];
        let g = "";
        return await clusterm.save()
    }
}

module.exports = addCluster;
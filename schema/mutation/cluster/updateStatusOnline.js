const { GraphQLString } = require('graphql');
const clusterModel = require('../../../model/cluster');
const updateStatusOnline = {
    type: GraphQLString,
    args: {
        clustername: {
            type: GraphQLString
        }
    },
    async resolve(parent, args){
        let f = await clusterModel.updateOne({
            clustername: args.clustername
        }, {
            active: true
        }).then((resp) => {
            return "Status updated";
        }).catch((er) => {
            return er.message;
        });
        return f;
    }
};

module.exports = updateStatusOnline;
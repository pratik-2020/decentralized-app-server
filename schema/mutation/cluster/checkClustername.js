const { GraphQLString } = require('graphql');
const clusterModel = require('../../../model/cluster');
const checkClustername = {
    type: GraphQLString,
    args: {
        clustername: {
            type: GraphQLString
        }
    },
    async resolve(parent, args){
        let f = await clusterModel.find({
            clustername: args.clustername
        }).then((resp) => {
            if(resp.length === 0){
                return "No";
            }
            else{
                return "Yes";
            }
        }).catch((er) => {
            return er.message;
        });
        return f;
    }
};

module.exports = checkClustername;
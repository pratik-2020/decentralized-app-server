const { GraphQLString, GraphQLNonNull } = require('graphql');
const fileModel = require('../../../model/file');
const deleteFile = {
    type: GraphQLString,
    args: {
        fileid: {
            type: new GraphQLNonNull(GraphQLString)
        },
        clustername: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve(parent, args){
        return await fileModel.find({
            fileid: args.fileid
        }).then((resp) => {
            if(resp.length === 0){
                return "Cluster name not registered"
            }
            else{
                let f = resp[0].cluster;
                let index = f.indexOf(args.clustername);
                if (index > -1) { // only splice array when item is found
                    f.splice(index, 1); // 2nd parameter means remove one item only
                }
                fileModel.updateOne({
                    _id: args.fileid
                }, {
                    cluster: f
                }).then((resp) => {
                    return "Cluster removed";
                }).catch((er) => {
                    return er.message;
                })
            }
        })
    }
};

module.exports = deleteFile;
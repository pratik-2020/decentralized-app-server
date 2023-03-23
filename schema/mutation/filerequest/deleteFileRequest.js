const { GraphQLBoolean, GraphQLString, GraphQLNonNull } = require('graphql');
const filerequestModel = require('../../../model/filerequest');

const deleteFileRequest = {
    type: GraphQLString,
    args: {
        requestid: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve(parent, args){
        return await filerequestModel.deleteOne({
            _id: args.requestid
        }).then((resp) => {
            return "Request deleted"
        }).catch((er) => {
            return er.message;
        })
    }
};

module.exports = deleteFileRequest;
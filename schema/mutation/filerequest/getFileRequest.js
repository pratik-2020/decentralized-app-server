const { GraphQLString, GraphQLList } = require('graphql');
const filerequestModel = require('../../../model/filerequest');
const FileRequestType = require('../../type/fileRequest');

const getFileRequest = {
    type: new GraphQLList(FileRequestType),
    args: {
        clustername: {
            type: GraphQLString
        }
    },
    async resolve(parent, args){
        return await filerequestModel.find({
            clustername: args.clustername
        }).then((resp) => {
            return resp;
        }).catch((er) => {
            return  [er];
        })
    }
};

module.exports = getFileRequest;
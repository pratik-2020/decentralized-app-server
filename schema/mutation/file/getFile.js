const { GraphQLString, GraphQLNonNull } = require('graphql');
const fileModel = require('../../../model/file');
const FileType = require('../../type/file');
const getFile = {
    type: FileType,
    args: {
        fileid: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve(parent, args){
        return await fileModel.find({
            _id: args.fileid
        }).then((resp) => {
            return resp[0];
        })
    }
};

module.exports = getFile;
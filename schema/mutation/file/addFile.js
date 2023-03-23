const { GraphQLString, GraphQLNonNull } = require('graphql');
const fileModel = require('../../../model/file');
const FileType = require('../../type/file');
const addFile = {
    type: FileType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        cluster: {
            type: new GraphQLNonNull(GraphQLString)
        },
        caption: {
            type: GraphQLString,
        }
    },
    async resolve(parent,args){
        const filem = new fileModel({
            name: args.name,
            cluster: args.cluster,
            caption: args.caption
        });
        return await filem.save();
    }
};

module.exports = addFile;

module.exports = addFile;
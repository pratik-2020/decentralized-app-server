const { GraphQLString, GraphQLList } = require('graphql');
const fileModel = require('../../../model/file');
const FileType = require('../../type/file');
const clusterModel = require('../../../model/cluster');
const getFileGallery = {
    type: new GraphQLList(FileType),
    args: {},
    async resolve(parent, args){
        return await fileModel.find({
            clustername: () => {
                clusterModel.find({
                    active: true
                }).then((resp) => {
                    if(resp.length === 0){
                        return "";
                    }
                    else{
                        let g = []
                        resp.map((e,key) => {
                            g.push(e);
                        })
                        return g;
                    }
                })
            }
        })
    }
};

module.exports = getFileGallery;
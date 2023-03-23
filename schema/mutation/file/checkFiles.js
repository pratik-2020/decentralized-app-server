const { GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql');
const clusterModel = require('../../../model/cluster');
const fileModel = require('../../../model/file');
const checkFiles = {
    type: GraphQLString,
    args: {
        clustername: {
            type: new GraphQLNonNull(GraphQLString)
        },
        files: {
            type: new GraphQLList(GraphQLString)
        }
    },
    async resolve(parent, args){
        return await clusterModel.find({
            clustername: args.clustername
        }).then((resp) => {
            if(resp.length === 0){
                return "Cluster name not registered";
            }
            else{
                let f = resp[0].files;
                let g = [];
                if(f.length === 0){
                    return "";
                }
                else{
                    f.map((e,key) => {
                        if(args.files.indexOf(e) === -1){
                            g.push(e);
                        }
                    });
                    if(g.length !== 0){
                        g.map((e,key) => {
                            const index = f.indexOf(e);
                            if (index > -1) { // only splice array when item is found
                                f.splice(index, 1); // 2nd parameter means remove one item only
                            }
                        });
                        
                    }
                    else{
                        return "Files updated";
                    }
                }
            }
        })
    }
};

module.exports = checkFiles;
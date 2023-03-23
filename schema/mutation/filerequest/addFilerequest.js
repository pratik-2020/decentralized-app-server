const { GraphQLString, GraphQLNonNull } = require('graphql');
const filerequestModel = require('../../../model/filerequest');
const fileModel = require('../../../model/file');
const clusterModel = require('../../../model/cluster');
const FileRequestType = require('../../type/fileRequest');
const addFileRequest = {
    type: FileRequestType,
    args: {
        fileid: {
            type: new GraphQLNonNull(GraphQLString)
        },
        clustername: {
            type: GraphQLString
        }
    },
    async resolve(parent, args){
        let g = await fileModel.find({
            _id: args.fileid,
        }).then((resp1) => {
            let g = "";
            console.log(args.fileid);
            if(resp1.length === 0){console.log('Hello'); return "";}
            else{
                g = resp1[0].cluster.map((e,key) => {
                    if(clusterModel.find({clustername: e}).then((resp2 => {
                        console.log(resp2[0].clustername + ' ' + resp2[0].active)
                        if(resp2[0].active === "true" || resp2[0].active){
                            console.log("TWF")
                            return true
                        }
                        else{
                            console.log("WTF")
                            return false;
                        }
                    }))){
                        console.log("e ");
                        return e;
                    }
                    else{
                        return "";
                    }
                });
            }
        })
        console.log(g);
        let filem = new filerequestModel();
        filem.fileid = args.fileid;
        filem.clustername = args.clustername;
        filem.from = g
        return await filem.save()
    }
};

module.exports = addFileRequest;
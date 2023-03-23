const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLBoolean, GraphQLSchema } = require('graphql');
const fileModel = require('../model/file');
require('dotenv').config();
const clusterModel = require('../model/cluster');
const filerequestModel = require('../model/filerequest');
const FileType = require('./type/file');
const ClusterType = require('./type/cluster');
const FileRequestType = require('./type/fileRequest');
const addFile = require('./mutation/file/addFile');
const getFileGallery = require('./mutation/file/getFileGallery');
const deleteFile = require('./mutation/file/deleteFile');
const checkFiles = require('./mutation/file/checkFiles');
const getFile = require('./mutation/file/getFile');
const addCluster = require('./mutation/cluster/addCluster');resp2[0].clustername + ' ' + resp2[0].active
const checkClustername = require('./mutation/cluster/checkClustername');
const updateStatusOffline = require('./mutation/cluster/updateStatusOffline');
const updateStatusOnline = require('./mutation/cluster/updateStatusOnline');
const addFilerequest = require('./mutation/filerequest/addFilerequest');
const deleteFileRequest = require('./mutation/filerequest/deleteFileRequest');
const getFileRequest = require('./mutation/filerequest/getFileRequest');
const client = [
    {
        id: '1',
        clustername: 'Pratik',
        active: true,
    },
    {
        id: '2',
        clustername: 'Tony',
        active: false,
        files: []
    },
]

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        files: {
            type: new GraphQLList(FileType),
            args: {},
            async resolve(parent, args){
                return await fileModel.find({
                    clustername: clusterModel.find({
                        active: true
                    })
                })
            }
        },
        file: {
            type: FileType,
            args: {
                id: { type: GraphQLString }
            },
            async resolve(parent, args){
                let ar = await fileModel.find({
                    _id: args.id
                });
                return ar[0];
            }
        },
        clusters: {
            type: new GraphQLList(ClusterType),
            args: {},
            async resolve(parent, args){
                return await clusterModel.find()
            }
        },
        cluster: {
            type: ClusterType,
            args: { clustername: { type: GraphQLString } },
            async resolve(parent, args){
                console.log(args.clustername);
                let ar = await clusterModel.find({
                    clustername: args.clustername
                });
                return ar[0];
            }
        },
        activeCluster : {
            type: ClusterType,
            args: {},
            async resolve(parent, args){
                let f = await clusterModel.find({
                    active: true
                });
                console.log(f);
                return f[0];
            }
        },
        filerequests: {
            type: new GraphQLList(FileRequestType),
            args: { clustername: { type: GraphQLString } },
            async resolve(parent, args){
                let ar = await filerequestModel.find({
                    clustername: args.clustername
                });
                console.log(ar);
                return ar;
            }
        },
        filerequest: {
            type: FileRequestType,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args){
                let ar = await filerequestModel.find({
                    _id: args.id
                });
                console.log(ar);
                return ar[0];
            }
        },
    }
});
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //files
        addFile,//
        getFileGallery,//
        deleteFile,//
        checkFiles,
        getFile,//
        //cluster
        addCluster,//
        checkClustername,//
        updateStatusOffline,//
        updateStatusOnline,//
        //file request
        addFilerequest,//
        deleteFileRequest,//
        getFileRequest//
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation,
});
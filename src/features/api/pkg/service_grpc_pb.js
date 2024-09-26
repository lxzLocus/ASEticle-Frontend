// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// cd /app/config/api
// python -m grpc_tools.protoc -I./ --pyi_out=./pkg/ --python_out=./pkg/ --grpc_python_out=./pkg/ ./service.proto
//
'use strict';
var grpc = require('@grpc/grpc-js');
var service_pb = require('./service_pb.js');

function serialize_searchscholar_SearchScholarRequest(arg) {
  if (!(arg instanceof service_pb.SearchScholarRequest)) {
    throw new Error('Expected argument of type searchscholar.SearchScholarRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_searchscholar_SearchScholarRequest(buffer_arg) {
  return service_pb.SearchScholarRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_searchscholar_SearchScholarResponse(arg) {
  if (!(arg instanceof service_pb.SearchScholarResponse)) {
    throw new Error('Expected argument of type searchscholar.SearchScholarResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_searchscholar_SearchScholarResponse(buffer_arg) {
  return service_pb.SearchScholarResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// The searchScholar service definition.
var SearchScholarService = exports.SearchScholarService = {
  search: {
    path: '/searchscholar.SearchScholar/Search',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.SearchScholarRequest,
    responseType: service_pb.SearchScholarResponse,
    requestSerialize: serialize_searchscholar_SearchScholarRequest,
    requestDeserialize: deserialize_searchscholar_SearchScholarRequest,
    responseSerialize: serialize_searchscholar_SearchScholarResponse,
    responseDeserialize: deserialize_searchscholar_SearchScholarResponse,
  },
};

exports.SearchScholarClient = grpc.makeGenericClientConstructor(SearchScholarService);

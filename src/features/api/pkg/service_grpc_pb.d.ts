// package: searchscholar
// file: service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as service_pb from "./service_pb";

interface ISearchScholarService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    search: ISearchScholarService_ISearch;
}

interface ISearchScholarService_ISearch extends grpc.MethodDefinition<service_pb.SearchScholarRequest, service_pb.SearchScholarResponse> {
    path: "/searchscholar.SearchScholar/Search";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<service_pb.SearchScholarRequest>;
    requestDeserialize: grpc.deserialize<service_pb.SearchScholarRequest>;
    responseSerialize: grpc.serialize<service_pb.SearchScholarResponse>;
    responseDeserialize: grpc.deserialize<service_pb.SearchScholarResponse>;
}

export const SearchScholarService: ISearchScholarService;

export interface ISearchScholarServer extends grpc.UntypedServiceImplementation {
    search: grpc.handleUnaryCall<service_pb.SearchScholarRequest, service_pb.SearchScholarResponse>;
}

export interface ISearchScholarClient {
    search(request: service_pb.SearchScholarRequest, callback: (error: grpc.ServiceError | null, response: service_pb.SearchScholarResponse) => void): grpc.ClientUnaryCall;
    search(request: service_pb.SearchScholarRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.SearchScholarResponse) => void): grpc.ClientUnaryCall;
    search(request: service_pb.SearchScholarRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.SearchScholarResponse) => void): grpc.ClientUnaryCall;
}

export class SearchScholarClient extends grpc.Client implements ISearchScholarClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public search(request: service_pb.SearchScholarRequest, callback: (error: grpc.ServiceError | null, response: service_pb.SearchScholarResponse) => void): grpc.ClientUnaryCall;
    public search(request: service_pb.SearchScholarRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.SearchScholarResponse) => void): grpc.ClientUnaryCall;
    public search(request: service_pb.SearchScholarRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.SearchScholarResponse) => void): grpc.ClientUnaryCall;
}

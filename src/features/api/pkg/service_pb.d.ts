// package: searchscholar
// file: service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class SearchScholarRequest extends jspb.Message { 
    getQuery(): string;
    setQuery(value: string): SearchScholarRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SearchScholarRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SearchScholarRequest): SearchScholarRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SearchScholarRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SearchScholarRequest;
    static deserializeBinaryFromReader(message: SearchScholarRequest, reader: jspb.BinaryReader): SearchScholarRequest;
}

export namespace SearchScholarRequest {
    export type AsObject = {
        query: string,
    }
}

export class SearchScholarResponse extends jspb.Message { 
    clearResultsList(): void;
    getResultsList(): Array<SearchResult>;
    setResultsList(value: Array<SearchResult>): SearchScholarResponse;
    addResults(value?: SearchResult, index?: number): SearchResult;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SearchScholarResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SearchScholarResponse): SearchScholarResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SearchScholarResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SearchScholarResponse;
    static deserializeBinaryFromReader(message: SearchScholarResponse, reader: jspb.BinaryReader): SearchScholarResponse;
}

export namespace SearchScholarResponse {
    export type AsObject = {
        resultsList: Array<SearchResult.AsObject>,
    }
}

export class SearchResult extends jspb.Message { 
    getUrl(): string;
    setUrl(value: string): SearchResult;
    getTitle(): string;
    setTitle(value: string): SearchResult;
    getAuthor(): string;
    setAuthor(value: string): SearchResult;
    getConference(): string;
    setConference(value: string): SearchResult;
    getPages(): number;
    setPages(value: number): SearchResult;
    getDate(): string;
    setDate(value: string): SearchResult;
    getAbstract(): string;
    setAbstract(value: string): SearchResult;
    getCiteNum(): number;
    setCiteNum(value: number): SearchResult;
    getSubmitted(): boolean;
    setSubmitted(value: boolean): SearchResult;
    getRelevantNo(): number;
    setRelevantNo(value: number): SearchResult;
    getTier(): number;
    setTier(value: number): SearchResult;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SearchResult.AsObject;
    static toObject(includeInstance: boolean, msg: SearchResult): SearchResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SearchResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SearchResult;
    static deserializeBinaryFromReader(message: SearchResult, reader: jspb.BinaryReader): SearchResult;
}

export namespace SearchResult {
    export type AsObject = {
        url: string,
        title: string,
        author: string,
        conference: string,
        pages: number,
        date: string,
        pb_abstract: string,
        citeNum: number,
        submitted: boolean,
        relevantNo: number,
        tier: number,
    }
}

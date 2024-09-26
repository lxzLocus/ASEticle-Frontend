import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';


// Protobufの定義ファイルを読み込む
const PROTO_PATH = './service.proto';
const packageDefinition = loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
});

const serviceProto = loadPackageDefinition(packageDefinition).searchscholar as any;

// gRPCクライアントを作成する
const client = new serviceProto.SearchScholar(
	`${process.env.NEXT_PUBLIC_API_URL}`,
	credentials.createInsecure()
);

const FetchScholarInfo = async (query: string) => {
	return new Promise((resolve, reject) => {
		client.Search({ query: query }, (error: any, response: any) => {
			if (error) {
				reject(new Error('論文の取得に失敗しました'));
			} else {
				resolve(response);
			}
		});
	});
}

export default FetchScholarInfo;
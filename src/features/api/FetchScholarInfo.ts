const FetchScholarInfo = async (query: string) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/execute?params=scholar`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		});

		if (!response.ok) {
			throw new Error('シフトの登録に失敗しました');
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Failed to register draft shifts", error);
		return { 'error': error };
	}
}

export default FetchScholarInfo;
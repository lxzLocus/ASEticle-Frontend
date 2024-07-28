"use client";
import React, { useState } from "react";
import FetchScholarInfo from "../api/FetchScholarInfo";

export const InputQuery = () => {
	const [query, setQuery] = useState("");
	const [contents, setContents] = useState("default");

	const handleSearch = async (e: any) => {
		e.preventDefault();
		const response = await FetchScholarInfo(query);
		if (!response || response["result"] === undefined) {
			alert("論文情報の取得に失敗しました...");
		} else {
			setContents(response["result"][0]["title"]);
			alert("論文情報の取得に成功しました!");
		}
	}

	return (
		<div>
			<form onSubmit={handleSearch}>
				<input
					type="text"
					placeholder="クエリを入力"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button type="submit">Search</button>
			</form>
			{contents}
		</div>
	);
};
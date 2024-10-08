"use client";

import '@radix-ui/themes/styles.css';
import { Theme, Text,  Switch } from '@radix-ui/themes';
import styles from './page.module.css';
import React, { useState, useEffect } from 'react';
import Query from '@/features/home/InputQuery';
import { useSession } from "next-auth/react";



export default function Home() {
	const [darkMode, setDarkMode] = useState(false);
	const [isClient, setIsClient] = useState(false);


	useEffect(() => {		
		const savedDarkMode = localStorage.getItem('darkMode');
		if (savedDarkMode !== null) {
			setDarkMode(JSON.parse(savedDarkMode));
		}
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (isClient) {
			localStorage.setItem('darkMode', JSON.stringify(darkMode));
		}
	}, [darkMode, isClient]);

	if (!isClient) {
		return null;
	}

	const imageSrc = darkMode ? '/images/DarkMode.png' : '/images/Nomal.png';

	return (
		<Theme
			appearance={darkMode ? 'dark' : 'light'}
			accentColor="mint"
			grayColor="gray"
			panelBackground="solid"
			scaling="100%"
			radius="full"
		>
			<div className={styles.centeredContainer}>
				<div className={styles.queryContainer}>
					<div className={styles.switchLabelContainer}>
						<Text className={styles.switchLabel}>Dark Mode</Text>
						<Switch
							variant="surface"
							checked={darkMode}
							onCheckedChange={(checked) => setDarkMode(checked)}
						/>
					</div>
					<img src={imageSrc} alt="logo" className={styles.image} />
					<Query />
				</div>
			</div>
		</Theme>
	);
}

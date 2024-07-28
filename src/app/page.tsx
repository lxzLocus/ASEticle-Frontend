"use client";

import '@radix-ui/themes/styles.css';
import { Theme, Flex, Text, Box, TextField, IconButton, Switch } from '@radix-ui/themes';
import { MagnifyingGlassIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import styles from './page.module.css';
import React, { useState, useEffect } from 'react';

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
		<html>
			<body>
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
			</body>
		</html>
	);
}

function Query() {
	return (
		<Flex direction="column" gap="3" className={styles.queryContainer}>
			<Box>
				<TextField.Root placeholder="Search the scholar…" size="3" className={styles.textField}>
					<TextField.Slot>
						<MagnifyingGlassIcon height="16" width="16" />
					</TextField.Slot>
					<TextField.Slot pr="3">
						<IconButton size="2" variant="ghost">
							<ArrowRightIcon height="16" width="16" />
						</IconButton>
					</TextField.Slot>
				</TextField.Root>
			</Box>
		</Flex>
	);
}

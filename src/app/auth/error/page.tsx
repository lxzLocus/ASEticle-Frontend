"use client"; 

import '@radix-ui/themes/styles.css';
import { Theme, Box, Card, Text } from '@radix-ui/themes';
import styles from './page.module.css';
import React, { useState, useEffect } from 'react';


export default function ErrorPage() {
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

    return (
        <Theme
            appearance={darkMode ? 'dark' : 'light'}
            accentColor="mint"
            grayColor="gray"
            panelBackground="solid"
            scaling="100%"
            radius="full"
        >
            <Box maxWidth="350px">
                <Card asChild>
                    <a href="#">
                        <Text as="div" size="2" weight="bold">
                            Quick start
                        </Text>
                        <Text as="div" color="gray" size="2">
                            Start building your next project in minutes
                        </Text>
                    </a>
                </Card>
            </Box>
        </Theme>
    )
}

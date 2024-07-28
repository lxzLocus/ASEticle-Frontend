"use client";

import '@radix-ui/themes/styles.css';
import { Theme, Flex, Text, Box, TextField, IconButton, Switch } from '@radix-ui/themes';
import { MagnifyingGlassIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import styles from './page.module.css';
import React, { useState, useEffect } from 'react';



const data = [
    {
        "url": "https://arxiv.org/abs/2403.00448",
        "title": "When Large Language Models Confront Repository-Level Automatic Program Repair: How Well They Done?",
        "author": "Yuxiao Chen, Jingzheng Wu, Xiang Ling",
        "conference": "2024 IEEE/ACM 46th International Conference on Software Engineering: Companion Proceedings (ICSE-Companion)",
        "pages": 13,
        "date": "240301",
        "abstract": "In recent years, large language models(LLMs) have ",
        "cite_num": 3,
        "submitted": true,
        "relevant_no": 1,
        "tier": 1
    },
    {
        "url": "https://arxiv.org/abs/2406.05621",
        "title": "Cross Language Soccer Framework: An Open Source Framework for the RoboCup 2D Soccer Simulation",
        "author": "Aref Sayareh, Jingzheng Wu, Xiang Ling, Amilcar Soares, Alireza Sadraii",
        "conference": "arXiv.org",
        "pages": 12,
        "date": "240501",
        "abstract": "RoboCup Soccer Simulation 2D (SS2D) research is hampered by the complexity of existing Cpp-based codes like Helios,Cyrus, which also suffer from limited integration with modern machine learning frameworks. This development paper introduces a transformative solution a gRPC-based,",
        "cite_num": 3,
        "submitted": true,
        "relevant_no": 3,
        "tier": 2
    }
];


// 定義
interface Item {
    url: string;
    title: string;
    author: string;
    conference: string;
    pages: number;
    date: string;
    abstract: string;
    cite_num: number;
    submitted: boolean;
    relevant_no: number;
    tier: number;
}

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
                <div
                    className={styles.topBar}
                    style={{
                        boxShadow: darkMode
                            ? '0 2px 4px rgba(255, 255, 255, 0.1)'
                            : '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <img src={imageSrc} alt="logo" className={styles.image} />
                    <Query />
                    <div className={styles.switchLabelContainer}>
                        <Text className={styles.switchLabel}>Dark Mode</Text>
                        <Switch
                            variant="surface"
                            checked={darkMode}
                            onCheckedChange={(checked) => setDarkMode(checked)}
                        />
                    </div>
                </div>
                <div className={styles.contentContainer}>
                    {data.map((item, index) => (
                        <ContentItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </Theme>
    );
}

function Query() {
    return (
        <Flex direction="row" gap="3" className={styles.queryFlex}>
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

function ContentItem({ item }: { item: Item }) {
    return (
        <div className={styles.contentItem}>
            <a href={item.url} className={styles.title}>{item.title}</a>
            <p className={styles.author}>{item.author}</p>
            <p className={styles.abstract}>{item.abstract}</p>
            <div className={styles.meta}>
                <span>{item.pages} pages</span> |
                <span>{item.date}</span> |
                <span>Cited: {item.cite_num}</span> |
                <span>Submitted: {item.submitted ? "Yes" : "No"}</span>
            </div>
        </div>
    );
}
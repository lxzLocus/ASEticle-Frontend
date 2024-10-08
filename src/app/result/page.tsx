"use client";

import '@radix-ui/themes/styles.css';
import { Theme, Flex, Text, Box, TextField, IconButton, Switch, Badge, CheckboxCards, Select, Button } from '@radix-ui/themes';
import { MagnifyingGlassIcon, ArrowRightIcon, LayersIcon } from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './page.module.css';
import React, { useState, useEffect, useRef } from 'react';
import FetchScholarInfo from '@/features/api/FetchScholarInfo'; // ヤマギシ追加
import refine from '@/features/module/ref'; // ヤマギシ追加
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"; // 追加

// testdata
import { data } from './testdata.js';

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
    const [searchQuery, setSearchQuery] = useState('');
    const [sortedData, setSortedData] = useState(data); // ソートしたデータ
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();


    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
            setDarkMode(JSON.parse(savedDarkMode));
        }
        setIsClient(true);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = window.location.href;
                const query = decodeURIComponent(url.split('?query=').pop() || "");
                setSearchQuery(query);

                if (query) {
                    const result = await FetchScholarInfo(query);
                    console.log("結果", result);

                    refine(result, { refineDate: "0", acm: false, arxiv: false, ieee: false, type: "date", sortType: "昇順" });
                } else {
                    console.error("Query parameter is missing in the URL.");
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem('darkMode', JSON.stringify(darkMode));
        } data
    }, [darkMode, isClient]);

    if (!isClient) {
        return null;
    }

    const imageSrc = darkMode ? '/images/DarkMode.png' : '/images/Nomal.png';

    const handleSortedDataUpdate = (sortedData: any) => {
        setSortedData(sortedData);
        console.log("sortdata", sortedData);
    };

    const handleImageClick = () => {
        if (typeof window !== 'undefined') { // Check if we are on the client side
            router.push('/'); // Navigate to the home page when the image is clicked
        }
    };

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
                    <img src={imageSrc} alt="logo" className={styles.image} onClick={handleImageClick} />
                    <Query searchQuery={searchQuery} setSearchQuery={setSearchQuery} inputRef={inputRef} />
                    <div className={styles.switchLabelContainer}>
                        <Text className={styles.switchLabel}>Dark Mode</Text>
                        <Switch
                            variant="surface"
                            checked={darkMode}
                            onCheckedChange={(checked) => setDarkMode(checked)}
                        />
                    </div>
                </div>
                <div className={styles.countBar}
                    style={{
                        boxShadow: darkMode
                            ? '0 2px 4px rgba(255, 255, 255, 0.1)'
                            : '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <Text>Content Items: {data.length}</Text>
                </div>
                <div className={styles.mainContainer}>
                    <ListContainer onSortedDataUpdate={handleSortedDataUpdate} />
                    <div className={styles.contentContainer}>
                        {sortedData.map((item, index) => (
                            <ContentItem key={index} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </Theme>
    );
}

function Query({ searchQuery, setSearchQuery, inputRef }: { searchQuery: string, setSearchQuery: React.Dispatch<React.SetStateAction<string>>, inputRef: React.RefObject<HTMLInputElement> }) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const cursorPosition = e.target.selectionStart;
        setSearchQuery(value);
        if (inputRef.current) {
            requestAnimationFrame(() => {
                inputRef.current?.setSelectionRange(cursorPosition, cursorPosition);
            });
        }
    };

    const handleIconClick = () => {
        if (searchQuery.trim() !== '') {
            // 遷移処理をここに追加
            console.log('Search query:', searchQuery);
            window.location.href = `/result?query=${encodeURIComponent(searchQuery)}`;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleIconClick();
        }
    };

    return (
        <Flex direction="row" gap="3" className={styles.queryFlex}>
            <Box>
                <TextField.Root
                    placeholder="Search the scholar…"
                    size="3"
                    className={styles.textField}
                    value={searchQuery}
                    onChange={handleInputChange}
                    ref={inputRef}
                    onKeyDown={handleKeyDown} // Add this line
                >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                    <TextField.Slot pr="3">
                        <IconButton size="2" variant="ghost" onClick={handleIconClick}>
                            <ArrowRightIcon height="16" width="16" />
                        </IconButton>
                    </TextField.Slot>
                </TextField.Root>
            </Box>
        </Flex>
    );
}


const ContentItem: React.FC<{ item: any }> = ({ item }) => {// function ContentItem({ item }: { item: Item }) { 
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => setIsExpanded(!isExpanded);

    const MAX_LENGTH = 300; // maximum characters to display before "Read more"

    const citeName = getSiteName(item);
    const labelColor = getLabelClass(citeName);

    return (
        <div className={styles.arrayItemContainer}>
            <div className={styles.itemDetails}>
                <a href={item.url} className={styles.title} target="_blank" rel="noopener noreferrer">{item.title}</a>
                <p className={styles.author}>{item.author}</p>
                <p className={styles.abstract}>
                    {isExpanded ? item.abstract : item.abstract.substring(0, MAX_LENGTH)}
                    {item.abstract.length > MAX_LENGTH && (
                        <span className={styles.readMore} onClick={toggleExpanded}>
                            {isExpanded ? ' Read less' : '... Read more'}
                        </span>
                    )}
                </p>
                <div className={styles.meta}>
                    <span>{item.date}</span> |
                    <span> {item.pages} pages</span> |
                    <span> Cited: {item.cite_num}</span> |
                    <span> Submitted: {item.submitted ? "Yes" : "No"}</span>
                </div>
            </div>
            <div className={styles.badgeContainer}>
                <Badge size="3" variant="outline" radius="large" color={labelColor}>{citeName}</Badge>
            </div>
        </div>
    );
}


function ListContainer({ onSortedDataUpdate }: { onSortedDataUpdate: (data: any) => void }) {
    /*デフォルト値*/
    const [filterConf, setfilterConf] = useState(["1", "2", "3"]);
    const [postDate, setpostDate] = useState("0");
    const [sortBy, setsortBy] = useState("relevant_no");
    const [sortType, setsortType] = useState("昇順");

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [sinceDate, setSinceDate] = useState('');
    const [fromDate, setFromDate] = useState('');

    const openDialog = () => setIsOpen(true);  // ダイアログを開く
    const closeDialog = () => setIsOpen(false); // ダイアログを閉じる

    const handleSortByChange = async (value: string) => { //handleSortByChangeはヤマギシ追加
        setsortBy(value);
        switch (value) {
            case 'Date':
                console.log('Date selected');
                // Dateが選択されたときの処理
                setsortBy('date')
                const option_date = {
                    type: 'date',
                    sortType: sortType,
                    refineDate: postDate,
                    acm: filterConf.includes("1"),
                    arxiv: filterConf.includes("2"),
                    ieee: filterConf.includes("3")
                };
                onSortedDataUpdate(await refine(data, option_date)); // Call the callback with the sorted data

                break;
            case 'Relevance':
                console.log('Relevance selected');
                // Relevanceが選択されたときの処理
                setsortBy('relevant_no')
                const option_rel = {
                    type: 'relevant_no',
                    sortType: sortType,
                    refineDate: postDate,
                    acm: filterConf.includes("1"),
                    arxiv: filterConf.includes("2"),
                    ieee: filterConf.includes("3")
                };
                onSortedDataUpdate(await refine(data, option_rel));
                break;
            case 'ConferenceRank':
                console.log('ConferenceRank selected');
                // ConferenceRankが選択されたときの処理
                setsortBy('tier')
                const option_rank = {
                    type: 'tier',
                    sortType: sortType,
                    refineDate: postDate,
                    acm: filterConf.includes("1"),
                    arxiv: filterConf.includes("2"),
                    ieee: filterConf.includes("3")
                };
                onSortedDataUpdate(await refine(data, option_rank));
                break;
            case 'String':
                console.log('String selected');
                // Stringが選択されたときの処理
                setsortBy('学会学術誌名')
                const option_str = {
                    type: '学会学術誌名',
                    sortType: sortType,
                    refineDate: postDate,
                    acm: filterConf.includes("1"),
                    arxiv: filterConf.includes("2"),
                    ieee: filterConf.includes("3")
                };
                onSortedDataUpdate(await refine(data, option_str));
                break;
            case 'Cite':
                console.log('Cite selected');
                // Citeが選択されたときの処理
                setsortBy('cite_num')
                const option_cite = {
                    type: 'cite_num',
                    sortType: sortType,
                    refineDate: postDate,
                    acm: filterConf.includes("1"),
                    arxiv: filterConf.includes("2"),
                    ieee: filterConf.includes("3")
                };
                onSortedDataUpdate(await refine(data, option_cite));
                break;
            default:
                console.log('Unknown selection');
        }
    };

    const handleSortByType = async (value: string) => { //handleSortByTypeはヤマギシ追加
        setsortType(value);
        switch (value) {
            case '昇順':
                console.log('昇順');
                // Dateが選択されたときの処理
                setsortType('昇順')
                const option_up = {
                    type: sortBy,
                    sortType: '昇順',
                    refineDate: postDate,
                    acm: filterConf.includes("1"),
                    arxiv: filterConf.includes("2"),
                    ieee: filterConf.includes("3")
                };
                onSortedDataUpdate(await refine(data, option_up)); // Call the callback with the sorted data
                break;
            case '降順':
                console.log('降順');
                // Dateが選択されたときの処理
                setsortType('降順')
                const option_down = {
                    type: sortBy,
                    sortType: '降順',
                    refineDate: postDate,
                    acm: filterConf.includes("1"),
                    arxiv: filterConf.includes("2"),
                    ieee: filterConf.includes("3")
                };
                onSortedDataUpdate(await refine(data, option_down)); // Call the callback with the sorted data
                break;
            default:
                console.log('Unknown selection');
        }
    }

    // dateフィルタ関連
    const handlePostByDate = async (value: string) => { //handleSortByDateはヤマギシ追加
        setpostDate(value);
        switch (value) {
            case '0':
                console.log('Any time');
                // Dateが選択されたときの処理
                setpostDate('0')
                const option_date = {
                    type: sortBy,
                    sortType: sortType,
                    refineDate: '0',
                    acm: filterConf.includes("1"),
                    arxiv: filterConf.includes("2"),
                    ieee: filterConf.includes("3")
                };
                onSortedDataUpdate(await refine(data, option_date)); // Call the callback with the sorted data
                break;
            case '2024':
                console.log('2024');
                // Dateが選択されたときの処理
                setpostDate('2024')
                const option_2024 = {
                    type: sortBy,
                    sortType: sortType,
                    refineDate: '2024',
                    acm: filterConf.includes("1"),
                    arxiv: filterConf.includes("2"),
                    ieee: filterConf.includes("3")
                };
                onSortedDataUpdate(await refine(data, option_2024)); // Call the callback with the sorted data
                break;
            case '2023':
                console.log('2023');
                // Dateが選択されたときの処理
                setpostDate('2023')
                const option_2023 = {
                    type: sortBy,
                    sortType: sortType,
                    refineDate: '2023',
                    acm: filterConf.includes("1"),
                    arxiv: filterConf.includes("2"),
                    ieee: filterConf.includes("3")
                };
                onSortedDataUpdate(await refine(data, option_2023)); // Call the callback with the sorted data
                break;
            case '2022':
                console.log('2022');
                // Dateが選択されたときの処理
                setpostDate('2022')
                const option_2022 = {
                    type: sortBy,
                    sortType: sortType,
                    refineDate: '2022',
                    acm: filterConf.includes("1"),
                    arxiv: filterConf.includes("2"),
                    ieee: filterConf.includes("3")
                };
                onSortedDataUpdate(await refine(data, option_2022)); // Call the callback with the sorted data
                break;
            case '2021':
                console.log('2021');
                // Dateが選択されたときの処理
                setpostDate('2021')
                const option_2021 = {
                    type: sortBy,
                    sortType: sortType,
                    refineDate: '2021',
                    acm: filterConf.includes("1"),
                    arxiv: filterConf.includes("2"),
                    ieee: filterConf.includes("3")
                };
                onSortedDataUpdate(await refine(data, option_2021)); // Call the callback with the sorted data
                break;
            case '2020':
                console.log('2020');
                // Dateが選択されたときの処理
                setpostDate('2020')
                const option_2020 = {
                    type: sortBy,
                    sortType: sortType,
                    refineDate: '2020',
                    acm: filterConf.includes("1"),
                    arxiv: filterConf.includes("2"),
                    ieee: filterConf.includes("3")
                };
                onSortedDataUpdate(await refine(data, option_2020)); // Call the callback with the sorted data
                break;
            case 'custom':
                console.log('Custom Date');
                setIsOpen(true); // ダイアログを開く              
            default:
                console.log('Unknown selection');
        }
    }

    const handleApply = () => {
        // Applyボタンがクリックされたときの処理
        console.log('Since:', sinceDate);
        console.log('From:', fromDate);
        setIsDialogOpen(false);
    };


    const handlePostByType = async (value: string[]) => { //handlePostByTypeはヤマギシ追加
        setfilterConf(value);
        console.log(value)
        const option_1 = {
            type: sortBy,
            sortType: sortType,
            refineDate: postDate,
            acm: value.includes("1"),
            arxiv: value.includes("2"),
            ieee: value.includes("3")
        };
        onSortedDataUpdate(await refine(data, option_1));
    }

    return (
        <div className={styles.listContainer}>
            <Text className={styles.listLabel}>Filter Conference</Text>
            <CheckboxCards.Root
                className={styles.checkboxContainer}
                value={filterConf} onValueChange={(value) => handlePostByType(value)}
            >
                <CheckboxCards.Item value="1">
                    <Flex direction="column" width="100%">
                        <Text weight="bold">ACM</Text>
                    </Flex>
                </CheckboxCards.Item>
                <CheckboxCards.Item value="2">
                    <Flex direction="column" width="100%">
                        <Text weight="bold">Arxiv</Text>
                    </Flex>
                </CheckboxCards.Item>
                <CheckboxCards.Item value="3">
                    <Flex direction="column" width="100%">
                        <Text weight="bold">IEEE</Text>
                    </Flex>
                </CheckboxCards.Item>
            </CheckboxCards.Root>

            <Text className={styles.listLabel}>Filter Post Date</Text>
            <Select.Root
                size="3"
                value={postDate} onValueChange={(value) => handlePostByDate(value)}
            >
                <Select.Trigger aria-label="filterDate" className={styles.selectTrigger}>
                    {/* <Select.Value placeholder="Select an item…" /> */}
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="0" className={styles.selectItem}>Any time</Select.Item>
                    <Select.Item value="2024" className={styles.selectItem}>since 2024</Select.Item>
                    <Select.Item value="2023" className={styles.selectItem}>since 2023</Select.Item>
                    <Select.Item value="2022" className={styles.selectItem}>since 2022</Select.Item>
                    <Select.Item value="2021" className={styles.selectItem}>since 2021</Select.Item>
                    <Select.Item value="2020" className={styles.selectItem}>since 2020</Select.Item>
                    <Select.Item value="custom" className={styles.selectItem}>Custom Date</Select.Item>
                </Select.Content>
            </Select.Root>

            <Text className={styles.listLabel}>Sort By</Text>
            <Select.Root
                size="3"
                value={sortBy} onValueChange={(value) => handleSortByChange(value)}//ヤマギシ変更
            >
                <Select.Trigger aria-label="sortBy" className={styles.selectTrigger}>
                    {/* <Select.Value placeholder="Select an item…" /> */}
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="Date" className={styles.selectItem}>Date</Select.Item>
                    <Select.Item value="Relevance" className={styles.selectItem}>Relevance</Select.Item>
                    <Select.Item value="ConferenceRank" className={styles.selectItem}>Conference Rank</Select.Item>
                    <Select.Item value="Cite" className={styles.selectItem}>Cite</Select.Item>
                </Select.Content>
            </Select.Root>

            <Text className={styles.listLabel}>Sort Type</Text>
            <Select.Root
                size="3"
                value={sortType} onValueChange={(value) => handleSortByType(value)}
            >
                <Select.Trigger aria-label="sortType" className={styles.selectTrigger}>
                    {/* <Select.Value placeholder="Select an item…" /> */}
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="昇順" className={styles.selectItem}>Ascending</Select.Item>
                    <Select.Item value="降順" className={styles.selectItem}>Descending</Select.Item>
                </Select.Content>
            </Select.Root>
            {/* <Text className={styles.listLabel}></Text>
            <Button className={styles.Reloadbutton} size="3" >
                <LayersIcon /> Apply Filters
            </Button> */}

            {/* dialog関連 */}
            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen} >
                <Dialog.Trigger>
                    <Button>Custom Date</Button>
                </Dialog.Trigger>

                <Dialog.Content className={styles.dialogContent}>
                    <Dialog.Title>Input Year</Dialog.Title>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Since
                            </Text>
                            <TextField.Root
                                value={sinceDate}
                                onValueChange={(e) => setSinceDate(e.target.value)}
                                placeholder="Enter since date"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                From
                            </Text>
                            <TextField.Root
                                value={fromDate}
                                onValueChange={(e) => setFromDate(e.target.value)}
                                placeholder="Enter from date"
                            />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close asChild>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Button onClick={handleApply}>Apply</Button>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </div>

    );
}


const getSiteName = (item: Item): string | null => {
    const allowedDomains: { [key: string]: string } = {
        "https://arxiv.org/": "Arxiv",
        "https://ieeexplore.ieee.org/": "IEEE",
        "https://www.sciencedirect.com/": "ScienceDirect",
        "https://dl.acm.org/": "ACM"
    };

    for (const domain in allowedDomains) {
        if (item.url.startsWith(domain)) {
            return allowedDomains[domain];
        }
    }
    return null;
};

const getLabelClass = (siteName: string | null): "tomato" | "indigo" | "orange" | "gray" | undefined => {
    switch (siteName) {
        case 'Arxiv':
            return "tomato";
        case 'IEEE':
            return "indigo"
        case 'ScienceDirect':
            return "orange";
        case 'ACM':
            return "gray";
        default:
            return undefined;
    }
};


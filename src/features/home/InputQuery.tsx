"use client";

import '@radix-ui/themes/styles.css';
import { Flex, Box, TextField, IconButton } from '@radix-ui/themes';
import { MagnifyingGlassIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import styles from '@/app/page.module.css';
import React, { useState} from 'react';
import { useRouter } from 'next/navigation';

export default function Query() {
    const router = useRouter();
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e: any) => {
        setSearchText(e.target.value);
    };

    const handleSubmit = async () => {
        router.push(`/result?query=${encodeURIComponent(searchText)}`);
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <Flex direction="column" gap="3" className={styles.queryContainer}>
            <Box>
                <TextField.Root
                    placeholder="Search the scholar…"
                    size="3"
                    className={styles.textField}
                    onChange={(e)=>handleInputChange(e)}
                    onKeyDown={handleKeyDown}
                >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                    <TextField.Slot pr="3">
                        <IconButton size="2" variant="ghost" onClick={handleSubmit}>
                            <ArrowRightIcon height="16" width="16" />
                        </IconButton>
                    </TextField.Slot>
                </TextField.Root>
            </Box>
        </Flex>
    );
};
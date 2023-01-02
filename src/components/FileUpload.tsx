import React, { useState } from 'react';
import { Flex, Image, Text, ActionIcon, Box } from '@mantine/core';
import { IconTrash } from '@tabler/icons';
import { FileUploadDropzone } from './FileUploadDropzone';

interface FileUploadProps {
    onUpload: (uploadedFile: File) => void;
    onDelete: () => void;
    withTitle?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
    onUpload,
    onDelete,
    withTitle = false,
}) => {
    const [file, setFile] = useState<File | undefined>(undefined);

    return (
        <Flex direction="column" mb="lg" h="100%" w="100%">
            <Flex justify="space-between">
                {withTitle && (
                    <Text fw="500" fz="lg">
                        Image
                    </Text>
                )}

                {file && (
                    <ActionIcon
                        size="md"
                        mr="xs"
                        color="red"
                        onClick={() => {
                            onDelete();
                            setFile(undefined);
                        }}
                    >
                        <IconTrash />
                    </ActionIcon>
                )}
            </Flex>
            {file && (
                <Flex w={300} h={300} sx={{ overflow: 'auto' }}>
                    <Image src={URL.createObjectURL(file)} radius="md" />
                </Flex>
            )}
            {!file && (
                <Box h="100%">
                    <FileUploadDropzone
                        onUpload={(uploadedFile) => {
                            setFile(uploadedFile);
                            onUpload(uploadedFile);
                        }}
                    />
                </Box>
            )}
        </Flex>
    );
};

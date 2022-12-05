import React, { useState } from 'react';
import { Flex, Image, Text, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons';
import { FileUploadDropzone } from './FileUploadDropzone';

interface FileUploadProps {
    onUpload: (uploadedFile: File) => void;
    onDelete: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
    onUpload,
    onDelete,
}) => {
    const [file, setFile] = useState<File | undefined>(undefined);

    return (
        <Flex direction="column" mb="lg">
            <Flex justify="space-between">
                <Text fw="500" fz="lg">
                    Image
                </Text>
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
                <Image
                    src={URL.createObjectURL(file)}
                    radius="md"
                    width={300}
                />
            )}
            {!file && (
                <FileUploadDropzone
                    onUpload={(uploadedFile) => {
                        setFile(uploadedFile);
                        onUpload(uploadedFile);
                    }}
                />
            )}
        </Flex>
    );
};

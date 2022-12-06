import React, { useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { Group, Text, Flex, useMantineTheme } from '@mantine/core';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons';

interface FileUploadDropzoneProps {
    onUpload: (file: FileWithPath) => void;
}

export const FileUploadDropzone: React.FC<FileUploadDropzoneProps> = ({
    onUpload,
}) => {
    const theme = useMantineTheme();

    const [uploadError, setUploadError] = useState<boolean>(false);

    return (
        <Flex direction="column">
            <Dropzone
                onDrop={(files) => {
                    setUploadError(false);
                    onUpload(files[0]);
                }}
                onReject={() => setUploadError(true)}
                accept={IMAGE_MIME_TYPE}
                maxFiles={1}
                maxSize={1024 ** 2 * 5}
                style={{ borderColor: uploadError ? 'red' : '' }}
                py="xl"
            >
                <Group
                    position="center"
                    spacing="xl"
                    style={{ pointerEvents: 'none' }}
                >
                    <Dropzone.Accept>
                        <IconUpload
                            size={50}
                            stroke={1.5}
                            color={
                                theme.colors[theme.primaryColor][
                                    theme.colorScheme === 'dark' ? 4 : 6
                                ]
                            }
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            size={50}
                            stroke={1.5}
                            color={
                                theme.colors.red[
                                    theme.colorScheme === 'dark' ? 4 : 6
                                ]
                            }
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto size={50} stroke={1.5} />
                    </Dropzone.Idle>

                    <Flex direction="column" gap="xs">
                        <Text size="xl" inline>
                            Drag image here or click to select file
                        </Text>
                        <Text size="md" inline color="dimmed" align="center">
                            Only image files up to 5 MB
                        </Text>
                    </Flex>
                </Group>
            </Dropzone>
            {uploadError && (
                <Text color="red" mt="xs">
                    Error! Try uploading different file
                </Text>
            )}
        </Flex>
    );
};

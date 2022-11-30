export const areRecordsEqual = (
    a: Record<string, any>,
    b: Record<string, any>,
): boolean => {
    return Object.keys(a).every((key) => a[key] === b[key]);
};

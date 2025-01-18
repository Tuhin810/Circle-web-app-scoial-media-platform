export const formatMongoDate = (date: string) => {
    return date? new Date(date).toLocaleDateString("en-GB") : "N/A";
}
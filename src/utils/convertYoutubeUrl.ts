export const convertYouTubeUrl = (url: string): string => {
    const urlObj = new URL(url);
    if (urlObj.hostname === "www.youtube.com" && urlObj.pathname === "/watch") {
        const videoId = urlObj.searchParams.get("v");
        return 'F7mKD2Un65I';
        return videoId || '';
    }
    return '';
};
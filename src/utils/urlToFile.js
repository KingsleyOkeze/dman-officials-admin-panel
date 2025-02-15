// Helper function to convert image URL to File object
const urlToFile = async (url, filename, mimeType) => {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return new File([buffer], filename, { type: mimeType });
};

module.exports = urlToFile;
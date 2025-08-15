export const formatDate = (isoString, type = "full") => {
    if (!isoString) return 'N/A';

    const date = new Date(isoString);
    
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    if (type === "dob") {
        // Day-Month-Year only
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Full date with time for events like joining date
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};

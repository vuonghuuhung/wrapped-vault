export const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    // Get hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format hours and minutes
    const formattedHours = hours < 10 ? '0' + hours : hours.toString();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();

    // Combine hours and minutes in "hh:mm" format
    const formattedTime = `${formattedHours}:${formattedMinutes}`;

    return formattedTime;
};
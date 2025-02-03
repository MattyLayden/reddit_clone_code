


export default function timeAgo(date) {

    const currentTime = new Date();

    const pastTime = new Date(date);

    const differenceInMilliseconds = currentTime - pastTime;

    const differenceInSeconds = differenceInMilliseconds / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    const differenceInDays = differenceInHours / 24;
    const differenceInWeeks = differenceInDays / 7;
    const differenceInMonths = differenceInDays / 30; 

    if (differenceInSeconds < 60) {
        return "less than a minute ago";
    } else if (differenceInMinutes < 60) {
        const minutes = Math.floor(differenceInMinutes);
        return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
    } else if (differenceInHours < 24) {
        const hours = Math.floor(differenceInHours);
        return hours === 1 ? "an hour ago" : `${hours} hours ago`;
    } else if (differenceInDays < 7) {
        const days = Math.floor(differenceInDays);
        return days === 1 ? "a day ago" : `${days} days ago`;
    } else if (differenceInWeeks < 4) {
        const weeks = Math.floor(differenceInWeeks);
        return weeks === 1 ? "a week ago" : `${weeks} weeks ago`;
    } else {
        const months = Math.floor(differenceInMonths);
        return months === 1 ? "a month ago" : `${months} months ago`;
    }
}


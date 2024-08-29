
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getUrl } from "aws-amplify/storage";

const cached: {
    [key: string]: string;
} = {};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
    }).format(new Date(date));

export const getSignedUrl = async (url: string): Promise<string> => {
    if (url.includes("blob:")) return url;
    cached[url] =
        cached[url] ||
        (
            await getUrl({
                key: url,
                options: {
                    accessLevel: "protected",
                },
            })
        ).url.href;
    return cached[url];
};

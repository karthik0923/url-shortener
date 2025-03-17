import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ShortId() {
    const router = useRouter();
    const { shortId } = router.query;
    const [ url, setUrl ] = useState("");

    useEffect(() => {
        if (shortId) {
            setUrl(localStorage.getItem(shortId));
        }
    }, [shortId]);

    useEffect(() => {
        if (url) {
            window.location.href = url;
        } else {
            router.push("/");
        }
    })

    return null;
}
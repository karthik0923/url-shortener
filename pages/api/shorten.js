import { nanoid } from "nanoid";

const urlDatabase = {};

export default function shorten(req, res) {
    if (req.method == "POST") {
        const { url } = req.body;
        const id = nanoid(6);
        urlDatabase[id] = url;
        res.status(201).json({ id });
    } else {
        res.status(405).json({ error : "Method not allowed "});
    }
}
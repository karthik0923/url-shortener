"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clipboard, ClipboardCheck } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const shortenUrl = async () => {
    const response = await fetch("api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    setShortenedUrl(`${window.location.origin}/${data.id}`);
    localStorage.setItem(data.id, url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500); // Reset after 1.5 seconds
  };

  return (
    <div className="grid grid-cols-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-10 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Animated Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-extrabold text-center text-gray-900 tracking-tight"
      >
        Karthik<span className="text-blue-600">Short</span>
      </motion.h1>

      {/* Animated Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="text-lg text-center text-gray-600 mt-0"
      >
        URL Shortener
      </motion.p>

      {/* Animated Input Field */}
      <motion.input
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        type="text"
        value={url}
        onChange={handleUrlChange}
        className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your URL"
      />

      {/* Animated Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        onClick={shortenUrl}
        className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
      >
        Shorten
      </motion.button>

      {/* Display Shortened URL with Copy Button */}
      {shortenedUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          className="mt-6 flex items-center gap-4 p-4 bg-gray-800 rounded-lg"
        >
          <span className="text-lg text-blue-400">{shortenedUrl}</span>

          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-300"
          >
            {copied ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
          </button>
        </motion.div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';

export default function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (e) {
            console.error('No se pudo copiar', e);
        }
    };
    return (
        <button
            type="button"
            onClick={handleCopy}
            title="Copiar ID"
            style={{ marginLeft: '6px', cursor: 'pointer', border: 'none', background: 'transparent' }}
        >
            {copied ? '✓' : '📋'}
        </button>
    );
}

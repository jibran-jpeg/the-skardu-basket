import React from 'react';
import { Helmet } from 'react-helmet-async';
import { storeConfig } from '../store.config';

export function SEO({ title, description, image, url }) {
    const siteName = storeConfig.name;
    const defaultDescription = "Purest gifts from the Himalayas. Certified organic, sustainably harvested, and delivered with care from Skardu.";
    const defaultImage = "https://i.ibb.co/C2J6z0J/og-image.jpg"; // Replace with your actual default OG image
    const siteUrl = window.location.origin;

    const metaTitle = title ? `${title} | ${siteName}` : siteName;
    const metaDescription = description || defaultDescription;
    const metaImage = image || defaultImage;
    const metaUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Helmet>
            {/* Standard Metrics */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={metaUrl} />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    );
}

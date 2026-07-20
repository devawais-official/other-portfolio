"use client";

import React from "react";

interface SchemaMarkupProps {
  type?: "Person" | "Article" | "SoftwareApplication" | "WebSite";
  data: Record<string, any> | Record<string, any>[];
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  let finalSchema;

  if (Array.isArray(data)) {
    finalSchema = data;
  } else {
    finalSchema = {
      "@context": "https://schema.org",
      ...(type ? { "@type": type } : {}),
      ...data,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema) }}
    />
  );
}
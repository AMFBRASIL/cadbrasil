import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product" | "service";
  twitterCard?: "summary" | "summary_large_image";
  noIndex?: boolean;
  keywords?: string;
  author?: string;
  jsonLd?: object | object[];
  breadcrumbs?: Array<{ name: string; url: string }>;
  faq?: Array<{ question: string; answer: string }>;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  alternateLanguages?: Array<{ lang: string; url: string }>;
  nextPage?: string;
  prevPage?: string;
}

const SITE_NAME = "CADBRASIL";
const DEFAULT_TITLE = "CADBRASIL - Cadastro SICAF e Consultoria em Licitações";
const DEFAULT_DESCRIPTION = "Cadastre sua empresa no SICAF e participe de licitações em todo o Brasil. Mais de 15 anos de experiência, 10.000+ empresas atendidas e 100% de aprovação.";
const DEFAULT_OG_IMAGE = "https://cadbrasil.com.br/og-image.jpg";
const SITE_URL = "https://cadbrasil.com.br";

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  twitterCard = "summary_large_image",
  noIndex = false,
  keywords = "SICAF, cadastro SICAF, licitações, governo federal, comprasnet, PNCP, cadastramento, renovação SICAF, consultoria licitações, cadastro SICAF online, como fazer cadastro SICAF, renovação SICAF, licitações públicas, compras governamentais, fornecedor governo, cadastro fornecedor federal",
  author = "CADBRASIL",
  jsonLd,
  breadcrumbs,
  faq,
  article,
  alternateLanguages,
  nextPage,
  prevPage,
}: SEOProps) => {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : `${SITE_URL}${canonical || "/"}`;

  // Default Organization JSON-LD (sempre incluído)
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CADBRASIL",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: DEFAULT_DESCRIPTION,
    foundingDate: "2010",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+55-11-2122-0202",
        contactType: "customer service",
        email: "contato@cadbrasil.com.br",
        availableLanguage: ["Portuguese", "pt-BR"],
        areaServed: "BR",
      },
      {
        "@type": "ContactPoint",
        telephone: "+55-11-2122-0202",
        contactType: "technical support",
        email: "suporte@cadbrasil.com.br",
        availableLanguage: ["Portuguese", "pt-BR"],
        areaServed: "BR",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
      addressLocality: "São Paulo",
      addressRegion: "SP",
    },
    sameAs: [
      "https://www.facebook.com/cadbrasil",
      "https://www.linkedin.com/company/cadbrasil",
      "https://www.instagram.com/cadbrasil",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
  };

  // Service JSON-LD (serviço principal)
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Cadastro SICAF e Consultoria em Licitações",
    provider: {
      "@type": "Organization",
      name: "CADBRASIL",
    },
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
    description: "Serviço completo de cadastramento no SICAF (Sistema de Cadastramento Unificado de Fornecedores) e consultoria especializada em licitações públicas federais.",
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
    },
  };

  // BreadcrumbList JSON-LD (se fornecido)
  const breadcrumbJsonLd = breadcrumbs && breadcrumbs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: `${SITE_URL}${crumb.url}`,
        })),
      }
    : null;

  // FAQPage JSON-LD (se fornecido)
  const faqJsonLd = faq && faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  // Article JSON-LD (se fornecido)
  const articleJsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: pageTitle,
        description: description,
        author: {
          "@type": "Organization",
          name: article.author || "CADBRASIL",
        },
        publisher: {
          "@type": "Organization",
          name: "CADBRASIL",
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo.png`,
          },
        },
        datePublished: article.publishedTime,
        dateModified: article.modifiedTime || article.publishedTime,
        articleSection: article.section,
        keywords: article.tags?.join(", "),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
      }
    : null;

  // WebPage JSON-LD (sempre incluído)
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: description,
    url: canonicalUrl,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: "Cadastro SICAF",
    },
  };

  // Combine JSON-LD schemas
  const allJsonLd: object[] = [
    organizationJsonLd,
    serviceJsonLd,
    webPageJsonLd,
  ];

  if (breadcrumbJsonLd) allJsonLd.push(breadcrumbJsonLd);
  if (faqJsonLd) allJsonLd.push(faqJsonLd);
  if (articleJsonLd) allJsonLd.push(articleJsonLd);
  if (jsonLd) {
    if (Array.isArray(jsonLd)) {
      allJsonLd.push(...jsonLd);
    } else {
      allJsonLd.push(jsonLd);
    }
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <meta name="language" content="pt-BR" />
      <meta name="geo.region" content="BR" />
      <meta name="geo.country" content="Brazil" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Alternate Languages */}
      {alternateLanguages?.map((alt) => (
        <link key={alt.lang} rel="alternate" hreflang={alt.lang} href={alt.url} />
      ))}
      <link rel="alternate" hreflang="pt-BR" href={canonicalUrl} />
      <link rel="alternate" hreflang="x-default" href={canonicalUrl} />

      {/* Pagination */}
      {prevPage && <link rel="prev" href={`${SITE_URL}${prevPage}`} />}
      {nextPage && <link rel="next" href={`${SITE_URL}${nextPage}`} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageTitle} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:url" content={canonicalUrl} />

      {/* Article-specific Open Graph tags */}
      {article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@cadbrasil" />
      <meta name="twitter:creator" content="@cadbrasil" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={pageTitle} />

      {/* Mobile Meta Tags */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />

      {/* Theme and Colors */}
      <meta name="theme-color" content="#1E4632" />
      <meta name="msapplication-TileColor" content="#1E4632" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Security */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

      {/* Additional SEO Meta Tags */}
      <meta name="application-name" content={SITE_NAME} />
      <meta name="apple-itunes-app" content="app-id=APP_ID" />
      <meta name="google-site-verification" content="" />
      <meta name="yandex-verification" content="" />
      <meta name="msvalidate.01" content="" />

      {/* JSON-LD Structured Data */}
      {allJsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;

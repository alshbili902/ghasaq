import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { ArticleReader } from "@/components/library/ArticleReader";
import {
  articles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/content/articles";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "المقال غير موجود",
    };
  }

  return {
    title: `${article.title} — عالم سوسو الأدبي`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | إلى سوسو`,
      description: article.excerpt,
      type: "article",
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article, 2);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <BackNavigation
        backHref="/library"
        backLabel="العودة إلى المكتبة الأدبية"
        activeSection="library"
      />
      <main className="flex-1">
        <ArticleReader article={article} relatedArticles={related} />
      </main>
    </div>
  );
}

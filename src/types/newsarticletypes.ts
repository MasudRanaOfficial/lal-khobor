export interface FragmentModel {
  text: string;
  attributes: unknown[];
}

export interface ParagraphFragmentBlock {
  type: "fragment";
  model: FragmentModel;
}

export interface ParagraphModel {
  text: string;
  blocks: ParagraphFragmentBlock[];
}

export interface ParagraphBlock {
  type: "paragraph";
  model: ParagraphModel;
}

export interface DescriptionBlockModel {
  blocks: ParagraphBlock[];
}

export interface DescriptionRootBlock {
  type: "text";
  model: DescriptionBlockModel;
}

export interface Description {
  blocks: DescriptionRootBlock[];
}

export interface Byline {
  name: string;
  role: string;
}

export interface Topic {
  id: string;
  name: string;
}

export interface BodyImageBlock {
  type: "image";
  url: string;
  width: number;
  height: number;
  caption: string;
  altText: string;
  copyrightHolder: string;
}

export interface BodyTextBlock {
  type: "text";
  text: string;
}

export interface BodySubheadingBlock {
  type: "subheading";
  text: string;
}

export type BodyBlock = BodyImageBlock | BodyTextBlock | BodySubheadingBlock;

export interface ArticleDetail {
  id: string;
  title: string;
  description: Description;
  link: string;
  firstPublished: string;
  lastPublished: string;
  byline: Byline[];
  topics: Topic[];
  tags: string[];
  imageUrl: string;
  body: BodyBlock[];
  text: string;
  wordCount: number;
  source: string;
  sourceUrl: string;
}

export interface ArticleDetailResponse {
  success: boolean;
  cachedAt: string;
  data: ArticleDetail;
}

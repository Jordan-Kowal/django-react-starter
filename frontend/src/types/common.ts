export type SelectOption = {
  value: string | number;
  label: string;
};

export type MeilisearchSearchResponse<T> = {
  hits: T[];
  query: string;
  offset: number;
  limit: number;
  processingTimeMs: number;
  estimatedTotalHits: number;
  facetDistribution: Record<string, Record<string, number>>;
  facetStats: Record<string, Record<string, number>>;
};

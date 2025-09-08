export interface ScrapeResult {
  price?: number; // change this back to nummber
  domain?: string;
  name?: string;
  module: string;
  success: boolean;
  errorMessage?: string;
}

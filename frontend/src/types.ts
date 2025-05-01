export interface AnalysisResult {
  score: number;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  missing_keywords: string[];
  extracted_text: string;
} 
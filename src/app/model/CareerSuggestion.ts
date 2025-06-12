export default class CareerSuggestion {
  id?: number;
  title: string; // ✅ Correct spelling
  matchPercentage: number;
  suggestionReason: string;
  relevantSkills: string[];

  constructor(
    id: number,
    title: string,
    matchPercentage: number,
    suggestionReason: string,
    relevantSkills: string[]
  ) {
    this.id = id;
    this.title = title; // ✅ Consistent with property name
    this.matchPercentage = matchPercentage;
    this.suggestionReason = suggestionReason;
    this.relevantSkills = relevantSkills;
  }
}

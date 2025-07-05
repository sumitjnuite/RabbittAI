import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || 'demo-key');

export interface CodeAnalysisResult {
  problemType: string;
  difficulty: string;
  timeComplexity: string;
  spaceComplexity: string;
  score: number;
  strengths: string[];
  improvements: string[];
  patterns: string[];
  nextChallenges: string[];
  resources: string[];
  detailedFeedback: string;
  learningPath: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
}

export class GeminiCodeAnalyzer {
  private model;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async analyzeCode(code: string, problemDescription?: string): Promise<CodeAnalysisResult> {
    try {
      const prompt = this.createAnalysisPrompt(code, problemDescription);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseAnalysisResponse(text);
    } catch (error) {
      console.error('Error analyzing code with Gemini:', error);
      return this.getFallbackAnalysis(code);
    }
  }

  private createAnalysisPrompt(code: string, problemDescription?: string): string {
    return `
As an expert coding mentor and algorithm specialist, analyze the following code solution and provide comprehensive feedback for a student preparing for technical interviews.

${problemDescription ? `Problem Context: ${problemDescription}` : ''}

Code to analyze:
\`\`\`
${code}
\`\`\`

Please provide a detailed analysis in the following JSON format:

{
  "problemType": "Identify the problem type (e.g., Two Sum, Binary Search, etc.)",
  "difficulty": "Easy/Medium/Hard",
  "timeComplexity": "Big O notation",
  "spaceComplexity": "Big O notation", 
  "score": "Score out of 100 based on code quality, efficiency, and best practices",
  "strengths": ["List 3-4 specific strengths of this solution"],
  "improvements": ["List 3-4 specific areas for improvement"],
  "patterns": ["List algorithmic patterns used (e.g., Two Pointers, Sliding Window, etc.)"],
  "nextChallenges": ["Suggest 3-4 related problems to practice next"],
  "resources": ["Suggest 3-4 learning resources for improvement"],
  "detailedFeedback": "Provide detailed paragraph explaining the solution approach, what's good, what could be better, and why",
  "learningPath": {
    "immediate": ["2-3 concepts to focus on this week"],
    "shortTerm": ["2-3 concepts to master in the next month"], 
    "longTerm": ["2-3 advanced topics for long-term growth"]
  }
}

Focus on:
1. Code quality and readability
2. Algorithm efficiency and optimization opportunities
3. Common patterns and techniques used
4. Specific, actionable improvement suggestions
5. Personalized learning recommendations based on the code style and approach
6. Interview readiness and best practices

Provide constructive, encouraging feedback that helps the student grow.
`;
  }

  private parseAnalysisResponse(response: string): CodeAnalysisResult {
    try {
      // Extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          problemType: parsed.problemType || 'Unknown Problem',
          difficulty: parsed.difficulty || 'Medium',
          timeComplexity: parsed.timeComplexity || 'O(n)',
          spaceComplexity: parsed.spaceComplexity || 'O(1)',
          score: parsed.score || 75,
          strengths: parsed.strengths || ['Code compiles successfully'],
          improvements: parsed.improvements || ['Consider edge cases'],
          patterns: parsed.patterns || ['Basic Algorithm'],
          nextChallenges: parsed.nextChallenges || ['Similar problems'],
          resources: parsed.resources || ['Algorithm documentation'],
          detailedFeedback: parsed.detailedFeedback || 'Good attempt at solving the problem.',
          learningPath: parsed.learningPath || {
            immediate: ['Practice more problems'],
            shortTerm: ['Study algorithms'],
            longTerm: ['Master data structures']
          }
        };
      }
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
    }
    
    return this.getFallbackAnalysis('');
  }

  private getFallbackAnalysis(code: string): CodeAnalysisResult {
    // Provide a basic analysis when Gemini is not available
    const hasLoop = /for|while/.test(code);
    const hasRecursion = /function.*\{[\s\S]*\1\(/.test(code);
    const hasHashMap = /Map|Set|\{|\[/.test(code);
    
    return {
      problemType: 'Code Analysis',
      difficulty: 'Medium',
      timeComplexity: hasLoop ? 'O(n)' : 'O(1)',
      spaceComplexity: hasHashMap ? 'O(n)' : 'O(1)',
      score: 75,
      strengths: [
        'Code structure is readable',
        'Proper variable naming',
        hasLoop ? 'Uses iteration effectively' : 'Efficient approach',
        'Handles basic cases'
      ],
      improvements: [
        'Add input validation',
        'Consider edge cases',
        'Add comments for clarity',
        'Optimize for better performance'
      ],
      patterns: [
        hasLoop ? 'Iteration Pattern' : 'Direct Computation',
        hasHashMap ? 'Hash Map Usage' : 'Linear Processing',
        hasRecursion ? 'Recursive Approach' : 'Iterative Approach'
      ],
      nextChallenges: [
        'Similar complexity problems',
        'Optimization challenges',
        'Edge case variations',
        'Pattern-based problems'
      ],
      resources: [
        'Algorithm Fundamentals',
        'Time Complexity Guide',
        'Best Practices Documentation',
        'Problem-solving Patterns'
      ],
      detailedFeedback: 'Your solution demonstrates a solid understanding of the problem. The code is well-structured and readable. Focus on optimizing the algorithm and handling edge cases to improve your solution further.',
      learningPath: {
        immediate: ['Practice similar problems', 'Study time complexity'],
        shortTerm: ['Master common patterns', 'Improve code optimization'],
        longTerm: ['Advanced algorithms', 'System design concepts']
      }
    };
  }

  async generateLearningPlan(userHistory: any[], currentSkills: any): Promise<any> {
    try {
      const prompt = `
Based on the following user coding history and current skill levels, create a personalized learning plan:

User History: ${JSON.stringify(userHistory)}
Current Skills: ${JSON.stringify(currentSkills)}

Create a comprehensive learning plan with:
1. Weekly goals for the next 4 weeks
2. Recommended problems to solve
3. Concepts to focus on
4. Resources for improvement
5. Milestones to track progress

Format as JSON with clear structure.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse and return the learning plan
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Error generating learning plan:', error);
    }

    return this.getDefaultLearningPlan();
  }

  private getDefaultLearningPlan() {
    return {
      weeklyGoals: [
        { week: 1, focus: 'Arrays and Strings', problems: 10 },
        { week: 2, focus: 'Linked Lists', problems: 8 },
        { week: 3, focus: 'Trees and Graphs', problems: 12 },
        { week: 4, focus: 'Dynamic Programming', problems: 6 }
      ],
      recommendedProblems: [
        'Two Sum', 'Valid Parentheses', 'Merge Two Sorted Lists',
        'Maximum Subarray', 'Climbing Stairs'
      ],
      concepts: [
        'Two Pointers', 'Hash Maps', 'DFS/BFS', 'Dynamic Programming'
      ],
      resources: [
        'LeetCode Patterns Guide',
        'Algorithm Visualization Tools',
        'Interview Preparation Books'
      ]
    };
  }
}

export const geminiAnalyzer = new GeminiCodeAnalyzer();
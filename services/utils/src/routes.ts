import dotenv from "dotenv";
import express from "express";
import cloudinary from "cloudinary";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const router = express.Router();

const geminiApiKey = process.env.API_KEY_GEMINI;

if (!geminiApiKey) {
  throw new Error("Missing API_KEY_GEMINI");
}

const ai = new GoogleGenAI({ apiKey: geminiApiKey });

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Unknown error";

const parseModelJson = (text: string | undefined) => {
  const rawText = text
    ?.replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  if (!rawText) {
    throw new Error("AI did not return any text");
  }

  return JSON.parse(rawText);
};

router.post("/upload", async (req, res) => {
  try {
    const { buffer, public_id } = req.body as {
      buffer?: string;
      public_id?: string;
    };

    if (!buffer) {
      return res.status(400).json({
        message: "File buffer is required",
      });
    }

    if (public_id) {
      await cloudinary.v2.uploader.destroy(public_id);
    }

    const fileData = buffer.startsWith("data:")
      ? buffer
      : `data:application/pdf;base64,${buffer}`;

    const cloud = await cloudinary.v2.uploader.upload(fileData, {
      resource_type: "raw",
    });

    return res.json({
      url: cloud.secure_url,
      public_id: cloud.public_id,
    });
  } catch (error: unknown) {
    console.log("CLOUDINARY ERROR =>");
    console.log(error);

    return res.status(500).json({
      message: getErrorMessage(error),
      fullError: error,
    });
  }
});

router.post("/career", async (req, res) => {
  try {
    const { skills } = req.body as {
      skills?: string[] | string;
    };

    if (!skills || (Array.isArray(skills) && skills.length === 0)) {
      return res.status(400).json({
        message: "Skills are required",
      });
    }

    const skillText = Array.isArray(skills) ? skills.join(", ") : skills;

    const prompt = `
Based on the following skills: ${skillText}.

Please act as a career advisor and generate a career path suggestion.

Your entire response must be in a valid JSON format. Do not include any text or markdown formatting outside of the JSON structure.

The JSON object should have the following structure:

{
  "summary": "A brief, encouraging summary of the user's skill set and their general job title.",
  "jobOptions": [
    {
      "title": "The name of the job role.",
      "responsibilities": "A description of what the user would do in this role.",
      "why": "An explanation of why this role is a good fit for their skills."
    }
  ],
  "skillsToLearn": [
    {
      "category": "A general category for skill improvement",
      "skills": [
        {
          "title": "The name of the skill to learn.",
          "why": "Why learning this skill is important.",
          "how": "Specific examples of how to learn or apply this skill."
        }
      ]
    }
  ],
  "learningApproach": {
    "title": "How to Approach Learning",
    "points": [
      "A bullet point list of actionable advice for learning."
    ]
  }
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    try {
      const jsonResponse = parseModelJson(response.text);
      return res.json(jsonResponse);
    } catch (error: unknown) {
      return res.status(500).json({
        message: "AI returned response that was not valid JSON",
        rawResponse: response.text,
      });
    }
  } catch (error: unknown) {
    return res.status(500).json({
      message: getErrorMessage(error),
    });
  }
});

router.post("/resume-analyser", async (req, res) => {
  try {
    const { pdfBase64 } = req.body as {
      pdfBase64?: string;
    };

    if (!pdfBase64) {
      return res.status(400).json({
        message: "PDF data is required",
      });
    }

    const prompt = `
You are an expert ATS (Applicant Tracking System) analyzer. Analyze the following resume and provide:
1. An ATS compatibility score (0-100)
2. Detailed suggestions to improve the resume for better ATS performance

Your entire response must be in valid JSON format. Do not include any text or markdown formatting outside of the JSON structure.

The JSON object should have the following structure:
{
  "atsScore": 85,
  "scoreBreakdown": {
    "formatting": {
      "score": 90,
      "feedback": "Brief feedback on formatting"
    },
    "keywords": {
      "score": 80,
      "feedback": "Brief feedback on keyword usage"
    },
    "structure": {
      "score": 85,
      "feedback": "Brief feedback on resume structure"
    },
    "readability": {
      "score": 88,
      "feedback": "Brief feedback on readability"
    }
  },
  "suggestions": [
    {
      "category": "Category name (e.g., 'Formatting', 'Content', 'Keywords', 'Structure')",
      "issue": "Description of the issue found",
      "recommendation": "Specific actionable recommendation to fix it",
      "priority": "high/medium/low"
    }
  ],
  "strengths": [
    "List of things the resume does well for ATS"
  ],
  "summary": "A brief 2-3 sentence summary of the overall ATS performance"
}

Focus on:
- File format and structure compatibility
- Proper use of standard section headings
- Keyword optimization
- Formatting issues (tables, columns, graphics, special characters)
- Contact information placement
- Date formatting
- Use of action verbs and quantifiable achievements
- Section organization and flow
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: pdfBase64.replace(/^data:application\/pdf;base64,/, ""),
              },
            },
          ],
        },
      ],
    });

    try {
      const jsonResponse = parseModelJson(response.text);
      return res.json(jsonResponse);
    } catch (error: unknown) {
      return res.status(500).json({
        message: "AI returned response that was not valid JSON",
        rawResponse: response.text,
      });
    }
  } catch (error: unknown) {
    return res.status(500).json({
      message: getErrorMessage(error),
    });
  }
});

export default router;

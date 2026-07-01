import { Type } from "@google/genai";

const sectionSchema = (description) => ({
    type: Type.OBJECT,
    description,
    properties: {
        score: {
            type: Type.INTEGER,
            description: "Score from 0 to 100",
        },
        reason: {
            type: Type.STRING,
            description: "Reason for the score",
        },
        evidence: {
            type: Type.ARRAY,
            description: "Evidence found on the landing page",
            items: {
                type: Type.STRING,
            },
        },
    },
});


export const geminiResponseSchema = {
    type: Type.OBJECT,
    properties: {
        overallScore: {
            type: Type.INTEGER,
            description: "Overall ad-to-landing page match score (0-100).",
        },

        verdict: {
            type: Type.STRING,
            description:
                "One of: Excellent, Good, Average, Poor.",
        },

        summary: {
            type: Type.STRING,
            description:
                "2-3 sentence executive summary explaining the overall analysis.",
        },

        sections: {
            type: Type.OBJECT,
            properties: {

                persona: sectionSchema(
                    "How well the landing page matches the audience targeted by the ad."
                ),

                headline: sectionSchema(
                    "Does the landing page headline continue the ad's message?"
                ),

                offer: sectionSchema(
                    "Does the landing page clearly deliver the advertised offer?"
                ),

                valueProposition: sectionSchema(
                    "Are the core benefits and value proposition clearly communicated?"
                ),

                proof: sectionSchema(
                    "Are there trust signals like testimonials, reviews, certifications, or statistics?"
                ),

                objections: sectionSchema(
                    "Does the page address common customer concerns or objections?"
                ),

                cta: sectionSchema(
                    "Is the call-to-action clear, compelling, and aligned with the ad?"
                ),

                urgency: sectionSchema(
                    "Does the page create urgency or scarcity when appropriate?"
                ),
            },
        },

        strengths: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
            },
            description: "Top strengths of the landing page.",
        },

        weaknesses: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
            },
            description: "Top weaknesses found.",
        },

        recommendations: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    priority: {
                        type: Type.STRING,
                        description: "High | Medium | Low",
                    },

                    title: {
                        type: Type.STRING,
                    },

                    impact: {
                        type: Type.STRING,
                        description: "High | Medium | Low",
                    },

                    effort: {
                        type: Type.STRING,
                        description: "Low | Medium | High",
                    },

                    confidence: {
                        type: Type.STRING,
                        description: "High | Medium | Low",
                    },

                    reason: {
                        type: Type.STRING,
                    },

                    experiment: {
                        type: Type.STRING,
                        description:
                            "Suggested A/B test or CRO experiment.",
                    },
                },
            },
        },
    },
};


export const promptService = (ad, landingPage) => {
    return `You are a Senior Conversion Rate Optimization (CRO) Expert with experience in eCommerce, paid advertising, UX, and landing page optimization.
Your job is to compare an advertisement : ${ad}  with its landing page : ${landingPage}  and determine how well the landing page fulfills the promise made in the advertisement.
Your analysis must be evidence-based. Never make assumptions that are not supported by the provided landing page content.
If information is missing from the landing page, explicitly state that it was not found instead of inventing details.
Evaluate the landing page from the perspective of a first-time visitor.
Return ONLY valid JSON following the provided schema. `
}

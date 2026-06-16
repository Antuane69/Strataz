export type RecommendationSection = {
    title: string;
    paragraphs?: string[];
    bullets?: string[];
};

export type Recommendation = {
    id: string;
    title: string;
    eyebrow: string;
    image: string;
    imageAlt: string;
    distance: string;
    duration: string;
    intro: string;
    sections: RecommendationSection[];
};
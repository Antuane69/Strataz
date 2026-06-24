import type { ReactNode } from 'react';

export type SportItem = {
    name: string;
    count: number;
    icon: ReactNode;
};

export type FeaturedMatch = {
    league: string;
    time: string;
    leftName: string;
    rightName: string;
    leftImage: string;
    rightImage: string;
    odds: string[];
    confidence: number;
    trend: 'Al alza' | 'Estable' | 'A la baja';
};

export type LiveMatch = {
    league: string;
    leftName: string;
    rightName: string;
    score: string;
    time: string;
    quickStatLabel: string;
    leftStat: number;
    rightStat: number;
};

export type HighlightStat = {
    title: string;
    subtitle?: string;
    rows: {
        name: string;
        image: string;
        value: string;
        percent: number;
    }[];
};

export type DashboardData = {
    sports: SportItem[];
    featuredMatches: FeaturedMatch[];
    liveMatches: LiveMatch[];
    highlightStats: HighlightStat[];
    pickOfDay: {
        league: string;
        time: string;
        title: string;
        confidence: number;
        reasons: string[];
    };
    trends: string[];
    communityPicks: {
        title: string;
        odd: string;
        percent: number;
        change: string;
    }[];
};

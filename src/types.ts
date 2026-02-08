export type FeedspotStatus = 'ok' | 'needs_attention';

export interface Feedspot {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  photos: string[];
  status: FeedspotStatus;
  lastFilledAt?: string;
}

export interface ReportForm {
  reason: 'Quebrado' | 'Sujo' | 'Perigoso' | 'Outro';
  notes: string;
}

export interface Testimonial {
    id: number;
    slug: string;
    clientName: string;
    clientRole: string;
    clientImage: string;
    rating: number;
    verified: boolean;
    appUrl: string;
    message: string;
}
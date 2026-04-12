export interface GetNewsletterDTO {
    id: number;
    title: string;
    slug: string;
    author: string;
    image_path: string | null;
    short_description: string;
    story_text: string;
    created_at: Date;
    updated_at: Date;
}
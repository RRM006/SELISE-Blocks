export interface UserProfile {
  ItemId?: string;
  userId: string;
  username: string;
  displayName: string;
  headline: string;
  bio: string;
  profileImageUrl: string;
  headerImageUrl: string;
  linkedInUrl: string;
  githubUrl: string;
  portfolioUrl: string;
}

export interface UserProfileInput {
  ItemId?: string;
  userId: string;
  username: string;
  displayName: string;
  headline: string;
  bio: string;
  profileImageUrl?: string;
  headerImageUrl?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
}

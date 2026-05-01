import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPublicProfile } from '@/modules/profile-editor/services/profile.service';
import { UserProfile } from '@/types/profile';
import { Linkedin, Github, Globe, ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!username) return;

    const loadProfile = async () => {
      try {
        const data = await getPublicProfile(username);
        if (data) {
          setProfile(data);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground">Profile not found</p>
        <Link to="/" className="text-blue-500 hover:underline flex items-center gap-2">
          <ArrowLeft size={16} />
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Image */}
      {profile.headerImageUrl && (
        <div className="w-full h-64 bg-gray-200">
          <img
            src={profile.headerImageUrl}
            alt="Header"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-10">
        {/* Profile Card */}
        <div className="bg-card rounded-lg shadow-lg p-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center -mt-20 mb-6">
            {profile.profileImageUrl ? (
              <img
                src={profile.profileImageUrl}
                alt={profile.displayName}
                className="w-32 h-32 rounded-full border-4 border-background object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-background bg-gray-300 flex items-center justify-center">
                <span className="text-4xl text-gray-600">
                  {profile.displayName?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>

          {/* Name & Headline */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">{profile.displayName || 'Unnamed User'}</h1>
            {profile.headline && (
              <p className="text-muted-foreground mt-2 text-lg">{profile.headline}</p>
            )}
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">{profile.bio}</p>
            </div>
          )}

          {/* Social Links */}
          {(profile.linkedInUrl || profile.githubUrl || profile.portfolioUrl) && (
            <div className="flex justify-center gap-4 mt-6">
              {profile.linkedInUrl && (
                <a
                  href={profile.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
              )}
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
              )}
              {profile.portfolioUrl && (
                <a
                  href={profile.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                >
                  <Globe size={20} />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pb-8">
          <p className="text-sm text-muted-foreground">
            Powered by <span className="font-semibold">ProfileForge</span>
          </p>
        </div>
      </div>
    </div>
  );
}

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
      {profile.headerImageUrl ? (
        <div className="w-full h-48 md:h-64 bg-gray-200 relative">
          <img
            src={profile.headerImageUrl}
            alt="Header"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ) : (
        <div className="w-full h-48 md:h-64 bg-gradient-to-r from-blue-500 to-purple-600" />
      )}

      <div className="max-w-4xl mx-auto px-6 relative -mt-16 md:-mt-20">
        {/* Profile Card */}
        <div className="bg-card rounded-xl shadow-xl p-6 md:p-8 border">
          {/* Profile Picture */}
          <div className="flex flex-col items-center -mt-16 mb-6">
            {profile.profileImageUrl ? (
              <img
                src={profile.profileImageUrl}
                alt={profile.displayName}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background object-cover shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center shadow-lg">
                <span className="text-4xl md:text-5xl text-white font-bold">
                  {profile.displayName?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>

          {/* Name & Headline */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold">{profile.displayName || 'Unnamed User'}</h1>
            {profile.headline && (
              <p className="text-muted-foreground mt-2 text-lg">{profile.headline}</p>
            )}
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">About</h2>
              <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{profile.bio}</p>
            </div>
          )}

          {/* Social Links */}
          {(profile.linkedInUrl || profile.githubUrl || profile.portfolioUrl) && (
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {profile.linkedInUrl && (
                <a
                  href={profile.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md"
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
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-md"
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
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors shadow-md"
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
            Powered by <span className="font-semibold text-primary">ProfileForge</span>
          </p>
        </div>
      </div>
    </div>
  );
}

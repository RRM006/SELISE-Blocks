import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/state/store/auth';
import { getMyProfile, createProfile, updateProfile } from '@/modules/profile-editor/services/profile.service';
import ImageUpload from '@/components/ImageUpload';
import SocialLinkInput from '@/components/SocialLinkInput';
import { Button } from '@/components/ui-kit/button';
import { Input } from '@/components/ui-kit/input';
import { Label } from '@/components/ui-kit/label';
import { Textarea } from '@/components/ui-kit/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-kit/card';
import { UserProfile, UserProfileInput } from '@/types/profile';

// Helper to decode JWT and get user ID (sub claim)
function getUserIdFromToken(token: string): string {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    return payload.sub || '';
  } catch {
    return '';
  }
}

export default function EditorPage() {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    headline: '',
    bio: '',
    profileImageUrl: '',
    headerImageUrl: '',
    linkedInUrl: '',
    githubUrl: '',
    portfolioUrl: '',
  });

  const userId = accessToken ? getUserIdFromToken(accessToken) : '';

  useEffect(() => {
    if (!userId) return;

    const loadProfile = async () => {
      try {
        const existing = await getMyProfile(userId);
        if (existing) {
          setProfile(existing);
          setFormData({
            username: existing.username || '',
            displayName: existing.displayName || '',
            headline: existing.headline || '',
            bio: existing.bio || '',
            profileImageUrl: existing.profileImageUrl || '',
            headerImageUrl: existing.headerImageUrl || '',
            linkedInUrl: existing.linkedInUrl || '',
            githubUrl: existing.githubUrl || '',
            portfolioUrl: existing.portfolioUrl || '',
          });
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    if (!userId) return;

    setSaving(true);
    try {
      if (profile?.ItemId) {
        // Update existing profile
        await updateProfile(
          { ItemId: { eq: profile.ItemId } },
          {
            ...formData,
            userId,
          }
        );
      } else {
        // Create new profile
        const result = await createProfile({
          ...formData,
          userId,
        });
        // Reload profile to get the ItemId
        const newProfile = await getMyProfile(userId);
        setProfile(newProfile);
      }
      alert('Profile saved successfully!');
    } catch (err: any) {
      alert('Failed to save profile: ' + (err.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const publicUrl = formData.username
    ? `${window.location.origin}/profile/${formData.username}`
    : '';

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Profile Editor</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {publicUrl && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Your public profile URL:</p>
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline break-all"
              >
                {publicUrl}
              </a>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username (for public URL)</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  placeholder="your-username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={formData.displayName}
                  onChange={(e) => handleChange('displayName', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                value={formData.headline}
                onChange={(e) => handleChange('headline', e.target.value)}
                placeholder="Software Engineer at XYZ"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ImageUpload
                currentUrl={formData.profileImageUrl}
                onUpload={(url) => handleChange('profileImageUrl', url)}
                label="Profile Picture"
              />
              <ImageUpload
                currentUrl={formData.headerImageUrl}
                onUpload={(url) => handleChange('headerImageUrl', url)}
                label="Header Image"
              />
            </div>

            <SocialLinkInput
              linkedIn={formData.linkedInUrl}
              github={formData.githubUrl}
              portfolio={formData.portfolioUrl}
              onChange={handleChange}
            />

            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? 'Saving...' : 'Save Profile'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

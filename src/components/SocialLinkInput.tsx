import { Input } from '@/components/ui-kit/input';
import { Label } from '@/components/ui-kit/label';
import { Linkedin, Github, Globe } from 'lucide-react';

interface SocialLinkInputProps {
  linkedIn: string;
  github: string;
  portfolio: string;
  onChange: (field: string, value: string) => void;
}

export default function SocialLinkInput({
  linkedIn,
  github,
  portfolio,
  onChange,
}: SocialLinkInputProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="linkedin" className="flex items-center gap-2">
          <Linkedin size={16} />
          LinkedIn URL
        </Label>
        <Input
          id="linkedin"
          type="url"
          placeholder="https://linkedin.com/in/yourprofile"
          value={linkedIn}
          onChange={(e) => onChange('linkedInUrl', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="github" className="flex items-center gap-2">
          <Github size={16} />
          GitHub URL
        </Label>
        <Input
          id="github"
          type="url"
          placeholder="https://github.com/yourusername"
          value={github}
          onChange={(e) => onChange('githubUrl', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="portfolio" className="flex items-center gap-2">
          <Globe size={16} />
          Portfolio URL
        </Label>
        <Input
          id="portfolio"
          type="url"
          placeholder="https://yourportfolio.com"
          value={portfolio}
          onChange={(e) => onChange('portfolioUrl', e.target.value)}
        />
      </div>
    </div>
  );
}

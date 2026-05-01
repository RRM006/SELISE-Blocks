import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin, signupByEmail } from '@/modules/auth/services/auth.service';
import { useAuthStore } from '@/state/store/auth';
import { Button } from '@/components/ui-kit/button';
import { Input } from '@/components/ui-kit/input';
import { Label } from '@/components/ui-kit/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-kit/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui-kit/tabs';

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [signinData, setSigninData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await signin({
        grantType: 'password',
        username: signinData.username,
        password: signinData.password,
      });

      if (response.access_token) {
        login(response.access_token, response.refresh_token);
        navigate('/editor');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signupByEmail({
        ...signupData,
        grantType: 'password',
      });

      // Auto-login after signup
      const signinResponse = await signin({
        grantType: 'password',
        username: signupData.email,
        password: signupData.password,
      });

      if (signinResponse.access_token) {
        login(signinResponse.access_token, signinResponse.refresh_token);
        navigate('/editor');
      }
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo & Title */}
        <div className="text-center">
          <img 
            src="/selise_logo_small.svg" 
            alt="ProfileForge" 
            className="h-12 w-auto mx-auto mb-4 brightness-0 invert" 
          />
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to ProfileForge</h1>
          <p className="text-blue-100">Build your universal profile in minutes</p>
        </div>

        {/* Login Card */}
        <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center text-gray-800">Get Started</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-gray-700">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={signinData.username}
                      onChange={(e) => setSigninData({ ...signinData, username: e.target.value })}
                      placeholder="name@example.com"
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-gray-700">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={signinData.password}
                      onChange={(e) => setSigninData({ ...signinData, password: e.target.value })}
                      placeholder="Enter your password"
                      required
                      className="h-11"
                    />
                  </div>
                  {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
                  <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-firstName" className="text-gray-700">First Name</Label>
                      <Input
                        id="signup-firstName"
                        value={signupData.firstName}
                        onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                        placeholder="John"
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-lastName" className="text-gray-700">Last Name</Label>
                      <Input
                        id="signup-lastName"
                        value={signupData.lastName}
                        onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                        placeholder="Doe"
                        required
                        className="h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-700">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      placeholder="name@example.com"
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-700">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      placeholder="Create a strong password"
                      required
                      className="h-11"
                    />
                  </div>
                  {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
                  <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700" disabled={loading}>
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-blue-100">
          Powered by <span className="font-semibold">Selise Blocks</span>
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/lib/axios';
import { Activity, Loader2, Heart, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

const MentalHealth = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnalysis(null);

    try {
      const response = await axiosInstance.post('/mental_health/analyze', { text });
      setAnalysis(response.data);
      
      toast({
        title: 'Analysis complete',
        description: 'Your mental health assessment is ready',
      });
    } catch (error: any) {
      toast({
        title: 'Analysis failed',
        description: error.response?.data?.detail || 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return 'text-success-green';
      case 'negative':
        return 'text-destructive';
      default:
        return 'text-warning-amber';
    }
  };

  const getWellnessScore = () => {
    if (!analysis?.score) return 0;
    return Math.round(analysis.score);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div>
          <h2 className="text-3xl font-bold mb-2">Mental Health Analysis</h2>
          <p className="text-muted-foreground">AI-powered emotional wellbeing assessment</p>
        </div>

        <Alert>
          <Heart className="h-4 w-4" />
          <AlertTitle>Confidential & Supportive</AlertTitle>
          <AlertDescription>
            This is a private space for self-reflection. Our AI analyzes your text to provide insights, 
            but please seek professional help if you're experiencing mental health concerns.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Express Your Feelings
            </CardTitle>
            <CardDescription>
              Write about how you're feeling, your thoughts, or recent experiences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text">Your Thoughts</Label>
                <Textarea
                  id="text"
                  placeholder="I've been feeling... Today was difficult because... I'm worried about..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  disabled={loading}
                  rows={8}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Be honest and open. The more you share, the better insights you'll receive.
                </p>
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Activity className="mr-2 h-4 w-4" />
                    Analyze Mental State
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {analysis && (
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardHeader>
              <CardTitle className="text-primary">Analysis Results</CardTitle>
              <CardDescription>Your emotional wellbeing assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {analysis.sentiment && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Overall Sentiment</h3>
                    <span className={`text-xl font-bold ${getSentimentColor(analysis.sentiment)}`}>
                      {analysis.sentiment}
                    </span>
                  </div>
                </div>
              )}

              {analysis.score !== undefined && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Wellbeing Score</h3>
                    <span className="text-xl font-bold text-primary">{getWellnessScore()}/100</span>
                  </div>
                  <Progress value={getWellnessScore()} className="h-3" />
                </div>
              )}

              {analysis.emotions && Array.isArray(analysis.emotions) && (
                <div>
                  <h3 className="font-semibold mb-3">Detected Emotions</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.emotions.map((emotion: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {emotion}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {analysis.recommendations && (
                <div>
                  <h3 className="font-semibold mb-2">Recommendations</h3>
                  <div className="bg-card rounded-lg p-4">
                    <p className="text-muted-foreground">{analysis.recommendations}</p>
                  </div>
                </div>
              )}

              {analysis.summary && (
                <div>
                  <h3 className="font-semibold mb-2">Summary</h3>
                  <div className="bg-card rounded-lg p-4">
                    <p className="text-muted-foreground">{analysis.summary}</p>
                  </div>
                </div>
              )}

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  If you're experiencing persistent mental health concerns, please reach out to a mental health professional. 
                  You can also call the National Suicide Prevention Lifeline at 988 for immediate support.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MentalHealth;

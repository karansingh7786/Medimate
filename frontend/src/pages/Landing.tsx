import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Activity, Brain, MessageSquare, Pill, Calendar, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: 'Book Appointments',
      description: 'Schedule appointments with doctors easily',
    },
    {
      icon: Brain,
      title: 'AI Disease Prediction',
      description: 'Get instant disease predictions from symptoms',
    },
    {
      icon: MessageSquare,
      title: 'AI Health Chatbot',
      description: 'Chat with our AI for health guidance',
    },
    {
      icon: Pill,
      title: 'Medicine Verification',
      description: 'Check if medicines are genuine',
    },
    {
      icon: Activity,
      title: 'Mental Health Analysis',
      description: 'Analyze and track your mental wellbeing',
    },
    {
      icon: FileText,
      title: 'Digital Prescriptions',
      description: 'Access prescriptions anytime, anywhere',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">MediMate</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button onClick={() => navigate('/register')}>
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Your Complete Healthcare Companion
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            Book appointments, get AI-powered health insights, and manage your healthcare journey—all in one place
          </p>
          <div className="flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Button size="lg" onClick={() => navigate('/register')}>
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <Card className="p-12 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <h2 className="text-3xl font-bold mb-4">Ready to take control of your health?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of patients and doctors using MediMate for better healthcare
            </p>
            <Button size="lg" onClick={() => navigate('/register')}>
              Create Free Account
            </Button>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t">
        <div className="text-center text-muted-foreground">
          <p>© 2024 MediMate. Your health, our priority.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

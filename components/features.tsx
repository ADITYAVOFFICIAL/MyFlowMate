import { Calendar, LineChart, Bell, MessageCircle, Brain, Activity, Baby, Pill as Pills } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Cycle Tracking',
    description: 'Track your cycle length, flow, and ovulation with ease.',
  },
  {
    icon: Activity,
    title: 'Symptom Tracking',
    description: 'Record symptoms, moods, and energy levels throughout your cycle.',
  },
  {
    icon: Baby,
    title: 'Fertility Tracking',
    description: 'Get personalized tips on ovulation and conception.',
  },
  {
    icon: LineChart,
    title: 'Health Reports',
    description: 'Export detailed health reports with charts for your records.',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Never miss tracking your period or taking birth control.',
  },
  {
    icon: MessageCircle,
    title: 'Community Support',
    description: 'Connect with others and share experiences in a safe space.',
  },
  {
    icon: Pills,
    title: 'Product Guidance',
    description: 'Get personalized recommendations for menstrual products.',
  },
  {
    icon: Brain,
    title: 'AI Assistant',
    description: 'Chat with our AI about your health concerns and questions.',
  },
];

export default function Features() {
  return (
    <div className="py-20 bg-muted/50 rounded-3xl my-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Everything You Need in One Place
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="h-10 w-10 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
interface AnimatedBackgroundProps {
  className?: string;
}

export const SplineBackground = ({ className = "" }: AnimatedBackgroundProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-mesh animate-float opacity-60" />
      
      {/* Floating orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" 
             style={{ animationDelay: '0s', animationDuration: '8s' }} />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-accent/15 rounded-full blur-2xl animate-float" 
             style={{ animationDelay: '2s', animationDuration: '12s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-primary/25 rounded-full blur-lg animate-float" 
             style={{ animationDelay: '4s', animationDuration: '10s' }} />
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/30 to-background/60" />
    </div>
  );
};
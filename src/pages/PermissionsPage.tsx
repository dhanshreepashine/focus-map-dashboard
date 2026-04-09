import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Brain, Smartphone, Bell, Shield, ArrowRight, Check } from "lucide-react";

const PermissionsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appUsage, setAppUsage] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    if (user) {
      await supabase
        .from("profiles")
        .update({ permissions_completed: true })
        .eq("user_id", user.id);
    }
    navigate("/");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-up">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Brain className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold">FocusMap</span>
        </div>

        <div className="glass-card p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-1">One more thing</h1>
            <p className="text-sm text-muted-foreground">
              A couple of permissions so your AI coach can help you best. You're always in control.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setAppUsage(!appUsage)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                appUsage
                  ? "border-primary/40 bg-primary/10"
                  : "border-border bg-secondary/50 hover:border-border/80"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  appUsage ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {appUsage ? <Check className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium mb-0.5">App usage access</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Lets us see which apps you use and for how long — so your coach can give personalized tips to help you focus better.
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                notifications
                  ? "border-primary/40 bg-primary/10"
                  : "border-border bg-secondary/50 hover:border-border/80"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  notifications ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {notifications ? <Check className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium mb-0.5">Focus reminders</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We'll send gentle nudges when it's time to take a break or when you're spending too long on distracting apps.
                  </p>
                </div>
              </div>
            </button>
          </div>

          <div className="flex items-start gap-2 mt-5 p-3 rounded-lg bg-muted/50">
            <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Your data never leaves your device without your permission. We don't sell or share your information — ever.
            </p>
          </div>

          <button
            onClick={handleContinue}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all disabled:opacity-50 mt-5"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                Continue to dashboard
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            onClick={handleContinue}
            className="w-full text-center mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionsPage;

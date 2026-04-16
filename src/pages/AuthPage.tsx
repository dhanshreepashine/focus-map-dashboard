import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, ArrowRight, Lock, Shield } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { label: "Central Command", value: "central" },
    { label: "Regional Base", value: "regional" },
    { label: "Divisional HQ", value: "divisional" },
    { label: "Brigade Unit", value: "brigade" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        navigate("/dashboard");
      }
    } else {
      if (!fullName.trim()) {
        setError("Please enter your name");
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, fullName);
      if (error) {
        setError(error.message);
      } else {
        navigate("/dashboard");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-800/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md animate-fade-up relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-2 bg-green-900/30 rounded-lg border border-green-700/50 backdrop-blur-sm">
            <Shield className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-sm uppercase tracking-widest font-bold text-green-400">Military Command</h2>
            <p className="text-xs text-slate-400">Logistics Control System</p>
          </div>
        </div>

        <div className="border border-green-700/30 bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-100 mb-1">
              {isLogin ? "SECURE ACCESS" : "NEW OPERATOR"}
            </h1>
            <p className="text-xs text-slate-400 uppercase tracking-wider">
              {isLogin ? "Enter credentials to proceed" : "Register new personnel"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-xs text-green-400 font-mono mb-1.5 block uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Operator name"
                  className="w-full px-3 py-2.5 rounded border border-slate-700 bg-slate-800/50 text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all"
                />
              </div>
            )}

            <div>
              <label className="text-xs text-green-400 font-mono mb-1.5 block uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@military.mil"
                required
                className="w-full px-3 py-2.5 rounded border border-slate-700 bg-slate-800/50 text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all"
              />
            </div>

            <div>
              <label className="text-xs text-green-400 font-mono mb-1.5 block uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full px-3 py-2.5 rounded border border-slate-700 bg-slate-800/50 text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-green-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="text-xs text-green-400 font-mono mb-2 block uppercase tracking-wider">Assigned Role</label>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setUserRole(userRole === r.value ? "" : r.value)}
                      className={`text-xs px-3 py-2.5 rounded border transition-all font-mono ${
                        userRole === r.value
                          ? "border-green-500 bg-green-500/10 text-green-400"
                          : "border-slate-700 bg-slate-800/30 text-slate-400 hover:border-green-600/50"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 rounded border border-red-900/50 bg-red-950/30 flex gap-2">
                <Lock className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded border border-green-600 bg-green-900/40 hover:bg-green-800/50 text-green-300 font-mono font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? "AUTHORIZE" : "REGISTER"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-5">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(""); }}
              className="text-xs text-slate-400 hover:text-green-400 transition-colors font-mono uppercase tracking-wider"
            >
              {isLogin ? (
                <>NEW OPERATOR? <span className="text-green-400 font-bold">REQUEST ACCESS</span></>
              ) : (
                <>EXISTING OPERATOR? <span className="text-green-400 font-bold">SIGN IN</span></>
              )}
            </button>
          </div>
        </div>

        <div className="text-center mt-4 flex items-center justify-center gap-1 text-[10px] text-slate-500 font-mono">
          <Shield className="w-3 h-3" /> SECURE MILITARY NETWORK
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

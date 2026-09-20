import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/intergration/supabase/Client.ts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import hero2 from "@/assets/IMG_0764.JPG.jpeg";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      navigate("/admin");
    }
  };

  return (
      <div className="min-h-screen grid lg:grid-cols-2 bg-background">
        {/* Visual side */}
        <div className="hidden lg:block relative overflow-hidden bg-savanna-charcoal">
          <img
              src={hero2}
              alt="Login Background"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-savanna-charcoal via-savanna-charcoal/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-4xl text-savanna-cream font-light mb-4">
                Welcome <span className="italic text-savanna-gold">Back</span>
              </h2>
              <p className="text-savanna-cream/70 max-w-sm font-light leading-relaxed">
                Manage your portfolio and showcase your timeless moments to the world.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Form side */}
        <div className="flex flex-col items-center justify-center p-8 bg-background">
          <div className="w-full lg:w-sm  space-y-8">
            <div className="flex flex-col gap-2">
              <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-savanna-gold transition-colors text-sm mb-4 group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to site
              </Link>
              <h1 className="font-display text-3xl font-light text-foreground">
                Admin <span className="italic text-savanna-gold">Login</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Please enter your credentials to access the manager.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-savanna-gold font-medium">
                    Email Address
                  </label>
                  <Input
                      type="email"
                      placeholder="email@example.com"
                      className="bg-transparent border-0 border-b border-border/50 rounded-md px-2 focus-visible:ring-0 focus-visible:border-savanna-gold transition-all h-12 text-foreground placeholder:text-muted-foreground/40"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-savanna-gold font-medium">
                    Password
                  </label>
                  <div className="relative ">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="bg-transparent border-0 border-b border-border/50 rounded-md px-2 focus-visible:ring-0 focus-visible:border-savanna-gold transition-all h-12 pr-10 text-foreground placeholder:text-muted-foreground/40"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {/* View/Hide toggle */}
                    <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-savanna-gold transition-colors"
                        onClick={() => setShowPassword((s) => !s)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                  type="submit"
                  className="h-12 w-full bg-savanna-gold text-savanna-charcoal font-medium text-xs uppercase tracking-[0.2em] hover:bg-savanna-gold/90 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-savanna-gold/20"
                  disabled={loading}
              >
                {loading ? (
                    <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-savanna-charcoal/30 border-t-savanna-charcoal rounded-full animate-spin" />
                                    Signing in...
                                </span>
                ) : (
                    "Sign In"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;

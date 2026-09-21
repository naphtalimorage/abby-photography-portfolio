import { useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Heart, PartyPopper, Image as ImageIcon, ArrowRight, type LucideIcon } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/intergration/supabase/Client.ts";

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Camera,
  PartyPopper,
  ImageIcon,
};

const ServicesSection = () => {
  const queryClient = useQueryClient();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("services-section-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "services" },
        () => queryClient.invalidateQueries({ queryKey: ["services"] })
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[64px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Services
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            Investment & <span className="italic text-savanna-gold">Packages</span>
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-[350px] sm:h-[420px] bg-card border border-border animate-pulse" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="max-w-2xl mx-auto border border-dashed border-border bg-card p-10 text-center">
            <p className="font-display text-2xl text-foreground">Services are being prepared</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Add service packages from the admin page to publish them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon_name] || Camera;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="bg-card border border-border p-5 sm:p-6 md:p-8 lg:p-10 hover:border-savanna-gold/50 hover:shadow-lg hover:shadow-savanna-gold/10 transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-savanna-gold/10 rounded-full mb-4 sm:mb-6 group-hover:bg-savanna-gold/20 transition-colors">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-savanna-gold shrink-0" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl text-foreground mb-2">{service.title}</h3>
                  <p className="text-savanna-gold text-sm tracking-wider mb-6 font-medium">{service.price}</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {service.features.map((f: string) => (
                      <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-savanna-gold mt-2 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={scrollToContact}
                    className="w-full py-3 border border-savanna-gold text-savanna-gold text-sm tracking-widest uppercase hover:bg-savanna-gold hover:text-savanna-charcoal transition-all duration-300 mt-auto flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-savanna-gold/20"
                  >
                    Request Quote
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;

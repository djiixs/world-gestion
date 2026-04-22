import SectionTitle from "./SectionTitle";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="py-12 md:py-16 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle>Nos services</SectionTitle>
        <p className="mt-3 text-center text-foreground/50 max-w-xl mx-auto leading-relaxed">
          Un accompagnement concret, adapté à votre activité.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="card-hover group rounded-2xl border border-border/80 bg-white p-6 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/[0.07] text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {s.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/50">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

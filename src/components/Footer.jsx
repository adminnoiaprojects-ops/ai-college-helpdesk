export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "About", id: "landing" },
    { label: "Features", id: "features-section" },
    { label: "Demo Console", id: "chat" },
    { label: "Admin Access", id: "admin" }
  ];

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    if (id === "features-section") {
      onNavigate("landing");
      setTimeout(() => {
        const el = document.getElementById("features-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      onNavigate(id);
    }
  };

  return (
    <footer className="border-t border-glass-border bg-dark-bg py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <span className="font-display text-base font-semibold text-white">
              Noia AI <span className="font-light text-neutral-400">Helpdesk</span>
            </span>
            <p className="mt-2 font-sans text-xs text-neutral-500 max-w-md leading-relaxed">
              A modern, intelligent assistant providing immediate answers regarding admissions, hostel availability, examination dates, and placement support.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-6 md:gap-10">
            {links.map((link) => (
              <a
                key={link.label}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className="font-sans text-xs text-neutral-450 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <hr className="my-8 border-glass-border" />

        <div className="flex flex-col justify-between gap-4 font-sans text-[11px] text-neutral-500 md:flex-row">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
            <span>Copyright © {currentYear} Noia AI. All rights reserved.</span>
            <span className="hidden md:inline text-neutral-700">|</span>
            <span className="text-neutral-400 font-medium">Powered by Noia Projects</span>
          </div>
          <div className="flex gap-4">
            <span className="transition-colors hover:text-neutral-350 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="transition-colors hover:text-neutral-350 cursor-pointer">Terms of Use</span>
            <span>·</span>
            <span className="transition-colors hover:text-neutral-350 cursor-pointer">Site Map</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

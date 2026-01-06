import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.about, href: "#a-propos" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.gallery, href: "#galerie" },
    { label: t.nav.hours, href: "#horaires" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="bg-primary/5 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-2xl font-bold text-primary mb-2">
              Poly-Dom
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t.footer.tagline}
            </p>
            <p className="text-sm text-muted-foreground">
              {t.footer.description}
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-foreground mb-4">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-foreground mb-4">
              {t.contact.label}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="tel:+41794836286" className="hover:text-primary transition-colors">
                  +41 79 483 62 86
                </a>
              </li>
              <li>
                <a
                  href="mailto:dom.maerki@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  dom.maerki@gmail.com
                </a>
              </li>
              <li>Chemin du Vernard 40</li>
              <li>1474 Châbles FR, CH</li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted-foreground"
          >
            <p>
              &copy; {new Date().getFullYear()} Poly-Dom.{" "}
              {t.footer.copyright}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Single source of truth for Codbyte contact data and brand copy.
export const site = {
  name: "Codbyte",
  tagline: "Soluciones Web",
  city: "San Miguel de Tucumán",
  whatsapp: "+5493814159688",
  formspreeEndpoint: "https://formspree.io/f/xpwzgjzp",
};

// wa.me only accepts digits (no "+", spaces or dashes).
export const whatsappLink = (phone: string, message?: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

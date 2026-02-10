import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const wallop = localFont({
  src: "../public/fonts/Wallop-Regular.otf",
  variable: "--font-wallop",
});

// Metadata (SEO + Preview)
export const metadata: Metadata = {
  title: "Strømly® | Lad op i ly. Kør grønt. Ude & hjemme.",
  description:
    "Strømly® er din nye ladeløsning i Danmark. Oplad nemt din bil hjemme eller på farten med én enkel ladepakke til fast månedlig pris. Lad op i ly. Kør grønt.",
    keywords: ["Strømly", "Strømly Danmark", "Strømly ladeløsning", "elbil opladning", "opladning af elbil", "ladestander", "ladestandere Danmark", "ladeinfrastruktur", "elbil ladestation", "hurtig opladning", "smart opladning", "grøn energi", "bæredygtig transport", "CO2 venlig opladning", "klimavenlig kørsel", "elbil løsning", "opladning hjemme", "opladning på farten", "ladeboks", "ladeboks til elbil", "elbil lader installation", "ladeløsning til hjemmet", "ladeløsning til virksomheder", "lader til firmabil", "elbil erhverv opladning", "offentlig opladning", "privat ladestander", "ladeabonnement", "billig opladning elbil", "elbil strømpris", "energioptimering", "elbil teknologi", "fremtidens opladning", "smart grid opladning", "EV charging Denmark", "EV charging solution", "electric vehicle charging", "charging station startup", "charging network", "sustainable charging", "green mobility", "elbil netværk", "ladestation København", "ladestation Aarhus", "ladestation Odense", "ladestation Aalborg", "ladepunkter Danmark", "elbil opladningsnetværk", "fremtidens ladeløsning", "Strømly lancering 2026", "ny ladeløsning", "ladeplatform", "EV infrastructure", "charging provider", "elbil service", "ladepartner", "elbil energi", "ladeløsning til boligforening", "ladestandere til boligforening", "elbil opladning i lejlighed", "lader til parkeringskælder", "ladeanlæg", "ladeoperatør Danmark", "elbil opladning app", "smart charging app", "Strømly opladning", "Strømly EV", "Strømly grøn transport", "Strømly ladestation", "Strømly ladeboks", "Strømly bæredygtighed", "energiløsning elbil", "elbil opladning 2026", "EV charging 2026", "elbil fremtid", "grøn teknologi Danmark", "bæredygtig energi løsning", "klima venlig opladning", "elbil kør grønt", "lad op i ly", "Strømly kør grønt", "elektrisk transport", "ladehub Danmark", "charging hub", "ladeløsning startup", "ny elbil opladning", "elbil netværk Danmark", "ladestandere fremtid", "EV charging network Denmark", "Strømly launch", "Strømly coming soon", "Strømly website", "Strømly charging solution", "Strømly Denmark charging", "elbil opladning service", "hurtiglader Danmark", "DC opladning", "AC opladning", "elbil strøm", "ladefirma Danmark", "elbil opladning pris", "ladeinstallation Danmark", "elbil ladeløsning grøn"],

  icons: {
    icon: "/Stromly-favicon.webp",
  },

  openGraph: {
    title: "Strømly® | Lad op i ly. Kør grønt. Ude & hjemme.",
    description:
      "Strømly® er din nye ladeløsning i Danmark. Oplad nemt din bil hjemme eller på farten med én enkel ladepakke til fast månedlig pris. Lad op i ly. Kør grønt.",
    siteName: "Strømly",
    locale: "da_DK",
    type: "website",
    images: [
      {
        url: "/Stromly_sociale_view.webp", 
        width: 1200,
        height: 630,
        alt: "Strømly® | Lad op i ly. Kør grønt. Ude & hjemme.6",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Strømly® | Lad op i ly. Kør grønt. Ude & hjemme.",
    description:
      "Strømly® er din nye ladeløsning i Danmark. Oplad nemt din bil hjemme eller på farten med én enkel ladepakke til fast månedlig pris. Lad op i ly. Kør grønt.",
    images: ["/Stromly_sociale_view.webp"], 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <body className={`${wallop.variable} antialiased overflow-x-hidden`}>
        {children}

        <GoogleAnalytics gaId="G-7SEZ3L6G7T" />
      </body>
    </html>
  );
}

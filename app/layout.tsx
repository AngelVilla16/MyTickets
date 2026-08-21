import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
 title: {
    default: 'MyTickets',
    template: '%s | Gestor de Tickets', // Ej: "Panel | Gestor de Tickets" en subpáginas
  },
  description: "Aplicación para gestionar tus tickets de trabajo pendientes de manera eficiente y organizada.",
  keywords: ['gestión de tickets', 'control de tareas', 'soporte técnico', 'gestión de pendientes', 'productividad'],
  authors:{name:'Angel Villa / Astrosoft'},
  openGraph: {
    title: 'Gestor de Tickets de Trabajo',
    description: 'Aplicación para gestionar tus tickets de trabajo pendientes de manera eficiente y organizada.',
    url: 'https://midominio.com',
    siteName: 'Nexticket',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Previsualización del Gestor de Tickets',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";

/**
 * Sala privada de presentación · material para reuniones con clientes.
 * Fuera del índice de buscadores: se comparte solo por enlace directo.
 */
export const metadata: Metadata = {
  title: "Sala privada · MILLA ZERO",
  description:
    "Presentación ejecutiva de los espacios de Milla Zero para clientes.",
  robots: { index: false, follow: false },
};

export default function PresentacionLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

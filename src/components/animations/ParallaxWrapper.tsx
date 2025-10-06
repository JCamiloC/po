import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ yRange?: [number, number]; scaleRange?: [number, number] }>;

// No-op wrapper: devuelve children sin efecto parallax
export default function ParallaxWrapper({ children }: Props) {
  return <>{children}</>;
}

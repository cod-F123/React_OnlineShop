import { motion, useReducedMotion } from "framer-motion";

const easing = [0.22, 1, 0.36, 1];

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  duration = 0.7,
  amount = 0.2,
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

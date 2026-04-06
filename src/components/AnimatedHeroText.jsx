import { motion } from 'framer-motion';

export default function AnimatedHeroText({ text, className = '' }) {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      {text}
    </motion.p>
  );
}

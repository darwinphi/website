import { motion } from 'framer-motion';

export default function AnimatedHeroText({
  text,
  className = '',
  lang = 'en',
}) {
  return (
    <motion.p
      className={`hero-copy ${className}`.trim()}
      lang={lang}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {text}
    </motion.p>
  );
}

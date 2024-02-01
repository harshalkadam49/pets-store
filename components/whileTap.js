import { Box, Stack } from "@mui/material";
import { motion } from "framer-motion";
export default function WhileTap({ children }) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {children}
    </motion.div>
  );
}

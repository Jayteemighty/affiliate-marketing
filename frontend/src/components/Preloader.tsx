import { Settings } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidV4 } from "uuid";

const Preloader = () => {
  return (
    <AnimatePresence>
      <motion.div
        key={uuidV4()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed left-0 top-0 z-[99] flex h-screen w-full items-center justify-center bg-white'
      >
        <div className='flex items-center justify-center'>
          <Settings className='w-12 animate-spin text-primary' />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
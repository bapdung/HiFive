import { useEffect } from "react";

const useOnMounted = (effect: () => void) => {
  useEffect(effect, []);
};

export default useOnMounted;

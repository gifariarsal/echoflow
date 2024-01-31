import { useState } from 'react';

function useTogglePassword(initialValue = false) {
  const [show, setShow] = useState(initialValue);

  const toggle = () => setShow(!show);

  return [show, toggle];
}

export default useTogglePassword;

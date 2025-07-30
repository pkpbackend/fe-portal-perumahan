import { useRef, useEffect } from "react";
const App = ({ html = "" }) => {
  const myRef = useRef(null);
  useEffect(() => {
    myRef.current.innerHTML = html;
  }, [myRef]);

  return <div ref={myRef} />;
};

export default App;

import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Loader as MantineLoader } from "@mantine/core";

/**
 * This component to prevent mantine ui flashed during page load
 * This is just workaround before we support SSR mode for mantine ui
 */
const Loader: FC<PropsWithChildren<any>> = ({ children, onLoad = ()=>{}}) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
    onLoad();
  }, []);
  return (
    <>
      {loaded ? (
        children
      ) : (
        <div
          style={{
            height: "100vh",
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#333",
          }}
        >
          <MantineLoader></MantineLoader>
        </div>
      )}
    </>
  );
};

export default Loader;

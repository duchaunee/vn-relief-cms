import * as React from "react";

export function useIsClient() {
  const [isClient, setIsClient] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  return !!isClient;
}

import React, { createContext, useContext, useEffect, useState } from "react";

import { getChildren } from "@/services/childService";
import { Child } from "@/types/Child";

type CurrentChildContextType = {
  children: Child[];
  selectedChild: Child | null;
  setSelectedChild: (child: Child) => void;
  loadChildren: () => Promise<void>;
};

const CurrentChildContext = createContext<CurrentChildContextType | null>(null);

export function CurrentChildProvider({
  children: appChildren,
}: {
  children: React.ReactNode;
}) {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  const loadChildren = async () => {
    const data = await getChildren();

    const typedChildren = data as Child[];

    setChildren(typedChildren);

    if (typedChildren.length > 0 && !selectedChild) {
      setSelectedChild(typedChildren[0]);
    }
  };

  useEffect(() => {
    loadChildren();
  }, []);

  return (
    <CurrentChildContext.Provider
      value={{
        children,
        selectedChild,
        setSelectedChild,
        loadChildren,
      }}
    >
      {appChildren}
    </CurrentChildContext.Provider>
  );
}

export function useCurrentChild() {
  const context = useContext(CurrentChildContext);

  if (!context) {
    throw new Error("useCurrentChild must be used inside CurrentChildProvider");
  }

  return context;
}

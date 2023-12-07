import { useEffect, useCallback, useState, useMemo, useRef } from "react";
import { IPaginationParameters, deepArrayCompare } from "./common";

type TPaginationOptions = {
  targetRef: React.MutableRefObject<HTMLDivElement | null>;
  pagination: IPaginationParameters | number;
};

type TAnyFunction = (offset: number, limit: number) => unknown;

export const usePagination = (
  onPaginate: TAnyFunction,
  initial: TPaginationOptions,
  deps: Array<unknown> = []
) => {
  const { targetRef, pagination } = initial;
  const prevDepsRef = useRef(deps);

  const [initialMount, setInitialMount] = useState<boolean>(true);
  const [limit] = useState<number>(
    typeof pagination === "number" ? pagination : pagination.limit
  );

  const [offset, setOffset] = useState<number>(
    typeof pagination === "number" ? 0 : pagination.offset
  );

  const updateDeps = useCallback(() => {
    prevDepsRef.current = [...deps];
  }, [deps]);

  const paginationHandler = useCallback(
    (paginationAction: TAnyFunction) => {
      const newOffset = offset + limit;
      paginationAction(newOffset, limit);
      setOffset(newOffset);
      updateDeps();
    },
    [limit, offset, updateDeps]
  );

  const fncHasDepsChanged = (
    prev: Array<unknown>,
    current: Array<unknown>
  ): boolean => {
    if (!prevDepsRef || !prevDepsRef.current) return false;
    return !deepArrayCompare(current, prev);
  };

  const hasDepsChanged = useMemo(() => {
    if (!prevDepsRef || !prevDepsRef.current) return;
    const prevDeps = [...prevDepsRef.current];
    return fncHasDepsChanged(prevDeps, deps);
  }, [deps]);

  const scrollHandler = useCallback(() => {
    if (!targetRef || !targetRef.current) return;
    const win = targetRef.current;

    if (win.scrollHeight - win.clientHeight < win.scrollTop + 1)
      switch (true) {
        case !(deps?.length > 0):
          paginationHandler(onPaginate);
          break;
        case deps?.length > 0 && (hasDepsChanged || initialMount):
          setInitialMount((prev) => (prev ? false : prev));
          paginationHandler(onPaginate);
          break;
      }
  }, [
    deps,
    hasDepsChanged,
    initialMount,
    onPaginate,
    paginationHandler,
    targetRef,
  ]);

  useEffect(() => {
    if (!targetRef || !targetRef.current) return;
    const win = targetRef.current;
    win.addEventListener("scroll", scrollHandler);
    return () => {
      win.removeEventListener("scroll", scrollHandler);
    };
  }, [scrollHandler, targetRef]);

  const resetOffset = () => {
    setOffset(0);
  };

  return {
    resetOffset,
  };
};

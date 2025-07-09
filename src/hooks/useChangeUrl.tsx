import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import { ChangeEvent, Key, useCallback } from "react";

const useChangeUrl = () => {
  const router = useRouter();
  const debounce = useDebounce();

  const currentLimit = router.query.limit;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;
  const currentCategory = router.query.category;
  const currentIsOnline = router.query.isOnline;
  const currentIsFeatured = router.query.isFeatured;

  const setUrl = useCallback(() => {
    // Pastikan router sudah siap sebelum melakukan replace
    // Ini adalah pengaman tambahan
    if (!router.isReady) {
      return;
    }

    router.replace(
      {
        query: {
          limit: router.query.limit || LIMIT_DEFAULT,
          page: router.query.page || PAGE_DEFAULT,
          search: router.query.search || "",
        },
      },
      undefined,
      { shallow: true }, // Mencegah re-fetch data yang tidak perlu
    );
  }, [
    router.isReady,
    router.query.limit,
    router.query.page,
    router.query.search,
  ]);

  const setUrlExplore = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        category: currentCategory || "",
        isOnline: currentIsOnline || "",
        isFeatured: currentIsFeatured || "",
      },
    });
  };

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    router.push({
      query: {
        ...router.query,
        limit: selectedLimit,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeCategory = (category: Key | null) => {
    router.push({
      query: {
        ...router.query,
        category: `${category}`,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleClearCategory = () => {
    router.push({
      query: {
        ...router.query,
        category: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeIsOnline = (isOnline: string) => {
    router.push({
      query: {
        ...router.query,
        isOnline,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeIsFeatured = (isFeatured: string) => {
    router.push({
      query: {
        ...router.query,
        isFeatured,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      router.push({
        query: {
          ...router.query,
          search,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleSearchLandingPage = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      router.push({
        query: {
          ...router.query,
          search,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        search: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleClearSearchLandingPage = () => {
    router.push({
      query: {
        ...router.query,
        search: "",
      },
    });
  };
  return {
    currentLimit,
    currentPage,
    currentSearch,

    setUrl,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    handleSearchLandingPage,
    handleClearSearchLandingPage,

    setUrlExplore,
    currentCategory,
    handleClearCategory,
    currentIsFeatured,
    currentIsOnline,
    handleChangeCategory,
    handleChangeIsFeatured,
    handleChangeIsOnline,
  };
};

export default useChangeUrl;

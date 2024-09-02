import React from "react";
import UniqueURLPage from "./index";
import { useRouter } from "next/router";

const TestUniqueURLPage = () => {
  const router = useRouter();
  const { uniqueURL } = router.query;

  return <UniqueURLPage />;
};

export default TestUniqueURLPage;

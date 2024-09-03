"use client";

import React, { useEffect, useState } from "react";
import UniqueURLPage from "./index";

const TestUniqueURLPage = ({ params }: { params: { uniqueURLId: string } }) => {
  console.log(params.uniqueURLId);

  return (
    <div>
      {params.uniqueURLId ? (
        <UniqueURLPage uniqueURLId={params.uniqueURLId} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TestUniqueURLPage;

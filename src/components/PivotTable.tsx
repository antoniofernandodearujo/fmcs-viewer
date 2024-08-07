import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-pivottable/pivottable.css";

interface PivotTableProps {
  data: any[];
}

// Carregue o componente dinamicamente sem SSR
const PivotTableUI = dynamic(() => import("react-pivottable/PivotTableUI"), {
  ssr: false,
});

const PivotTable: React.FC<PivotTableProps> = ({ data }) => {
  const [pivotState, setPivotState] = useState({
    rows: ["created_dt"],
    cols: ["data_source_modified_dt"],
    aggregatorName: "Sum",
    vals: [],
    rendererName: "Table"
  });

  return (
    <>
      <PivotTableUI
        data={data}
        onChange={(s: any) => setPivotState(s)}
        {...pivotState}
      />
    </>
  );
};

export default PivotTable;

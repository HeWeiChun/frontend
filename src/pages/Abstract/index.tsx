import React, {FC} from 'react'
import {GridContent} from "@ant-design/pro-components";
import {Row} from "antd";
import Pie from "./components/Gradient";


const Analysis: FC = () => {


  return (
    <GridContent>
      <Row gutter={24}>

        <Pie/>
        <Pie/>
        <Pie/>
        <Pie/>
      </Row>

    </GridContent>
  );
};

export default Analysis;

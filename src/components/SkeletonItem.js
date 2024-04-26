import React from "react";
import { Skeleton, Card } from "antd";

function SkeletonItem() {
  return (
    <div className="w-full lg:w-5/12 p-2">
      <Card bordered={false} style={{ width: "100%" }}>
        <Skeleton active />
      </Card>
    </div>
  );
}

export default SkeletonItem;

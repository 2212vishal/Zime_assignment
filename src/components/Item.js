import React, { useState } from "react";
import { Card, Button, Tag,Flex } from "antd";

function Item({ post }) {
  const [showFullContent, setShowFullContent] = useState(false);
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  return (
    <div className="w-full lg:w-5/12 p-2">
      <Card
        key={post.id}
        title={post.title}
        bordered={false}
        // style={{ width: "100%" }}
        className="w-full "
      >
      <Flex gap="middle" wrap="wrap" vertical>
        <div>
        <p>{showFullContent ? post.body : `${post.body.slice(0, 100)}...`}</p>
        <Button onClick={toggleContent}>
          {showFullContent ? "Show less" : "Show more"}
        </Button>
        </div>
        <p>
          Tags: {post.tags.map((tag, index) => (
            <React.Fragment key={index}>
              <Tag color="magenta">{tag}</Tag>{" "}
            </React.Fragment>
          ))}
        </p>
        <p>Reaction: {post.reactions}</p>
      </Flex>
        
       
      </Card>
    </div>
  );
}

export default Item;


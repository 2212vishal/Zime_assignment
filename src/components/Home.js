import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "./Item";
import SkeletonItem from "./SkeletonItem";
import { Button, Layout, Tag, Input } from "antd";

const { Header, Content, Footer } = Layout;

function Home() {
  const [initialUserData, setInitialUserData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [skip, setSkip] = useState(0);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/posts?skip=${skip}&limit=10`
        );
        setInitialUserData(response.data.posts);
        setUserData(response.data.posts);
        // Extract unique tags
        const tagsSet = new Set();
        response.data.posts.forEach((post) => {
          post.tags.forEach((tag) => {
            tagsSet.add(tag);
          });
        });
        setUniqueTags(Array.from(tagsSet));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [skip]);

  const handleNext = () => {
    if (skip + 10 <= 140) {
      setSkip(skip + 10);
    }
  };

  const handlePrev = () => {
    if (skip - 10 >= 0) {
      setSkip(skip - 10);
    }
  };

  const handleSearch = (value) => {
    setSearchInput(value);
    if (value === "") {
      setUserData(initialUserData);
    } else {
      const filteredData = initialUserData.filter((post) =>
        post.title.toLowerCase().includes(value.toLowerCase())
      );
      setUserData(filteredData);
    }
    setSelectedTags([]); // Reset selected tags
  };

  const handleTagClick = (tag) => {
    const isTagSelected = selectedTags.includes(tag);

    let updatedSelectedTags;
    if (isTagSelected) {
      updatedSelectedTags = selectedTags.filter(
        (selectedTag) => selectedTag !== tag
      );
    } else {
      updatedSelectedTags = [...selectedTags, tag];
    }

    setSelectedTags(updatedSelectedTags);

    const filteredData = initialUserData.filter(
      (post) =>
        updatedSelectedTags.length === 0 ||
        updatedSelectedTags.every((selectedTag) =>
          post.tags.includes(selectedTag)
        )
    );

    setUserData(filteredData);
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="text-white p-4 text-center text-2xl">
          <b>Assignment</b>
        </div>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="flex justify-center items-center">
          <div className="flex justify-center flex-col lg:flex-row p-4  w-10/12">
            <div className="flex justify-between p-3 gap-2">
              <b>SearchTitle:</b>
              <Input
                placeholder="Outlined"
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap justify-center items-center">
              <b>Filter Tags:</b>{" "}
              {uniqueTags.map((tag) => (
                <Tag
                  key={tag}
                  color={selectedTags.includes(tag) ? "red" : ""}
                  onClick={() => handleTagClick(tag)}
                  className="flex-row cursor-pointer"
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>

        <div className="site-layout-content">
          <div className="flex flex-col gap-5">
            <div className="flex gap-5 lg:flex-row flex-col flex-wrap justify-center">
              {(userData ? userData : Array.from({ length: 10 })).map(
                (post, index) =>
                  userData ? (
                    <Item key={post.id} post={post} />
                  ) : (
                    <SkeletonItem key={index} />
                  )
              )}
            </div>
            <div className="flex justify-center">
              <div className="flex w-8/12 justify-between items-center">
                <Button
                  type="primary"
                  onClick={handlePrev}
                  disabled={skip === 0}
                  style={{ backgroundColor: "blue", color: "black" }}
                >
                  Prev.
                </Button>
                <Button
                  type="primary"
                  onClick={handleNext}
                  disabled={skip === 140}
                  style={{ backgroundColor: "blue", color: "black" }}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Developed by Vishal</Footer>
    </Layout>
  );
}

export default Home;

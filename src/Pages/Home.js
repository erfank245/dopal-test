import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Style = styled.div`
  width: 70%;
  height: 100%;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  .loading{
    margin: 0 auto;
    font-size: 2rem;
  }
  .links {
    margin: 1rem 0;
    display: flex;
    a {
      margin: 0 1rem;
      padding: 1rem;
    }
  }
  .branch {
    margin: 0 0.5rem 0 0;
    padding: 0.5rem 0.8rem 0.5rem 0;
    border-right: 1px solid;
    position: relative;
    .line {
      position: absolute;
      right: 0;
      top: 1.5rem;
      width: 0.5rem;
      height: 1px;
      border-top: 1px solid;
    }
    .name {
      padding: 0.3rem 0;
    }
  }
`

export default function Home(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    let newData = await fetch(process.env.REACT_APP_LINK);
    newData = await newData.json();
    setData(newData.Data);
    setLoading(false)
  }
  if(loading){
    return (
      <Style>
        <div className="loading">
          درحال بارگذاری ...
        </div>
      </Style>
    );
  }
  const buildTree = (tree = data) => {
    return (
      <div className="branch">
        <div className="line"></div>
        <div className="name">{tree.name}</div>
        <div className="children">
          {(tree.children.length) ? (
            tree.children.map(val => buildTree(val))
          ) : ''}
        </div>
      </div>
    )
  }
  return (
    <Style>
      <div className="links">
        <Link to={"/"}>درخت کامل</Link>
        <Link to={"/open"}>درخت بازشونده</Link>
      </div>
      {buildTree()}
    </Style>
  );
}
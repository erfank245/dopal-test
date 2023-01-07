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
    position: relative;
    .line {
      position: absolute;
      right: 0;
      top: 0.9rem;
      width: 0.5rem;
      height: 100%;
    }
    .name {
      padding: 0.3rem 0;
      cursor: pointer;
    }
    .children {
      max-height: 0;
      overflow: hidden;
      transition: all 0.3s ease-in-out;
      &.open {
        max-height: 1000rem;
      }
    }
  }
`

export default function Open(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [opening, setOpening] = useState({});
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
  const clickedBranch = (id, depth) => {
    //copy opened ids
    let openIDs = {...opening};

    //get depth opened ids
    let open = openIDs[`depth_${depth}`];
    if(!open){
      open = [];
    }

    // locate id
    let findId = open.findIndex((value) => id === value);

    // if there is id remove it
    // if there is not push it
    if(findId !== -1){
      open.splice(findId, 1);
    } else {
      open.push(id);
    }

    // set new depth open ids
    openIDs[`depth_${depth}`] = open;

    //set state
    setOpening(openIDs);
  }

  const buildTree = (tree = data, depth = 1) => {
    // find if branch is openned
    let findOpen = -1;
    if(opening[`depth_${depth}`]){
      findOpen = opening[`depth_${depth}`].findIndex((value) => value === tree.id)
    }
    return (
      <div className="branch">
        <div className="line">{((findOpen !== -1 || !tree.children.length) ? '-' : '+')}</div>
        <div className="name" onClick={() => clickedBranch(tree.id, depth)}>
          {tree.name} 
          {(tree.children.length) ? (
            ` (${tree.children.length})`
          ) : ''}
        </div>
        <div className={`children ${((findOpen !== -1) ? 'open' : '')}`}>
          {(tree.children.length) ? (
            tree.children.map(val => buildTree(val, depth + 1))
          ) : ''}
        </div>
      </div>
    )
  }
  console.log(opening)
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
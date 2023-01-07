import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Style = styled.div`
  .container-terms{
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background-color: var(--bg-d-2);
    .btn {
      cursor: pointer;
      text-decoration: none;
      background: none;
      border: 1px solid var(--fsc-d-1);
      padding: 15px 30px;
      text-align: center;
      font-family: IRANSans;
      font-size: var(--fs-btn);
      color: var(--fsc-d-1);
      text-align: center;
      border-radius: 8px;
      width: fit-content;
      margin: 2rem auto;
    }
  }
`;

export default function NotMatch(props) {
  return (
      <Style>
        <div className="container-terms">
          <h3> صفحه مورد نظر پیدا نشد </h3>
          <Link className="btn" to={'/'}> صفحه اصلی </Link>
        </div>
      </Style>
  );
}

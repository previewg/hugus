import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const ActWriteStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
  .layout {
    margin-top: 100px;
    width: 700px;
    display: flex;
    flex-direction: column;
    .write_title {
      text-align: center;
      font-size: 20px;
      padding: 10px;
      display: flex;
      justify-content: center;
      p {
        width: 200px;
        height: 40px;
        border-bottom: solid orange 2px;
      }
    }
    .title {
      margin-top: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      p {
        font-weight: bold;
        margin-right: 10px;
        width: 80px;
      }
      input {
        border: none;
        width: 300px;
        padding: 5px;
        border-bottom: solid 0.1px lightgray;
        transition: 0.3s ease-in-out;
        :focus {
          outline: none;
          border-bottom: solid 0.1px orange;
        }
      }
    }

    .info {
      margin-top: 35px;
      p {
        font-weight: bold;
      }
      textarea {
        padding: 12px;
        width: 100%;
        height: 150px;
        border-radius: 4px;
        resize: none;
        border: solid 0.1px lightgray;
        transition: 0.3s ease-in-out;
        :focus {
          outline: none;
          border: solid 0.1px orange;
        }
      }
    }
    .content {
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      p {
        font-weight: bold;
      }
      div {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        margin-bottom: 10px;

        > div {
          display: flex;
          margin: 0;
          .preImg {
            width: 60px;
            height: 60px;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
            margin: 5px;
          }
          .preImgClear {
            position: relative;
            right: 11px;
            width: 15px;
            height: 15px;
            bottom: 46px;
            background-color: gray;
            border-radius: 7.5px;
            font-size: 12px;
            background-color: darkgray;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }

        label {
          min-width: 50px;
          color: grey;
          font-size: small;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          :hover {
            color: orange;
          }
        }
        input[type="file"] {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
      }

      textarea {
        padding: 12px;
        resize: none;
        width: 100%;
        height: 400px;
        border-radius: 4px;
        transition: 0.3s ease-in-out;
        border: solid 0.1px lightgray;

        :focus {
          outline: none;
          border: solid 0.1px orange;
        }
      }
    }

    .items {
      margin-top: 35px;
      width: 100%;
      > p {
        font-weight: bold;
      }

      .item {
        margin-top: 40px;
        width: 90%;
        display: flex;
        align-items: center;
        p {
          margin-left: 5px;
          font-size: 13px;
        }
        input {
          padding: 5px;
          height: 20px;
          outline: none;
          border: none;
          border-bottom: solid 0.1px lightgray;
          transition: 0.3s ease-in-out;
          :focus {
            border-bottom: solid 0.1px orange;
          }
        }
        .item_name {
          display: flex;
          flex-direction: column;
          min-width: 200px;
          margin-right: 10px;
        }
        .item_price {
          display: flex;
          flex-direction: column;
          width: 90px;
          min-width: 90px;
          margin-right: 10px;
        }
        .item_quantity {
          display: flex;
          flex-direction: column;
          width: 90px;
          min-width: 90px;
          margin-right: 10px;
        }

        button {
          position: relative;
          top: 20px;
          left: 20px;
          width: 50px;
          min-width: 50px;
          height: 30px;
          margin-right: 5px;
          background-color: transparent;
          border-radius: 3px;
          cursor: pointer;
          outline: none;
        }
        .item_add {
          border: solid orange 0.1px;
          color: orange;
          :hover {
            background-color: orange;
            color: white;
          }
        }
        .item_delete {
          border: solid darkgray 0.1px;
          color: darkgray;
          :hover {
            background-color: darkgray;
            color: white;
          }
        }
      }
      .item_list {
        margin-top: 20px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        > div {
          display: flex;
          align-items: center;
          > p {
            font-size: 13px;
          }
          > button {
            border-radius: 20px;
            cursor: pointer;
            font-size: 13px;
            margin-left: 10px;
            color: #fa6f6f;
            width: 40px;
            height: 25px;
            border: solid 0.1px #fa6f6f;
            background-color: transparent;
            outline: none;
            :hover {
              background-color: #fa6f6f;
              color: white;
            }
          }
        }
      }
      .total_price {
        border-top: solid 0.1px orange;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p:nth-child(1) {
          font-size: 12px;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          :hover {
            color: #f83c3c;
          }
        }
      }
    }

    .warning {
      margin-top: 30px;
      width: 100%;
      border: solid 0.1px lightgray;
      margin-bottom: 30px;
      font-size: 13px;
      display: flex;
      flex-direction: column;
      p {
        margin: 15px;
        margin-left: 20px;
      }
      > p:nth-child(1) {
        font-weight: bold;
      }
      strong:nth-child(1) {
        color: dodgerblue;
      }
      strong:nth-child(2) {
        color: orange;
      }
      div {
        display: flex;
        justify-content: space-between;
      }
    }

    .hashtags {
      font-weight: bold;
      margin-top: 20px;
      > div {
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        overflow: paged-y;
        input {
          margin-right: 7px;
          padding: 5px;
          height: 20px;
          outline: none;
          border: none;
          transition: 0.3s ease-in-out;
          border-bottom: solid 0.1px lightgray;
          :focus {
            border-bottom: solid 0.1px orange;
          }
        }
        .added__hashtag {
          display: flex;
          .hashtag {
            padding: 10px;
            border-radius: 20px;
            background-color: orange;
            font-size: 12px;
            margin: 5px;
            color: white;
            font-weight: 200;
            min-width: auto;
          }
          .clear {
            position: relative;
            border-radius: 7.5px;
            font-size: 12px;
            right: 15px;
            top: -10px;
            height: 15px;
            width: 15px;
            background-color: darkgray;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
      }
    }

    .submit {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      button {
        margin-top: 15px;
        border: none;
        background: white;
        font-size: 15px;
        outline: none;
        cursor: pointer;
        font-weight: bold;
        transition: 0.2s ease-in-out;
        :hover {
          color: orange;
        }
        > img {
          margin-left: 10px;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

const ErrorBoxStyle = styled.p`
  ${(props) => {
    if (props.error == 0) {
      return "display:none;opacity:0";
    } else {
      return "opacity:1;transform: translateX(-100px);";
    }
  }};
  right: 0;
  background-color: #ffa500;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 100px;
  width: 180px;
  height: 50px;
  transition: 0.7s ease-in-out;
  font-size: 15px;
`;

const errorMsg = [
  "",
  "제목을 입력 바랍니다",
  "내용을 입력 바랍니다",
];

const ActWrite = () => {
  const dispatch = useDispatch();
  const title = useRef();
  const content = useRef();
  const [data, setData] = useState({
    title: "",
    info: "",
    content: "",
    files: null,
  });

  const [filled, setFilled] = useState({
    title: true,
    info: true,
    content: true,
  });

  const [errorCode, setErrorCode] = useState(0);

  const [preImg, setPreImg] = useState([]);

  const [fileReaderState, setFileReaderState] = useState("");


  return (
    <>
      <ActWriteStyle>
        <div className="layout">
          <div className="write_title">
            <p>글쓰기</p>
          </div>
          <div className="title">
            <p>제목</p>
            <input
              name="title"
              ref={title}
              value={data.title}
              type="text"
              placeholder="제목을 입력하세요."
            />
          </div>


          <div className="submit">
            <button>
              제출하기
              <img alt="submit" src="/icons/PaperPlane.png" />
            </button>
          </div>
          
        </div>
      </ActWriteStyle>
      {/* <ErrorBoxStyle error={errorCode}>{errorMsg[errorCode]}</ErrorBoxStyle> */}
    </>
  );
};

export default ActWrite;
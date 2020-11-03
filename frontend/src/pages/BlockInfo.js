import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  BlockInfoHead,
  BlockInfoMain,
  BlockSearch,
  BlockSocket,
} from "components";

const BlockInfoStyle = styled.section`
  width: 100%;
 
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
`;

const BlockInfo = (props) => {
  const init = useRef(true);
  const [txList, setTxList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [txHeight, setTxHeight] = useState(0);
  const [blockHeight, setBlockHeight] = useState(0);
  console.log("초기화");

  const initLoad = useCallback(async () => {
    const initData = await axios.get("/block/init");
    setTxList(initData.data.txList);
    setBlockList(initData.data.blockList);
    setTxHeight(initData.data.txHeight);
    setBlockHeight(initData.data.blockHeight);
  }, []);

  useEffect(() => {
    if (init.current) {
      initLoad().then(() => (init.current = false));
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <BlockInfoStyle>
      <BlockSocket
        txList={txList}
        setTxList={setTxList}
        blockList={blockList}
        setBlockList={setBlockList}
      />
      <BlockSearch />
      <BlockInfoHead txHeight={txHeight} blockHeight={blockHeight} />
      <BlockInfoMain
        txList={txList}
        blockList={blockList}
        history={props.history}
      />
    </BlockInfoStyle>
  );
};

export default BlockInfo;

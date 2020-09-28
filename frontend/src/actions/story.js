import axios from "axios";

// Action Type
export const STORY_ADD = "STORY_ADD";
export const STORY_ADD_SUCCESS = "STORY_ADD_SUCCESS";
export const STORY_ADD_FAILURE = "STORY_ADD_FAILURE";
export const STORY_DELETE = "STORY_DELETE";
export const STORY_UPDATE = "STORY_UPDATE";

const storyAddStart = () => {
  return { type: STORY_ADD };
};

const storyAddSuccess = () => {
  return { type: STORY_ADD_SUCCESS };
};

const storyAddFailure = () => {
  return { type: STORY_ADD_FAILURE };
};

// 게시물 등록
export const storyAdd = (data) => async (dispatch) => {
  dispatch(storyAddStart());
  await axios
    .post("/story/add", data, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then((response) => {
      dispatch(storyAddSuccess());
    })
    .catch((error) => {
      dispatch(storyAddFailure());
    });
};

// 게시물 삭제
export const storyDelete = () => async (dispatch) => {
  await axios
    .delete("/story/delete")
    .then((response) => {
      console.log("성공적으로 삭제되었습니다.");
    })
    .catch((error) => {
      console.log("삭제에 실패하였습니다.");
    });
};

// 게시물 수정
export const storyUpdate = ({ data }) => async (dispatch) => {
  await axios
    .put("/story/update", { data })
    .then((response) => {
      alert("성공적으로 수정되었습니다.");
    })
    .catch((error) => {
      alert("수정에 실패하였습니다.");
    });
};

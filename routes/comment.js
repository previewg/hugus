"use strict";
const express = require("express");
const router = express.Router();
const {
  User,
  Story_Comment,
  Comment_Child,
  Story,
  sequelize,
} = require("../models");

// 댓글 등록
router.post("/add", async (req, res) => {
  try {
    const { user_email } = req.session.loginInfo;
    const { story_id, comment } = req.body;
    await Story_Comment.create({
      user_email,
      story_id,
      comment,
    });

    await Story.increment(
      {
        story_comment: 1,
      },
      {
        where: {
          id: story_id,
        },
      }
    );

    const list = await Story_Comment.findAll({
      where: {
        story_id: req.body.story_id,
      },
      order: [["created_at", "DESC"]],
      include: [{ model: User, attributes: ["nickname"] }],
    });

    res.json({ list: list, success: 1 });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
  }
});

// 댓글 취소
router.post("/delete", async (req, res) => {
  const { story_id, comment_id } = req.body;

  try {
    await Story_Comment.destroy({
      where: {
        id: comment_id,
      },
    });
    await Story.decrement(
      {
        story_comment: 1,
      },
      {
        where: {
          id: story_id,
        },
      }
    );
    const list = await Story_Comment.findAll({
      where: {
        story_id,
      },
      order: [["created_at", "DESC"]],
      include: [{ model: User, attributes: ["nickname"] }],
    });
    res.json({ list: list, success: 1 });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 댓글 목록 조회
router.get("/list/:story_id", async (req, res) => {
  try {
    let story_id = req.params.story_id;

    const list = await Story_Comment.findAll({
      attributes: [
        "id",
        "user_email",
        "comment",
        "createdAt",
        [
          sequelize.literal(
            "(SELECT COUNT(comment_id) FROM comment_child WHERE comment_id = `story_Comment`.id)"
          ),
          "child_count",
        ],
      ],
      include: [{ model: User, attributes: ["nickname"] }],
      where: {
        story_id: story_id,
      },
      order: [["created_at", "DESC"]],
    });
    res.json({ list: list, success: 1 });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: 3 });
  }
});

//대댓글 작성
router.post("/child_add", async (req, res) => {
  try {
    const user_email = req.session.loginInfo.user_email;
    const { comment_id, comment } = req.body;
    await Comment_Child.create({
      user_email: user_email,
      comment_id: comment_id,
      comment: comment,
    });
    const reComment = await Comment_Child.findAll({
      where: {
        comment_id: req.body.comment_id,
      },
      order: [["created_at", "DESC"]],
      include: [{ model: User, attributes: ["nickname"] }],
    });
    res.json({ reComment: reComment, success: 1 });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: 3 });
  }
});

// 대댓글 목록 조회
router.get("/childList/:comment_id", async (req, res) => {
  try {
    const comment_id = req.params.comment_id;
    const list = await Comment_Child.findAll({
      where: {
        comment_id: comment_id,
      },
      order: [["created_at", "DESC"]],
      include: [{ model: User, attributes: ["nickname"] }],
    });
    res.json({ list: list, success: 1 });
  } catch (error) {
    res.status(400).json({ success: 3 });
  }
});

module.exports = router;

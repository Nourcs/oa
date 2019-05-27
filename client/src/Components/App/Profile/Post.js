import React, { Component } from "react";

import { Link } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import keys from "../../../Config/keys";
import { connect } from "react-redux";
import { fetchUser } from "../../../Redux/Modules/Auth/auth";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      newComment: ""
    };
  }

  componentDidMount() {
    if (!_.isEmpty(this.props.post)) {
      let { post } = this.props;
      let total = document.querySelector(`.likes${this.props.post._id}`);
      let like = document.getElementById(total.id);
      if (like) {
        like.classList.remove("text-danger");
      }
      this.updateLikes();
      axios
        .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/comments/${post._id}`)
        .then(comment => {
          if (comment.data.length > 0) {
            let comments = [...comment.data];
            this.setState({ comments });
          }
        });
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ comments: [] });
    let total = document.querySelector(`.likes${this.props.post._id}`);
    let like = document.getElementById(total.id);
    if (like) {
      like.classList.remove("text-danger");
      this.updateLikes();
    }

    if (!_.isEmpty(props.post)) {
      let { post } = props;
      axios
        .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/comments/${post._id}`)
        .then(comment => {
          if (comment.data.length > 0) {
            let comments = [...comment.data];
            this.setState({ comments });
          }
        });
    }
  }

  updateLikes = () => {
    let total = document.querySelector(`.likes${this.props.post._id}`);
    console.log("total Id = ", total.id);
    axios
      .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/likes/${total.id}`)
      .then(res => {
        total.innerText = res.data.total;
        axios
          .post(
            `${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/currentUserLiked/${
              this.props.currentUser.uid
            }/${total.id}`
          )
          .then(response => {
            if (response.data.liked) {
              let like = document.getElementById(total.id);
              if (like) {
                like.classList.add("text-danger");
              }
            }
          });
      });
  };

  onLike = e => {
    e.target.classList.toggle("text-danger");
    if (e.target.classList.value.includes("text-danger")) {
      axios
        .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/incLike/${e.target.id}`, {
          from: this.props.currentUser._id
        })
        .then(res => {
          this.updateLikes();
        });
    } else {
      axios
        .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/decLike/${e.target.id}`)
        .then(res => {
          this.updateLikes();
        });
    }
  };

  onCommentChange = e => {
    this.setState({ newComment: e.target.value });
  };

  newComment = e => {
    e.preventDefault();
    let id = e.target.id;
    let { post } = this.props;

    if (this.state.newComment.length > 0) {
      axios
        .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/newComment/${id}`, {
          comment: this.state.newComment,
          from: this.props.currentUser._id
        })
        .then(res => {
          this.setState({ newComment: "" }, () => {
            let { post } = this.props;
            axios
              .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/comments/${post._id}`)
              .then(comment => {
                if (comment.data.length > 0) {
                  let comments = [...comment.data];
                  this.setState({ comments });
                }
              });
          });
        });
    }
  };

  render() {
    let { post } = this.props;
    if (!_.isEmpty(post)) {
      return (
        <div className="card mx-auto mb-3">
          <div className="card-header d-flex">
            <img
              src={post.from.photoURL}
              style={{ height: 25, borderRadius: "100%" }}
              alt="profile"
            />
            <Link to={"/people/" + post.from.uid} className="ml-2">
              {post.from.displayName}
            </Link>
          </div>
          <div className="card-body">
            <h5>{post.post}</h5>
            <label className="float-left text-muted">
              <i className="fas fa-heart" onClick={this.onLike} id={post._id} />
              <span
                className={
                  "badge badge-secondary bg-light text-secondary likes" +
                  post._id
                }
                id={post._id}
              />
            </label>
          </div>

          <div className="card-footer d-flex align-items-center">
            <img
              src={this.props.currentUser.photoURL}
              style={{ height: 25, borderRadius: "100%" }}
              alt="profile"
            />
            <form method="post" className="ml-3 w-100">
              <input
                type="text"
                placeholder="Comment ..."
                name="question"
                className="form-control"
                value={this.state.newComment}
                onChange={this.onCommentChange}
                style={{ borderRadius: "100px" }}
              />
              <button
                type="submit"
                className="form-control btn btn-dark my-3 d-none"
                onClick={this.newComment}
                id={post._id}
              >
                Share
              </button>
            </form>
          </div>
          {this.state.comments.map((comment, index) => {
            if (index < 3)
              return (
                <div
                  key={index}
                  className="card-footer d-flex justify-content-center align-items-center"
                >
                  <img
                    src={comment.from.photoURL}
                    style={{ height: 25, borderRadius: "100%" }}
                    alt="profile"
                  />
                  <p
                    type="text"
                    name="question"
                    className="form-control ml-3 h-auto mb-0 bg-light"
                    style={{ border: "none" }}
                    disabled
                  >
                    {comment.comment}
                  </p>
                </div>
              );
          })}
        </div>
      );
    } else {
      return "";
    }
  }
}

function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default connect(
  mapStateToProps,
  { fetchUser }
)(Post);

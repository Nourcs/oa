import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../../Redux/Modules/Auth/auth";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import keys from "../../../Config/keys";

import _ from "lodash";

class Other extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPost: "",
      posts: "",
      currentProfile: {},
      currentUser: false
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id === this.props.currentUser.uid) {
      this.setState({ currentUser: true });
    }

    axios
      .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/people/${id}`)
      .then(response => {
        //this.setState({ currentProfile: res.data });
        axios
          .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/posts`, {
            uid: response.data.uid
          })
          .then(res => {
            this.setState({ posts: res.data, currentProfile: response.data });
          })
          .catch(err => {
            console.error(err);
          });
      });
  }

  componentWillReceiveProps(props, nextProps) {
    let id = props.match.params.id;
    if (id === this.props.currentUser.uid) {
      this.setState({ currentUser: true });
    }
    axios
      .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/people/${id}`)
      .then(response => {
        //this.setState({ currentProfile: res.data });
        axios
          .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/posts`, {
            uid: response.data.uid
          })
          .then(res => {
            this.setState({ posts: res.data, currentProfile: response.data });
          })
          .catch(err => {
            console.error(err);
          });
      });
  }

  componentDidUpdate = () => {
    this.updateLikes();
  };

  updateLikes = () => {
    let total = document.querySelectorAll(".total-likes");
    for (let i = 0; i < total.length; i++) {
      axios
        .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/likes/${total[i].id}`)
        .then(res => {
          total[i].innerText = res.data.total;
          axios
            .post(
              `${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/currentUserLiked/${
                this.props.currentUser.uid
              }/${total[i].id}`
            )
            .then(response => {
              if (response.data.liked) {
                let like = document.getElementById(total[i].id);
                if (like) {
                  like.classList.add("text-danger");
                }
              }
            });
        });
    }
  };

  onPostChange = e => {
    let newPost = e.target.value;
    console.log(newPost);
    this.setState({
      newPost
    });
  };

  newPost = e => {
    e.preventDefault();
    axios
      .post(
        `${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/${
          this.state.currentProfile.uid
        }/newPost`,
        {
          uid: this.props.currentUser.uid,
          newPost: this.state.newPost
        }
      )
      .then(res => {
        axios
          .post(
            `${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/${
              this.state.currentProfile.uid
            }/posts`
          )
          .then(res => {
            this.setState({ posts: res.data, newPost: "" });
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
  render() {
    let { currentProfile } = this.state;
    if (!_.isEmpty(currentProfile)) {
      return (
        <Fragment>
          {this.state.currentUser ? <Redirect to="/profile" /> : ""}

          <div className="jumbotron jumbotron-fluid">
            <div className="container text-center">
              <img
                src={currentProfile.photoURL}
                style={{ borderRadius: "100%", width: 200 }}
                className="img-thumbnail mx-auto d-block mb-3"
                alt="Profile"
              />
              <h1>{currentProfile.displayName}</h1>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h3>Intro</h3>
              </div>
              <div className="col-md-8">
                <div className="card mx-auto mb-3">
                  <div className="card-body">
                    <h5>Create a post</h5>
                    <form method="post">
                      <input
                        type="text"
                        placeholder={
                          "Write Something to " +
                          currentProfile.firstName +
                          "..."
                        }
                        name="question"
                        className="form-control"
                        onChange={this.onPostChange}
                        value={this.state.newPost}
                      />
                      <button
                        type="submit"
                        className="form-control btn btn-dark my-3"
                        onClick={this.newPost}
                      >
                        Share
                      </button>
                    </form>
                  </div>
                </div>
                {this.state.posts.length > 0
                  ? this.state.posts.map((item, index) => {
                      return (
                        <div className="card mx-auto mb-3" key={index}>
                          <div className="card-header d-flex">
                            <img
                              src={item.from.photoURL}
                              style={{ height: 25, borderRadius: "100%" }}
                              alt="profile"
                            />
                            <Link
                              to={"/people/" + item.from.uid}
                              className="ml-2"
                            >
                              {item.from.displayName}
                            </Link>
                          </div>
                          <div className="card-body">
                            <h5>{item.post}</h5>
                            <label className="float-left text-muted">
                              <i
                                className="fas fa-heart"
                                onClick={this.onLike}
                                id={item._id}
                              />
                              <span
                                className="badge badge-secondary bg-light text-secondary total-likes"
                                id={item._id}
                              />
                            </label>
                          </div>

                          <div className="card-footer d-flex justify-content-center align-items-center">
                            <img
                              src={this.props.currentUser.photoURL}
                              style={{ height: 25, borderRadius: "100%" }}
                              alt="profile"
                            />
                            <input
                              type="text"
                              placeholder="Write a comment..."
                              name="question"
                              className="form-control ml-3"
                              style={{ borderRadius: "100px" }}
                            />
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </Fragment>
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
)(Other);

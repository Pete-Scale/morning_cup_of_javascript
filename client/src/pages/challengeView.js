import React, { useState, useReducer } from "react"
import Container from "../components/container/container"
import Marked from "marked"

import {
  Link,
  useLocation,
  useHistory
} from "react-router-dom";

import Row from "../components/row/row"
import Col from "../components/col/col"
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dreamweaver";
import ChallengesAPI from "../utils/challengesAPI";
import { useAuth0 } from "@auth0/auth0-react";
// import { BsFillHeartFill, BsFillArchiveFill } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import "./pagesCSS/challengeView.css"

const ChallengeView = () => {

  const [saveAnswer, setSaveAnswer] = useState([])


  // const [count, dispatch] = useReducer((state, action) => {
  //   console.log("action", action)
  //   console.log("state", state)
  //   if (action === "add") {
  //     return state + 1;
  //   }
  // }, 0)

  const [editorTheme, setEditorTheme] = useState("dracula")

  const history = useHistory()

  const location = useLocation();
  console.log(location)

  const challengeCode = Marked(location.state.description)
  console.log(challengeCode)


  const { user } = useAuth0();
  const onChange = (newValue) => {
    setSaveAnswer(newValue)
  }

  const handleEditorTheme = e => {
    setEditorTheme(e.target.value)
  }


  const handleSave = id => {
    const findAnswer = {
      name: location.state.name,
      url: location.state.url,
      description: location.state.description,
      rank: location.state.rank.id,
      challengeId: id,
      answer: saveAnswer,
      userId: user.sub

    }
    ChallengesAPI.saveAnswer(findAnswer)
      .then(response => {
        console.log(response)
        setSaveAnswer(response.data)
        history.push("./savedanswerlist")
      })
      .catch(err => console.log(err))

  }



  let difficulty = "EASY"
  if (location.state.rank.id > -8) {
    difficulty = "HARD"
  }

  const rankColor = difficulty === "EASY" ? "easy-color" : "hard-color"


  return (

    <Container className="view-container">
      <Row className="view-row">
        <Col className="col-md-6 challenge-list">
          <div className="card" >
            <div className="card-body">
              <h5 className="card-title">{location.state.name}</h5>
              <h6 className={`card-subtitle mb-2 text-muted rank ${rankColor}`}>{difficulty}</h6>
              <div dangerouslySetInnerHTML={{ __html: challengeCode }} className="card-text" />
              <div className="card-items">
                <button className="link-btn">
                  <Link to="/challenges" className="card-link">Back</Link>
                </button>
                <button className="link-btn">
                  <a href={location.state.url} target="_blank" rel="noreferrer" className="card-link">CodeWarsLink</a>
                </button>
                {/* <button className="likes-btn" onClick={() => dispatch("add")}> <BsFillHeartFill className="likes-icon" /> </button> {count} Likes */}
            </div>
            </div>
          </div>
        </Col>
        <Col className="col-md-6 editor">
          <Row className="select-row">
            <label for="theme">Choose a theme:</label>
            <select name="theme" id="theme" onChange={handleEditorTheme}>
              <option value="dracula">dracula</option>
              <option value="dawn">dawn</option>
              <option value="chaos">chaos</option>
              <option value="cobalt">cobalt</option>
              <option value="github">github</option>
              <option value="dreamweaver">dreamweaver</option>
            </select>
            <br></br>
          </Row>
          <Row>
            <AceEditor
              mode="javascript"
              theme={editorTheme}
              onChange={onChange}
              name="ANSWER_UNIQUE_ID"
              editorProps={{ $blockScrolling: true }}
              width="700px"
              fontSize="18px"
            />
          </Row>
          <Row>
            <Col className="col-md-3 button-container">
              <button type="button" className="save-btn" onClick={() => { handleSave(location.state.id) }}>< FaSave />SAVE</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default ChallengeView
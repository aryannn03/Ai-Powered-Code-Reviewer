import { useState, useEffect } from 'react' 
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'
import { BeatLoader } from "react-spinners"

function App() {
  const [code, setCode] = useState(``)
  const [review, setReview] = useState(``)
  const [loading, setLoading] = useState(false) // spinner state

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      setLoading(true) // show spinner
      setReview("") // clear old response
      const response = await axios.post('https://ai-powered-code-reviewer-7xav.onrender.com/ai/get-review', { code })
      setReview(response.data)
    } catch (error) {
      setReview("Error fetching review")
    } finally {
      setLoading(false) // hide spinner
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code" style={{ position: "relative" }}>
            {/* Placeholder */}
            {code.trim() === "" && (
              <div 
                style={{
                  position: "absolute",
                  top: 10,
                  left: 12,
                  color: "#888",
                  pointerEvents: "none",
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 16
                }}
              >
                Your code here...
              </div>
            )}
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <BeatLoader color="#36d7b7" />
            </div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review}
            </Markdown>
          )}
        </div>
      </main>
    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import "prismjs/themes/prism-okaidia.css"
import Editor from "react-simple-code-editor"
import prism from 'prismjs'
import axios from 'axios'
import Markdown from 'react-markdown'

import './App.css'

function App() {

  const [code, setCode] = useState(`function sum(){
    return 1+1;
  }`);

  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll()
  })

  async function reviewCode() {
    try {
    const response = await axios.post('http://localhost:3000/ai/generateReview', {
      code
    });
    setReview(response.data);
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      console.error('Unable to connect to the server. Please ensure the backend is running.');
    }
  }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={10}
              className="editor"
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                borderRadius: '4px',
                height: '100%',
                width: '100%',
              }}
            />
            <div onClick={reviewCode} className="review">Review</div>
          </div>
        </div>
        <div className="right">
          <Markdown>{review}</Markdown>
        </div>
      </main>
    </>
  )
}

export default App

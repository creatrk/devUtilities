import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import List from './utils/routesConfig';
const App = () => {


  return (
    <Router>
      <div className="page-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          {List.map((item, index) => {
            const [category, links] = Object.entries(item)[0];
            return (
              <div key={index}>
                <h3>{category}</h3>
                <ul className="link-list">
                  {links.map((link, index) => {
                    const [name, { path }] = Object.entries(link)[0];
                    return (
                      <li key={index}>
                        <a href={path}>{name}</a>
                      </li>
                    )
                  }
                  )}
                </ul>
              </div>
            )
          })}

        </div>

        {/* Content Area */}
        <div className="content">
          <Routes>
            {List.flatMap(item =>
              Object.values(item)[0].map((link, index) => (
                <Route
                  key={index}
                  path={link[Object.keys(link)[0]].path}
                  element={link[Object.keys(link)[0]].element}
                />
              ))
            )}
          </Routes>
        </div>
      </div>
    </Router >
  );
}

export default App;

//CSV Viewer
//Word & Character Counter
//Text Diff Tool
//Regex Tester
//JSON Formatter / Minifier / Validator
//Text Encrypt / Decrypt (AES/Hash tools)
//Color Picker + Palette Generator
{/* <li><a href="/textformatter">Text Formatter</a></li> */ }
{/* <li><a href="/urlshortener">URL Shortener</a></li> */ }
{/* <li><a href="/passwordgenerator">Password Generator</a></li> */ }
{/* <li><a href="/textcaseconverter">Text Case Converter</a></li> */ }
{/* <li><a href="/textcounter">Text Counter</a></li> */ }
{/* <li><a href="/textreverser">Text Reverser</a></li> */ }
{/* <li><a href="/texttoimage">Text to Image</a></li> */ }
{/* <li><a href="/imagetotext">Image to Text</a></li> */ }
{/* <li><a href="/texttospeech">Text to Speech</a></li> */ }
{/* <li><a href="/speechtotext">Speech to Text</a></li> */ }
{/* <li><a href="/snake">Snake</a></li>
<li><a href="/flappybird">Flappy Bird</a></li>
<li><a href="/2048">2048</a></li>
<li><a href="/minesweeper">Minesweeper</a></li>
<li><a href="/sudoku">Sudoku</a></li>
<li><a href="/connectfour">Connect Four</a></li> 
</ul>*/}


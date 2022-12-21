import React from "react"
import './styles/App.css';
import './styles/puzzle.css';
import Puzzle from "./components/Puzzle";
import SideMenu from './components/SideMenu';


function App() {  

  // Create state for difficulty level
  const [level,  setLevel] = React.useState(2);

  // Create state for current page 
  const [currentPage,  setCurrentPage] = React.useState(3);

  // Create state for a random list of page grid
  const [indices,  setIndices] = React.useState(getRandomIndices(level));

  // Create state for stage of completion
  const [completed, setCompleted] = React.useState(0);
  
  // UseEffect to recieve current grids and derive percentage of correctly placed
  React.useEffect(() => {
     let correct = 0
      indices.reduce((arr, e, i) => {if (parseInt(e.randomId) >= 0 && parseInt(e.randomId) === i-level) correct++; return correct}, 0)
      console.log("Correct - "+correct+" / "+Math.floor(correct/(indices.length-level)*100))
      console.log(indices)
      setCompleted(Math.floor(correct/(indices.length-level)*100))
  }, indices);

  // UseEffect to generate new grid indices to reflect new level or page
  React.useEffect(() => {
    setIndices(getRandomIndices(level))
    setCompleted(0)
  }, [level, currentPage]);
  
  // Generate random list of grid indices
  function getRandomIndices(diffLevel){
    const randomIndices = []
    const limit = diffLevel * 15;
    let j = 0;
    while (randomIndices.length < limit){

      let randomIndex = Math.floor(Math.random() * limit);

      // ensures no siilar value at two positions
      if (randomIndices.filter(function(e) { return e.randomId === randomIndex; }).length > 0) {
        continue
      }
      randomIndices.push({id: j, randomId: randomIndex});
      j++
    }
    // Add pseudo-grids at the beginning to take care of error right-to-left adaptation of react-sortablejs
    // Added pseudo-grids will be same number as level
    for (let i = 0; i < level; i++){
      randomIndices.unshift({id: -1-i, randomId: -1-i})
    }
    
    return randomIndices;
  }

  // called when there's a grid re-arranement to update positions
  function updateIndices(data) {
    // Prevent pseudo-grids from being used in the puzzle
    for (let i = 0; i < level; i++) {
      if (data[i].id >= 0) return;
    }
    setIndices(data)
  }

  // called when a new page puzzle is clicked
  function setNewPage(event) {
    updatePageNumber(parseInt(event.target.id)+1)
  }

  // called when the Next button is clicked
  function goToNext(){
    if (currentPage < 603){
      updatePageNumber(currentPage => currentPage + 1)
    }
  }

  // called when the Previous button is clicked
  function goToPrevious(){
    if (currentPage > 1){
      updatePageNumber(currentPage => currentPage - 1)
    }
  }
  
  // uppdates the quran page
  function updatePageNumber(newNumber){
    setCurrentPage(newNumber)
  }
   
  // updates the difficulty level
  function updateLevel(event){
    setLevel(event.target.value)
  }

  
  return (
    <div className="App" id="App">
      
      <div class="puzzle-row">
        <SideMenu className="sidemenu" onClick={setNewPage} level = {level} setNewLevel={updateLevel} completed={completed} page={currentPage}/>
        <div className="puzzle-wrapper">
        <div className="puzzle">
        <Puzzle level={level} page = {currentPage} indices = {indices} onIndicesChange = {updateIndices} goToNext={goToNext} goToPrevious={goToPrevious}/>
        </div>
        <div className="controls">
          <button onClick={goToNext}><i class="fa-solid fa-angles-left fa-10x"></i><br/><span>{"←  Next"}</span></button>
          <button onClick={goToPrevious}><i class="fa-solid fa-angles-right fa-10x"></i><br/><span>{"Previous  →"}</span></button>
        </div>
        </div>
      </div>
    </div>
  );
  
  
  
}
export default App;

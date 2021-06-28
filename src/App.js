import './App.css';
import { useState, useRef } from 'react';
import { shuffle } from 'lodash';
import { Flipper, Flipped } from 'react-flip-toolkit';
import Grid from '@material-ui/core/Grid';
import FruitCard from './FruitCard';

import { Button, ButtonGroup, Paper, Divider, InputBase, TextField,} from '@material-ui/core';

import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

const defaultList = [
  {name: "Apple"}, 
  {name: "Orange"}, 
  {name: "Banana"}, 
  {name: "Cherry"},
]

function App() {

  const testRef = useRef()
  const [newFruit, setNewFruit] = useState('')
  const [flipFlag, setFlipFlag] = useState(1)
  const [fruits, setFruits] = useState(defaultList)

  const addFruit = () => {
    if(!newFruit) {
      return
    }

    if (fruits.some(f => f.name === newFruit)) {
      console.log("No")
      return
    } 

    const head = {name: newFruit}
    setFruits([head, ...fruits])
    setFlipFlag(p => -p)
    setNewFruit('')
  }

  const cycleFruits = () => {
    const copyList = fruits.slice()
    const head = copyList.shift()

    setFruits([...copyList, head])
    setFlipFlag(p => -p)
  }

  const uncycleFruits = () => {
    const copyList = fruits.slice()
    const tail = copyList.pop()

    setFruits([tail, ...copyList])
    setFlipFlag(p => -p)
  }

  const shuffleFruits = () => {
    setFruits(shuffle(fruits))
    setFlipFlag(p => -p)
  }

  const deleteFruit = (fruit) => {
    const newList = fruits.filter(f => f !== fruit)
    setFruits(newList)
    setFlipFlag(p => -p)
  }

  console.log("Fruits !")

  return (
    <div className="App">

      <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
        <Button
          aria-label="cycle left"
          onClick={cycleFruits}
        >
          <SkipPreviousIcon/>
        </Button>

        <Button
          aria-label="shuffle" 
          onClick={shuffleFruits}
        >
          <ShuffleIcon />
        </Button>

        <Button
          aria-label="cycle right"
          onClick={uncycleFruits}
        >
          <SkipNextIcon/>
        </Button>
      </ButtonGroup>

      <br/>

      <form onSubmit = {e => {e.preventDefault(); addFruit()}}>
        <TextField id="standard-basic"
          value = {newFruit}
          onChange={e => setNewFruit(e.target.value)}
          placeholder = "Add Fruit..."
          inputProps={{ maxLength: 12 }}
        />
      </form>

      <Flipper flipKey={flipFlag}>
      <Grid container spacing = {1}>
        {fruits.map(fruit =>
          (
            <Flipped key = {fruit.name} flipId = {fruit.name} stagger>
              {flippedProps => 
              <Grid item key={fruit}>
                <FruitCard fruit={fruit} onDelete={() => deleteFruit(fruit)} flippedProps={flippedProps}/>
              </Grid>
              }
            </Flipped>
          )
        )}
      </Grid>
      </Flipper>

    </div>
  )
}

export default App;

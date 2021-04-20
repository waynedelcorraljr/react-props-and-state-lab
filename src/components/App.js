import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    
    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }

    this.fetchPets()
  }


  handleFilterType = event => {
    this.setState({
      filters:{
        ...this.state.filters,
          type: event.target.value 
      }
    })
  }

  fetchPets = event => {
    if(event){
      event.preventDefault()
    }
    // console.log(this.state.filters.type)
    if(this.state.filters.type === 'all') {
      fetch('/api/pets')
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        return this.setState({
          pets: data
        })
      })
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        return this.setState({
          pets: data
        })
      })
    }
  }

  handleAdoptPet = (id) => {
    console.log(id)
    
    this.state.pets.forEach(pet => {
      if(pet.id === id){
        pet.isAdopted = true
      }
    })

    this.setState({
      pets: this.state.pets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={event => this.handleFilterType(event)} onFindPetsClick={event => this.fetchPets(event)} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={event => this.handleAdoptPet(event)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

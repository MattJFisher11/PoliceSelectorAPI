import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function UserSelectionForm() {
    
    const [stateForceCrime, setstateForceCrime] = useState({force: "", crime: ""});
    const [stateSas, setstateSas] = useState({stateSas: ""});
    const [crimeCategorties, setCrimeCategorties] = useState([])
    const [neighbourhoods, setNeighbourhoods] = useState([])
    const [stopSearch, setStopSearch] = useState([])
    const [isLoadingStop, setLoadingStop] = useState(false);
    const [isLoadingSaS, setLoadingSaS] = useState(false);

    function handle(e)
    {
        const data = {...stateForceCrime}
        data[e.target.id] = e.target.value
        setstateForceCrime(data)
    }

    function handlestateSas(e)
    {
        const data = {...stateSas}
        data[e.target.id] = e.target.value
        setstateSas(data)
    }

    function clearData()
    {
      setLoadingStop(true);
    }
    function clearDataSaS()
    {
      setLoadingSaS(true);
    }
    function submit(e)
    {
      setLoadingStop(true);
        e.preventDefault()
        fetch(`https://data.police.uk/api/crimes-no-location?category=${stateForceCrime.crime}&force=${stateForceCrime.force}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
          setLoadingStop(false);
          setNeighbourhoods(data)
        })
    }

    const policeDataCrimeCategorties = () => {
      fetch("https://data.police.uk/api/crime-categories")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setCrimeCategorties(data)
        })
    }

    const submitStopandSearch = (e) => {
      setLoadingSaS(true);
        e.preventDefault()
        fetch(`https://data.police.uk/api/stops-no-location?force=${stateSas.stateSas}`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setStopSearch(data)
            setLoadingSaS(false);
          })
      }


    const [force, setForce] = useState([])
    const policeForces = () => {
      fetch("https://data.police.uk/api/forces")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setForce(data)
        })
    }

    useEffect(() => {
      policeDataCrimeCategorties();
      policeForces();
    }, [])       
    

  return (
      <>
    <Container>
      <h1>Crime Data Selector from Police API</h1>
      <Row className="justify-content-md-center">
      <Form onSubmit={(e)=>submit(e)}>
      <Form.Group className="mb-3">
          <Form.Label>Select a Police Force</Form.Label>
          <Form.Select id="force" onChange={(e)=>handle(e)}>
          <option value="Non Selected">Non Selected</option>
              {force.map(force => (
                  <option value={force.id}>{force.id}</option>
              ))}
          </Form.Select>
          <Form.Label>Select a Crime</Form.Label>
          <Form.Select id="crime" onChange={(e)=>handle(e)}>
          <option value="Non Selected">Non Selected</option>
              {crimeCategorties.map(crimeCategorties => (
                  <option value={crimeCategorties.url}>{crimeCategorties.url}</option>
              ))}
          </Form.Select>
          <br></br>
          <Button type="submit" >Submit</Button>
          <br></br>
          <br></br>
          <Button onClickCapture={clearData} >Clear Data</Button>
      </Form.Group>
      </Form>
      <Form onSubmit={(e)=>submitStopandSearch(e)}>
      <Form.Group className="mb-3">
          <Form.Label>Select a Police Force for stop and Search</Form.Label>
          <Form.Select id="stateSas" onChange={(e)=>handlestateSas(e)}>
          <option value="Non Selected">Non Selected</option>
              {force.map(force => (
                  <option value={force.id}>{force.id}</option>
              ))}
          </Form.Select>
          <br></br>
          <Button type="submit" >Submit</Button>
          <br></br>
          <br></br>
          <Button onClickCapture={clearDataSaS} >Clear Data</Button>
      </Form.Group>
      </Form>
      </Row>
    </Container>
      <div>

      </div>
        
        <Table striped bordered hover>
        <thead>
            <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Month</th>
            </tr>
        </thead>
        <tbody>
        { !isLoadingStop? <> {neighbourhoods.length ?
        neighbourhoods.map(neighbourhood => (
              <tr>
                <td>{neighbourhood.id}</td>
                <td>{neighbourhood.category}</td>
                <td>{neighbourhood.month}</td>
              </tr>
        )): <p>data not found</p>} </> : <p>data not found</p>
    } 
        </tbody>
    </Table>

    <Table striped bordered hover>
        <thead>
            <tr>
                <th>age range</th>
                <th>outcome</th>
                <th>self_defined_ethnicity</th>
                <th>gender</th>
                <th>legislation</th>
                <th>officer_defined_ethnicity</th>
                <th>type</th>
                <th>object_of_search</th>
            </tr>
        </thead>
        <tbody>
        {
         !isLoadingSaS? <> {stopSearch.length ?
            stopSearch.map(stopSearchs => (
                <tr>
                  <td>{stopSearchs.age_range}</td>
                  <td>{stopSearchs.outcome}</td>
                  <td>{stopSearchs.self_defined_ethnicity}</td>
                  <td>{stopSearchs.gender}</td>
                  <td>{stopSearchs.legislation}</td>
                  <td>{stopSearchs.officer_defined_ethnicity}</td>
                  <td>{stopSearchs.type}</td>
                  <td>{stopSearchs.object_of_search}</td>
                </tr>
          )) : <p>data not found</p>} </> : <p>data not found</p>
       }
        </tbody>
    </Table>
    </>
  );
}
export default UserSelectionForm;
import { useEffect, useState } from 'react'
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import { Button } from 'react-bootstrap';
const Data = [
    {
        id: 1,
        name: 'C101',
        clients: 100,
        vehicles: 10,
        routes: 10


    },
    {
        id: 2,
        name: 'C201',
        clients: 10,
        vehicles: 3,
        routes: 3
    },
    {
        id: 3,
        name: 'R101',
        clients: 30,
        vehicles: 15,
        routes: 7
    },
    {
        id: 4,
        name: 'R201',
        clients: 40,
        vehicles: 20,
        routes: 10
    },
    {
        id: 5,
        name: 'RC101',
        clients: 50,
        vehicles: 25,
        routes: 12
    },
    {
        id: 6,
        name: 'RC201',
        clients: 50,
        vehicles: 25,
        routes: 12
    }


]

function Instances(props) {
    const [Instances, setInstances] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/Instances")
            .then(res => {
                console.log(res.data)
                console.log(res.data[0].Best_Execution.Routes)
                const sortedKeys = Object.keys(res.data[0].Best_Execution.Routes).sort();
                console.log(sortedKeys)
                const Dict = {
                    sortedKeys: sortedKeys,
                    instance: res.data
                }
                console.log(Dict)
                const data = res.data
                data["sortedKeys"] = sortedKeys
                console.log(data)
                setInstances(res.data)
            })
            .catch(err => {
                console.log(err)
            })

            

        
    }, []);
    return (
        <>
            <div className='Instances'>
                {Instances.map((instance) => (
                    <label key={instance.Name_Instance} id={instance.Name_Instance}>
                        <input type="checkbox" className='Input-Card' />
                        <div className='Card-Instance'>

                            <div className='Font-Card'>
                                <h1>{instance.Name_Instance}</h1>
                                <div className='Instance-Info'>
                                    <h4 className='mb-5'>Información de la instancia</h4>
                                    <p className='text-start mx-4'>Numero de Clientes: {instance.Customers}</p>
                                    <p className='text-start mx-4'>Numero de Vehiculos: {instance.Vehicles}</p>
                                    <p className='text-start mx-4'>Numero de Rutas: {instance.Routes}</p>
                                    <p className='text-start mx-4'>Alpha: {instance.Best_Execution.Alpha.toFixed(2)}</p>
                                    <p className='text-start mx-4'>Beta: {instance.Best_Execution.Beta.toFixed(2)}</p>
                                    <p className='text-start mx-4'>Gamma: {instance.Best_Execution.Gamma.toFixed(2)}</p>
                                    <p className='text-start mx-4'>Rho: {instance.Best_Execution.Rho.toFixed(2)}</p>
                                    <p className='text-start mx-4'>Costo: {instance.Best_Execution.FO.toFixed(2)}</p>
                                    <Button onClick={() => (props.setInstance(instance.Name_Instance)) }>Cargar</Button>
                                </div>
                            </div>


                            <div className='Back-Card'>
                                <Accordion defaultActiveKey="Route 0">
                                    {console.log(instance.Best_Execution.Routes)}
                                {

                                Object.entries(instance.Best_Execution.Routes).map(([key, value]) => (
                                    
                                    
                                    <Accordion.Item eventKey={key}>
                                        <Accordion.Header>{key} </Accordion.Header>
                                        <Accordion.Body>
                                            {value.toString()}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                
                                ))}
                                </Accordion>
                                
                            </div>
                        </div>
                    </label>
                ))}


            </div>
        </>
    )

}

export default Instances
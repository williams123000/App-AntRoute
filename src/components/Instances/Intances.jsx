import { useState } from 'react'

const Data = [
    {
        id: 1,
        name: 'C101',
        clients: 10,
        vehicles: 5,
        routes: 3
    

    },
    {
        id: 2,
        name: 'C102',
        clients: 20,
        vehicles: 10,
        routes: 5
    },
    {
        id: 3,
        name: 'C103',
        clients: 30,
        vehicles: 15,
        routes: 7
    },
    {
        id: 4,
        name: 'C104',
        clients: 40,
        vehicles: 20,
        routes: 10
    },
    {
        id: 5,
        name: 'C105',
        clients: 50,
        vehicles: 25,
        routes: 12
    },
    {
        id: 6,
        name: 'C106',
        clients: 50,
        vehicles: 25,
        routes: 12
    }
    ,
    {
        id: 7,
        name: 'C107',
        clients: 50,
        vehicles: 25,
        routes: 12
    }
]

function Instances(props) {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className='Instances'>
            {Data.map((instance) => (
                <label key={instance.id} id={instance.id}>
                <input type="checkbox" className='Input-Card' />
                    <div className='Card-Instance'>
                    
                        <div className='Font-Card'>
                        <h1>{instance.name}</h1>
                        <div className='Instance-Info'>
                            <h4 className='mb-5'>Información de la instancia</h4>
                            <p className='text-start mx-4'>Numero de Clientes: {instance.clients}</p>
                            <p className='text-start mx-4'>Numero de Vehiculos: {instance.vehicles}</p>
                            <p className='text-start mx-4'>Numero de Rutas: {instance.routes}</p>
                        </div>
                        </div>
                        

                        <div className='Back-Card'>
                            <p className='mb-0 mt-3'>Route #1: 5 3 7 8 10 11 9 6 4 2 1 75 </p>
                            <p className='mb-0'>Route #2: 5 3 7 8 10 11 9 6 4 2 1 75 </p>
                            <p className='mb-0'>Route #3: 5 3 7 8 10 11 9 6 4 2 1 75 </p>
                            <p className='mb-0'>Route #4: 5 3 7 8 10 11 9 6 4 2 1 75 </p>
                            <p className='mb-0'>Route #5: 5 3 7 8 10 11 9 6 4 2 1 75 </p>
                            <p className='mb-0'>Route #6: 5 3 7 8 10 11 9 6 4 2 1 75 </p>
                            <p className='mb-0'>Route #7: 5 3 7 8 10 11 9 6 4 2 1 75 </p>
                            <p className='mb-0'>Route #8: 5 3 7 8 10 11 9 6 4 2 1 75 </p>
                            <p className='mb-0'>Route #9: 5 3 7 8 10 11 9 6 4 2 1 75 </p>
                            <p className='mb-5'>Route #10: 5 3 7 8 10 11 9 6 4 2 1 75 </p>
                            <p className='text-start mx-5'>Cost 827.3 </p>
                        </div>
                    </div>
                </label>
            ))}
            
            
            </div>
        </>
    )

}

export default Instances
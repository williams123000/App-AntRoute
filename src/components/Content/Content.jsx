import { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaSearch } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { IoHelpBuoy } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";
import Maps from '../Maps/Maps';
import Instances from '../Instances/Intances';
function Content(props) {
    const [count, setCount] = useState(0)

    if (props.mode === 'Route') {
        return (
            <>

                <div className='Content'>

                    <div className='Content-Up d-flex align-items-center' >
                        <div className='Search-Bar justify-content-between'>

                            <h1 className='mb-0 d-flex align-items-center display-5'>AntRoute</h1>


                            <div className='d-flex Text-Search Input-Search-Componet'>

                                <Form.Group className="w-75" controlId="formBasicEmail">

                                    <Form.Control className="Input-Search" type="text" placeholder="Buscar cliente" />

                                </Form.Group>



                                <Button className="Button-Primary" variant="dark" type="submit" onClick={() => { alert("Buscar") }}>
                                    <FaSearch size={20} />

                                </Button>

                            </div>






                        </div>





                    </div>
                    <div className='Content-Down'>
                        <Maps />
                    </div>

                </div>



            </>
        )
    }

    return (
        <>
            <div className='Content'>

                <div className='Content-Up d-flex align-items-center' >
                    <div className='Search-Bar justify-content-between'>

                        <h1 className='mb-0 d-flex align-items-center display-5'>Instancias</h1>


                        






                    </div>





                </div>
                <div className='Content-Down'>
                    <Instances />
                </div>

            </div>
        </>
    )

}

export default Content
import { useState } from 'react'
import axios from 'axios';

import { FaSearch } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { IoHelpBuoy } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";
import { FaSquareGithub } from "react-icons/fa6";
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Photo_Williams from '../../assets/Colaboradores/Williams_Chan.jpg'
import Photo_Edwin from '../../assets/Colaboradores/Edwin_Montes.jpg'
import Photo_Abel from '../../assets/Colaboradores/Abel_Garcia.jpg'
import Logo from '../../assets/Colaboradores/Logo.png'
import toast, { Toaster } from 'react-hot-toast';



function Menu(props) {

    const [count, setCount] = useState(0)
    const [show, setShow] = useState(false);
    const [showToast, setShowTost] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);

    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Message, setMessage] = useState('');


    const updateName = (e) => {
        setName(e.target.value);
    }

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updateMessage = (e) => {
        setMessage(e.target.value);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowHelpModal = () => setShowHelpModal(true);
    const handleCloseHelpModal = () => setShowHelpModal(false);

    const Change_Mode = (mode) => {
        props.setMode(mode);
    }
    const Send_Contact = () => {
        if (Name === '' || Email === '' || Message === '') {
            toast.error('Por favor, llena todos los campos! 😢')
            return;
        }
        axios.post('http://localhost:3000/Contact_Peticion', {
            Name: Name,
            Email: Email,
            Message: Message
        }).then((response) => {
            console.log(response);

            setName('');
            setEmail('');
            setMessage('');
            handleCloseHelpModal();
            toast.success('Formulario enviado correctamente! 🚀')
        }).catch((error) => {
            console.log(error);

            toast.error('Error al enviar el formulario! 😢')
        });
    }



    return (
        <>
            <div className='Menu'>
                <div className='Header-Menu'>
                    <img src={Logo} alt="" style={{ width: '120px', height: '110px' }} />
                </div>

                <div className='Header'>


                    <div className='Options-Menu'>

                        <div className='Menu-Item mb-2' onClick={() => (Change_Mode("Route"))}>
                            <FaRoute size={40} />

                            <p>Rutas</p>

                        </div>
                        <div className='Menu-Item mb-2'>
                            <RiTeamFill size={40} onClick={handleShow} />
                            <p>Acerca de</p>

                        </div>
                        <div className='Menu-Item mb-2'>
                            <IoHelpBuoy size={40} onClick={handleShowHelpModal} />
                            <p>Contacto</p>

                        </div>
                        <div className='Menu-Item mb-2' onClick={() => (Change_Mode("Instances"))}>
                            <FaListCheck size={40} />
                            <p>Instancias</p>
                        </div>



                    </div>
                </div>


                <div className='Footer'>
                    <div className='Menu-Item '>

                        

                    </div>
                    <div className='Informacion_Desarrollador'>
                        <hr className="Linea_Invisible" />
                        <IoSettingsOutline size={40} />
                    </div>
                </div>



            </div >

            <Modal show={show} onHide={handleClose} centered>

                <Modal.Body className='p-5'>
                    <div className='text-center'>
                        <h1 className='mb-3'>Acerca de</h1>
                        <h2 className='mb-5'>Colaboradores</h2>

                        <div className='Colaboradores mb-5'>
                            <div>
                                <img className="Foto_Perfil" src={Photo_Williams} alt="" />
                                <p className='mb-0 mt-3'><b>Desarrollador</b></p>
                                <h4 className='mb-0'><b>Williams Chan Pescador</b></h4>

                                <p className='mb-3'>Estudiante de Ingeniería en Computación</p>
                            </div>
                            <div>
                                <img className="Foto_Perfil" src={Photo_Edwin} alt="" />
                                <p className='mb-0 mt-3'><b>Tutor</b></p>
                                <h4 className='mb-0'><b>Dr. Edwin Montes Orozco</b></h4>
                                <p className='mb-3'>Dr. en Ciencias y Tecnologías de la Información</p>
                            </div>

                            <div>
                                <img className="Foto_Perfil" src={Photo_Abel} alt="" />
                                <p className='mb-0 mt-3'><b>Tutor</b></p>
                                <h4 className='mb-0'><b>Dr. Abel García Nájera</b></h4>
                                <p className='mb-3'>Dr. en Ciencias de la Computación</p>
                            </div>
                        </div>

                        <h2>Repositorio</h2>
                        <a href="https://github.com/williams123000/VRPTW-PY" target="_blank">
                            <FaSquareGithub size={50} />
                        </a>



                    </div>

                </Modal.Body>

            </Modal>

            <Modal show={showHelpModal} onHide={handleCloseHelpModal} centered>

                <Modal.Body className='p-5'>

                    <div className='text-center'>
                        <h1 className='mb-5'>Contacto</h1>

                        <Form className='mt-5 text-start '>
                            <Form.Group className='mb-5' controlId="formBasicName">
                                <Form.Label> <h5 className='mb-0'>Nombre</h5></Form.Label>
                                <Form.Control type="text" placeholder="Ingresa tu nombre" id='Name' onChange={updateName} />
                            </Form.Group>

                            <Form.Group className='mb-5' controlId="formBasicEmail">
                                <Form.Label><h5 className='mb-0'>Correo electrónico</h5></Form.Label>
                                <Form.Control type="email" placeholder="Ingresa tu correo electrónico" onChange={updateEmail} />
                            </Form.Group>

                            <Form.Group className='mb-5' controlId="formBasicMessage">
                                <Form.Label><h5 className='mb-0'>Mensaje</h5></Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Escribe tu mensaje aquí" onChange={updateMessage} />
                            </Form.Group>
                            <div className='text-center d-flex justify-content-center'>
                                <Button className='mt-5' variant="success" onClick={Send_Contact}>
                                    Enviar mensaje
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
            <div><Toaster position="top-right" reverseOrder={false} /></div>

        </>
    )
}

export default Menu
import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'

import "leaflet/dist/leaflet.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaSearch } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { IoHelpBuoy } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";

import axios from 'axios';
import Background_Image from './Background.png';
function Maps(props) {
    const position = [19.435330, -99.14281]
    const [routes, setRoutes] = useState([]);
    const [routes_dynamic, setRoutes_dynamic] = useState([]);
    const [routes_static, setRoutes_static] = useState([]);

    const component = useRef(null);

    const [widthScreen, setWidthScreen] = useState(window.innerWidth);
    const [heightScreen, setHeightScreen] = useState(window.innerHeight);

    useEffect(() => {

        axios.get('http://localhost:3000/Route', { params: { "Instance": props.instance } })
            .then(res => {
                console.log(res.data);
                res.data.forEach(element => {
                    element.points.forEach(point => {
                        point.x = (point.x * widthScreen / 100) + (component.current.getBoundingClientRect().width / 20);
                        point.y = (point.y * heightScreen / 100) + (component.current.getBoundingClientRect().height / 20);
                    });
                });
                setRoutes(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const drawPoints = () => {
        const canvas = document.getElementById('canvas_points');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log(canvas.width, canvas.height)

        routes.forEach(route => {
            route.points.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 7, 0, Math.PI * 2); // Radio de 5 para los puntos
                ctx.fillStyle = 'white'; // Color del relleno
                ctx.fill();
                ctx.strokeStyle = 'black'; // Color del borde
                ctx.lineWidth = 2; // Ancho del borde
                ctx.stroke();
            });
        });
    };

    useEffect(() => {
        drawPoints();
    }, [routes]);

    useEffect(() => {
        const canvas = document.getElementById('canvas_static');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#8BA5C1'; // Color de las líneas
        ctx.lineWidth = 6; // Ancho de las líneas

        const drawRoutes_static = () => {
            routes.forEach(route => {
                for (let i = 0; i < route.points.length - 1; i++) {
                    ctx.beginPath();
                    ctx.moveTo(route.points[i].x, route.points[i].y);
                    ctx.lineTo(route.points[i + 1].x, route.points[i + 1].y);
                    ctx.stroke();
                }
            });
        };

        const drawRoutes = () => {

            const canvas = document.getElementById('canvas_static');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = '#FF0000'; // Color de las líneas
            ctx.lineWidth = 6; // Ancho de las líneas

            const animateRoute = (pointIndex) => {
                return new Promise((resolve) => {
                    let animationProgress = 0;
                    const animationSpeed = 0.02; // Ajusta la velocidad de la animación

                    const animationInterval = setInterval(() => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        routes.forEach(route => {
                            if (route.points[pointIndex] && route.points[pointIndex + 1]) {
                                ctx.beginPath();
                                ctx.moveTo(route.points[pointIndex].x, route.points[pointIndex].y);
                                const deltaX = route.points[pointIndex + 1].x - route.points[pointIndex].x;
                                const deltaY = route.points[pointIndex + 1].y - route.points[pointIndex].y;
                                const currentX = route.points[pointIndex].x + deltaX * animationProgress;
                                const currentY = route.points[pointIndex].y + deltaY * animationProgress;
                                ctx.lineTo(currentX, currentY);
                                ctx.stroke();
                                animationProgress += animationSpeed;
                                if (animationProgress >= 1) {
                                    //clearInterval(animationInterval);
                                    resolve();
                                }
                            }
                        });

                    }, 50); // Ajusta el tiempo de intervalo para la animación
                });
            };

            const drawNextPoint = async (pointIndex) => {
                await animateRoute(pointIndex);
            };

            const drawAllPoints = async () => {
                for (let i = 0; i < Math.max(...routes.map(route => route.points.length - 1)); i++) {
                    await drawNextPoint(i);
                }
            };

            drawAllPoints();
        };

        drawRoutes_static();
        //drawRoutes();





    }, [routes]);

    useEffect(() => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        ctx.strokeStyle = '#8BA5C1'; // Color de las líneas
        ctx.lineWidth = 2; // Ancho de las líneas
    
        const drawRoutes_static = () => {
            routes.forEach(route => {
                for (let i = 0; i < route.points.length - 1; i++) {
                    ctx.beginPath();
                    ctx.moveTo(route.points[i].x, route.points[i].y);
                    ctx.lineTo(route.points[i + 1].x, route.points[i + 1].y);
                    ctx.stroke();
                }
            });
        };
    
        const drawRoutes = () => {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            ctx.strokeStyle = '#0F53FF'; // Color de las líneas
            ctx.lineWidth = 5; // Ancho de las líneas
    
            const animationDuration = 2000; // Duración total de la animación en milisegundos
    
            const animateRoute = (pointIndex, startTime) => {
                return new Promise((resolve) => {
                    const animationInterval = setInterval(() => {
                        const currentTime = Date.now();
                        const elapsedTime = currentTime - startTime;
                        const animationProgress = Math.min(1, elapsedTime / animationDuration);
                        //ctx.clearRect(0, 0, canvas.width, canvas.height);  // Comentar para que no se borren las rutas
    
                        routes.forEach(route => {
                            if (route.points[pointIndex] && route.points[pointIndex + 1]) {
                                ctx.beginPath();
                                ctx.moveTo(route.points[pointIndex].x, route.points[pointIndex].y);
                                const deltaX = route.points[pointIndex + 1].x - route.points[pointIndex].x;
                                const deltaY = route.points[pointIndex + 1].y - route.points[pointIndex].y;
                                const currentX = route.points[pointIndex].x + deltaX * animationProgress;
                                const currentY = route.points[pointIndex].y + deltaY * animationProgress;
                                ctx.lineTo(currentX, currentY);
                                ctx.stroke();
                                if (animationProgress >= 1) {
                                    clearInterval(animationInterval);
                                    resolve();
                                }
                            }
                        });
    
                    }, 50); // Ajusta el tiempo de intervalo para la animación
                });
            };
    
            const drawNextPoint = async (pointIndex) => {
                const startTime = Date.now();
                await animateRoute(pointIndex, startTime);
            };
    
            const drawAllPoints = async () => {
                for (let i = 0; i < Math.max(...routes.map(route => route.points.length - 1)); i++) {
                    await drawNextPoint(i);
                }
            };
    
            drawAllPoints();
        };
    
        //drawRoutes_static();
        drawRoutes();
    }, [routes]);




    return (
        <>


            <div className='Maps d-flex justify-content-center' ref={component}>
                <div className='Container-Maps'>

                    <div className="d-flex justify-content-center" style={{ width: "100%", height: "100%", position: 'absolute', }}>

                        <MapContainer center={position} zoom={2} scrollWheelZoom={true} >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                        </MapContainer>
                        <canvas

                            id="canvas_static"
                            width={widthScreen} // Ancho del lienzo
                            height={heightScreen} // Alto del lienzo
                            style={{ border: '0px solid black', backgroundColor: 'transparent', position: 'absolute', transform: 'scale(1)', transform: 'scaleX(1)', transform: 'scaleY(-1)' }} // Estilos
                        // Manejador de clic
                        />
                        <canvas
                            id="canvas"

                            width={widthScreen} // Ancho del lienzo
                            height={heightScreen} // Alto del lienzo
                            style={{ border: '0px solid black', backgroundColor: 'transparent', position: 'absolute', transform: 'scale(1)', transform: 'scaleX(1)', transform: 'scaleY(-1)' }} // Estilos
                        // Manejador de clic
                        />
                        <canvas

                            id="canvas_points"
                            width={widthScreen} // Ancho del lienzo
                            height={heightScreen} // Alto del lienzo
                            style={{ border: '0px solid black', backgroundColor: 'transparent', transform: 'scale(1)', transform: 'scaleX(1)', transform: 'scaleY(-1)' }} // Estilos
                        // Manejador de clic
                        />
                    </div>


                </div>

            </div>






        </>
    )
}

export default Maps
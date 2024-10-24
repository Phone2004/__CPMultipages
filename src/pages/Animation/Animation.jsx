import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useEffect } from 'react';
import './Animation.css'; // Ensure you have this CSS file

const fieldWidth = 800;
const fieldHeight = 500;
const ballSize = 150;

const maxX = fieldWidth - ballSize - 2;
const maxY = fieldHeight - ballSize - 2;

const vX = 7; // Speed in X direction
const vY = 7; // Speed in Y direction

const Animation = () => {
    const [running, setRunning] = useState(false);
    const [currentBackgroundImage, setCurrentBackgroundImage] = useState('');
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [goRight, setGoRight] = useState(true);
    const [goDown, setGoDown] = useState(true);
    const [spinAngle, setSpinAngle] = useState(0);
    const [spinSpeed, setSpinSpeed] = useState(0);

    useEffect(() => {
        const interval = setInterval(process, 40);
        return () => clearInterval(interval);
    }, [running, x, y]);

    const runClick = () => {
        setRunning(!running);
    };

    const calculate = () => {
        // Move right direction
        if (goRight) {
            setX((prevX) => {
                if (prevX >= maxX) {
                    setGoRight(false);
                    setSpinSpeed(Math.random() * 15 - 5);
                    return prevX;
                }
                return prevX + vX;
            });
        } else {
            setX((prevX) => {
                if (prevX <= 0) {
                    setGoRight(true);
                    setSpinSpeed(Math.random() * 15 - 5);
                    return prevX;
                }
                return prevX - vX;
            });
        }

        // Move down direction
        if (goDown) {
            setY((prevY) => {
                if (prevY >= maxY) {
                    setGoDown(false);
                    setSpinSpeed(Math.random() * 15 - 5);
                    return prevY;
                }
                return prevY + vY;
            });
        } else {
            setY((prevY) => {
                if (prevY <= 0) {
                    setGoDown(true);
                    setSpinSpeed(Math.random() * 15 - 5);
                    return prevY;
                }
                return prevY - vY;
            });
        }

        // Update the spin angle
        setSpinAngle((prevAngle) => prevAngle + spinSpeed);
    };

    const process = () => {
        if (running) {
            calculate();
        }
    };

    const updateBackgroundImage = (imageUrl) => {
        setCurrentBackgroundImage(imageUrl);
    };

    return (
        <div id="container">
            <div
                id="field"
                style={{
                    width: fieldWidth,
                    height: fieldHeight,
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#f0f0f0', // Optional: Background color for the field
                }}
            >
                <div
                    id="ball"
                    style={{
                        width: ballSize,
                        height: ballSize,
                        position: 'absolute',
                        left: x,
                        top: y,
                        backgroundImage: currentBackgroundImage,
                        backgroundSize: 'cover', // Ensure the image covers the ball
                        borderRadius: '50%', // Make the ball circular
                        transform: `rotate(${spinAngle}deg)`,
                    }}
                />
            </div>

            <div id="control">
                <button
                    id="run"
                    className={`btn ${running ? 'btn-danger' : 'btn-success'}`}
                    onClick={runClick}
                >
                    {running ? (
                        <span className="bi bi-pause-fill">&nbsp;PAUSE</span>
                    ) : (
                        <span className="bi bi-play-fill">&nbsp;RUN</span>
                    )}
                </button>
                <button className="btn btn-outline-primary" onClick={() => updateBackgroundImage('')}>
                    None
                </button>
                <button className="btn btn-outline-primary" onClick={() => updateBackgroundImage('url(./img/basketball.png)')}>
                    Basketball
                </button>
                <button className="btn btn-outline-primary" onClick={() => updateBackgroundImage('url(./img/football.png)')}>
                    Football
                </button>
                <button className="btn btn-outline-primary" onClick={() => updateBackgroundImage('url(./img/volleyball.png)')}>
                    Volleyball
                </button>
                <button className="btn btn-outline-primary" onClick={() => updateBackgroundImage('url(./img/bell1.jpg)')}>
                    Human
                </button>
                <button className="btn btn-outline-primary" onClick={() => updateBackgroundImage('url(./img/zero.jpg)')}>
                    Cartoon
                </button>
                <button className="btn btn-outline-primary" onClick={() => updateBackgroundImage('url(./img/logo.png)')}>
                    Logo
                </button>
            </div>
        </div>
    );
};

export default Animation;

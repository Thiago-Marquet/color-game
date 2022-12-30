import React from "react";

const Main = () => {

    const [color, setColor] = React.useState("none");
    const [pickedColor, setPickedColor] = React.useState("none");
    const [colorOptions] = React.useState([]);
    const [isChoiceMade, setIsChoiceMade] = React.useState(false);
    const [isCorrect, setIsCorrect] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [score, setScore] = React.useState(0);

    const generateRandomColor = () => {
        let randomColor = (Math.random() * 0xfffff * 16777216).toString(16);
        return "#" + randomColor.slice(0, 6).toUpperCase();
    }

    const generateOptionsAndRightColor = () => {
        for (var i = 0; i < 3; i++) {
            colorOptions[i] = generateRandomColor();
        }
        setTimeout(() => {
            var randomIndex = Math.floor(Math.random() * colorOptions.length);
            setColor(colorOptions[randomIndex]);
        }, 1000);

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }

    const handleChoice = (clickedColor) => {
        if (clickedColor == color) {
            setIsCorrect(true);
            setIsChoiceMade(true);
            setScore(score + 1);
        }
        else {
            setIsChoiceMade(true);
            setPickedColor(clickedColor);
            if(score > 0){
                setScore(score - 1);
            }

        }
    }

    const handleRestart = () => {
        setIsLoading(true);
        setColor("none");
        setPickedColor("none");
        generateOptionsAndRightColor();
        setIsCorrect(false);
        setIsChoiceMade(false);
    }


    React.useEffect(() => {
        generateOptionsAndRightColor();
    }, []);

    return (
        <div>
            <div className="sidebar-div">
                <span>SCORE: {score}</span>
            </div>
            <div className="main-div">
                <h1>Hex Color Game</h1>
                <h3>Guess The Color</h3>

                {isLoading ? <div class="loading-spinner"><div></div><div></div><div></div><div></div></div> :
                    <div className="color-div" style={{ backgroundColor: `${color}` }}></div>}

                <div className="buttons-div">
                    {(colorOptions & !isChoiceMade & color != "none" & color != undefined) && colorOptions.map(c => {
                        return (
                            <button className="choice-btn" key={c} onClick={() => handleChoice(c)}>{c}</button>
                        )
                    })}
                </div>

                {isChoiceMade &&
                    <div className="answer-div">
                        {isCorrect ?
                            <div style={{ color: "lime" }}>
                                Correct!
                                <br />
                                <button className="again-btn" onClick={handleRestart}>Again?</button>
                            </div>
                            :
                            <div>
                                <span style={{ color: "red" }}>Wrong!</span>
                                <br />
                                The right color was: <span style={{ color: `${color}` }}>
                                    {color}
                                </span>
                                <br />
                                You picked:
                                <span style={{ color: `${pickedColor}` }}> {pickedColor}</span>
                                <br />
                                <button className="again-btn" onClick={handleRestart}>Again?</button>
                            </div>}
                    </div>
                }

            </div>
        </div>
    )

}

export default Main;
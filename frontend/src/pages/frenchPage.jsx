import { useEffect, useState } from "react";
import HeaderTop from "./headerTop";
import SideBar from "./sideBar";
import axios from "axios";

function FrenchPage() {
    const [userId, setUserId] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const numbToDisplay = 5;
    const [flip, setFlip] = useState([]);
    const [slide, setSlide] = useState('');
    const [initialRun, setInitialRun] = useState(true);
    const [words, setWords] = useState([
            { front: "1", back: 'one' },
            { front: "2", back: 'two' },
            { front: "3", back: "three"},
            { front: "4", back: "four"},
            { front: "5", back: "five"},
            { front: "6", back: "six"},
            { front: "7", back: "seven"},
            { front: "8", back: "eight"},
            { front: "9", back: "nine"},
            { front: "10", back: "ten"}
    ]);
    const [newWords, setNewWords] = useState([]);
    const [newWordIndex, setNewWordIndex] = useState(0);

    const nextWords = () => {
        if (currentIndex < (words.length - numbToDisplay)){
            setInitialRun(false);
            setSlide('right');
            setCurrentIndex(currentIndex + numbToDisplay);
        }
    }

    const prevWords = () => {
        if (currentIndex > 0){
            setInitialRun(false);
            setSlide('left');
            setCurrentIndex(currentIndex - numbToDisplay);
        }
    }

    const handleFlip = (index) => {
        setFlip((prev) => {
            const newFlippedIndex = [...prev];

            if (newFlippedIndex[index]){
                newFlippedIndex[index] = false;
            } else {
                newFlippedIndex[index] = true;
            };
            return newFlippedIndex;
        })
    };


    


    useEffect(() => {
        axios.get('/api/french').then(response => setNewWords(response.data))
        .catch(error => console.log("Error fetching: ", error));
    }, []);

    useEffect(() => {
        if (userId) {
            axios.get(`/api/auth/user/${userId}`)
            .then((response) => {
                const fetchedIndex = response.data.frenchIndex;
                setNewWordIndex(fetchedIndex)
            }).catch((error) => {
                console.log("error fetching french index: ", error);
            })
        }
    }, []);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId"); // Assuming userId is stored during login
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.log("User is not logged in.");
        }
    }, []);

    const handleAdd = () => {
        if (newWordIndex < newWords.length){
            const newWordsAdd = newWords.slice(newWordIndex, newWordIndex + numbToDisplay);
            setWords(prevWords => [...prevWords, ...newWordsAdd]);
            const updatedIndex = newWordIndex + numbToDisplay;
            setNewWordIndex(newWordIndex + numbToDisplay);

            //backend update
            if(userId){
                axios.put(`api/auth/user/${userId}`, {frenchIndex: updatedIndex})
                .then(() => {
                    console.log("French index successfully updated");
                }).catch((error) => console.log("error updating index ", error));
            } else ( console.log("no user id"));
        }
    }

    const handleRemove = () => {
        setWords(prevWords => prevWords.slice(0, -5));
    }

    const display = words.slice(currentIndex, currentIndex + numbToDisplay);

    const renderCards = display.map((word, index) => (
        <li key={index} className={`flashcard ${flip[index] ? 'flipped' : ''}`} onClick={() => handleFlip(index)}>
                <div className="front">{word.front}</div>
                <div className="back">{word.back}</div>
        </li>
    ));

    let slideClass = '';
    if (slide === 'right' && initialRun == false){
        slideClass = 'goPrev';
    }
    if (slide === 'left' && initialRun == false){
        slideClass = 'goNext';
    }



    return (<>
        <HeaderTop />
        <SideBar />
        <ul className="side-buttons">
            <li onClick={handleAdd}>Add Five More</li>
            <li onClick={handleRemove}>Remove Last Five</li>
        </ul>

        <div className="boxes-container">
            <ul className={`boxes ${slideClass}`}>
                {renderCards}
            </ul>
        </div>

        <div className="arrows-container">
            <div className="left-arrow" onClick={prevWords}>←</div>
            <div className="text-white font-mono"> {(currentIndex + numbToDisplay)/numbToDisplay } / { words.length / numbToDisplay} </div>
            <div className="right-arrow" onClick={nextWords}>→</div>
        </div>
    </>)
}

export default FrenchPage;
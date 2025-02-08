import { useEffect, useState } from "react";
import HeaderTop from "./headerTop";
import SideBar from "./sideBar";
import axios from "axios";
import frenchWords from "../french";

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
        { front: "3", back: "three" },
        { front: "4", back: "four" },
        { front: "5", back: "five" },
        { front: "6", back: "six" },
        { front: "7", back: "seven" },
        { front: "8", back: "eight" },
        { front: "9", back: "nine" },
        { front: "10", back: "ten" }
    ]);
    const [newWords, setNewWords] = useState([]);
    const [newWordIndex, setNewWordIndex] = useState(0);
    const [frenchIndex, setFrenchIndex] = useState(0);
    console.log("is words an array? ", Array.isArray(words));
    if(!Array.isArray(words)){
        console.log(words);
    }

    const nextWords = () => {//GOING FORWARD
        if (currentIndex < (words.length - numbToDisplay)) {
            setInitialRun(false);
            setSlide('right');
            setCurrentIndex(currentIndex + numbToDisplay);
        }
    }

    const prevWords = () => {//GOING BACK
        if (currentIndex > 0) {
            setInitialRun(false);
            setSlide('left');
            setCurrentIndex(currentIndex - numbToDisplay);
        }
    }

    const handleFlip = (index) => {//FLIPPING
        setFlip((prev) => {
            const newFlippedIndex = [...prev];

            if (newFlippedIndex[index]) {
                newFlippedIndex[index] = false;
            } else {
                newFlippedIndex[index] = true;
            };
            return newFlippedIndex;
        })
    };

    useEffect(() => {//get list of French words
        console.log("is words an array? 2nd", Array.isArray(words));
        setNewWords(frenchWords);
    }, []);


    useEffect(() => {//FETCH USER ID INITIAL
        const userIdFromStorage = localStorage.getItem('userId');
        if(userIdFromStorage){
            setUserId(userIdFromStorage);
        }
    }, [])

    useEffect(() => {//FROM USER ID FETCH CORRESPONDING FRENCH INDEX(MAX WORDS)
        const fetchFrenchIndex = async () => {
            if (!userId) {
                console.log('User not logged in');
                setWords(frenchWords.slice(0, 10));
                setNewWordIndex(10);
                return;
            }
            
            try {    
                const response = await axios.get(`https://lingwit-backend.onrender.com/api/auth/user/${userId}`);
                if (response.status === 200) {
                    const fetchedIndex = response.data.frenchIndex || 10;
                    setFrenchIndex(fetchedIndex);
                    setNewWordIndex(fetchedIndex);
                    setWords(frenchWords.slice(0, fetchedIndex));
                }
            } catch (error) {
                console.log("err fetching FR index or words", error);
            }
        };

        if(frenchWords.length > 0) fetchFrenchIndex();
    },[userId, frenchWords]);

    const updateFrenchIndex = async (newIndex) => {// UPDATE MAX FRENCH INDEX
        try {
            await axios.put(`https://lingwit-backend.onrender.com/api/auth/user/${userId}`, {
                frenchIndex: newIndex
            });
            console.log("index updated to", newIndex);
        } catch (error) {
            console.log("err updating FR index", error);
        }
    }

    const handleAdd = () => {
        try {
            if (newWordIndex < newWords.length) {
                const newWordsAdd = newWords.slice(newWordIndex, newWordIndex + numbToDisplay);
                setWords(prevWords => [...prevWords, ...newWordsAdd]);
                setNewWordIndex(newWordIndex + numbToDisplay);

                //backend update
                if (userId) {
                    updateFrenchIndex(newWordIndex + numbToDisplay);
                }
                else { console.log("no user id") };
            }
        } catch (error) {
            console.log("err adding", error);
        }
    }

    const handleRemove = () => {
        if(words.length <= 0 ) return;
        const updatedIndex = newWordIndex - numbToDisplay;
        setWords(prevWords => prevWords.slice(0, -numbToDisplay));
        setNewWordIndex(updatedIndex);

        if (userId) {
            updateFrenchIndex(updatedIndex);
        }
        else {
            console.log("no user id")
        };
    }

    const display = words.slice(currentIndex, currentIndex + numbToDisplay);

    const renderCards = display.map((word, index) => (// RENDER CARDS
        <li key={index} className={`flashcard ${flip[index] ? 'flipped' : ''}`} onClick={() => handleFlip(index)}>
            <div className="front">{word.front}</div>
            <div className="back">{word.back}</div>
        </li>
    ));

    let slideClass = '';
    if (slide === 'right' && initialRun == false) {
        slideClass = 'goPrev';
    }
    if (slide === 'left' && initialRun == false) {
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
            <div className="text-white font-mono"> {(currentIndex + numbToDisplay) / numbToDisplay} / {words.length / numbToDisplay} </div>
            <div className="right-arrow" onClick={nextWords}>→</div>
        </div>
    </>)
}

export default FrenchPage;

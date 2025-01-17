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
    const [frenchIndex, setFrenchIndex] = useState(0);

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

    useEffect(() => {//fetching FR index
        const fetchFrenchIndex = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if(!userId){
                    console.log('User not logged in');
                    return;
                }


                const response = await axios.get(`http://localhost:3000/api/auth/user/${userId}`);
                if (response.status === 200){
                    const fetchedIndex = response.data.frenchIndex || 0;
                    setFrenchIndex(fetchedIndex);

                    //fetching word
                    const wordRes = await axios.get('/api/french');
                    if(wordRes.status === 200){
                        const allWords = wordRes.data;
                        const initWords = allWords.slice(0, fetchedIndex + numbToDisplay);
                        setWords(initWords);
                        setNewWordIndex(fetchedIndex);
                    }
                }
            } catch (error) {
                console.log("err fetching FR index or words", error);
            }
        }

        fetchFrenchIndex();
    })

//update FR index
        const updateFrenchIndex = async(newIndex) => {
            try {
                const userId = localStorage.getItem("userId");
                const response = await axios.put(`http://localhost:3000/api/auth/user/${userId}`, {
                    frenchIndex: newIndex
                });
                if (response.status === 200){
                    console.log("updated", frenchIndex);
                }
            } catch (error) {
                console.log("err updating FR index", error);
            }
        }

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId"); // Assuming userId is stored during login
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.log("User is not logged in.");
        }
    }, []);

    const handleAdd = () => {
        try {
            if (newWordIndex < newWords.length){
                const newWordsAdd = newWords.slice(newWordIndex, newWordIndex + numbToDisplay);
                setWords(prevWords => [...prevWords, ...newWordsAdd]);
                const updatedIndex = newWordIndex + numbToDisplay;
                setNewWordIndex(newWordIndex + numbToDisplay);
    
                //backend update
                if(userId){
                    updateFrenchIndex(updatedIndex);
                    } 
                    else {console.log("no user id")};
            }
        } catch (error) {
            console.log("err adding", error);
        }
    }

    const handleRemove = () => {
        const updatedIndex = newWordIndex-numbToDisplay;
        setWords(prevWords => prevWords.slice(0, -numbToDisplay));
        setNewWordIndex(updatedIndex);

        if(userId){
            updateFrenchIndex(updatedIndex);
            } 
            else {
                console.log("no user id")
            };
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
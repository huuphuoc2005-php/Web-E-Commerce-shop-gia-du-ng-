import { useState, useEffect } from "react";

interface TypewriterProps{
    words: string[];
    typeSpeed?: number;
    deleteSpeed?: number;
    delaySpeed?: number;
}

export const useTypewriter = ({
    words,
    typeSpeed = 50, 
    deleteSpeed = 2, 
    delaySpeed = 1500,
}: TypewriterProps) => {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(typeSpeed);

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % words.length;
            const fullText = words[i];

            setText(
                isDeleting
                    ? fullText.substring(0, text.length - 1)
                    : fullText.substring(0, text.length + 1)
            );
            
            setTypingSpeed(isDeleting ? delaySpeed : typeSpeed);
            if (!isDeleting && text === fullText){
                setTimeout(() => setIsDeleting(true), delaySpeed);
            }
            else if (isDeleting && text === ""){
                setIsDeleting(false);
                setLoopNum(loopNum + 1)
            }
        };

        const timer = setTimeout(handleType, typingSpeed);

        return () => clearTimeout(timer); 
    }, [text, isDeleting, loopNum, words, typeSpeed, deleteSpeed, delaySpeed, typingSpeed]);
    return text;
};
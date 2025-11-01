import { createContext } from "react";
import runChat from "../config/gemini";
import { useState } from "react";

export const Context = createContext();


const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {

        setTimeout(function (params) {
            setResultData(prev => prev + nextWord);
        }, 75 * index);

    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }


    const onSent = async (prompt) => {

        let responsePrompt;




        if (prompt == undefined || prompt == null || prompt == "") {
            responsePrompt = prompt;
        }
        else {
            responsePrompt = input;
            setPrevPrompts(prev => [...prev, { prompt: input, response: "" }]);
        }
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(responsePrompt);

        setInput("");

        const response = await runChat(responsePrompt);
        let responseArray = response.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
            if (i == 0 || i % 2 == 0) {
                newResponse += responseArray[i];
            }
            else {
                newResponse += "<b>" + responseArray[i] + "</b>";

            }



        }

        let newResponse2 = newResponse.split("*").join(<br />);
        let newResponseArray = newResponse2.split("  ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + "");
        }


        setPrevPrompts(prev => {
            const updated = [...prev];
            updated[updated.length - 1].response = newResponse2;
            return updated;
        })
        setLoading(false)
        setInput("");



    }

    //onSent();


    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat

    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;


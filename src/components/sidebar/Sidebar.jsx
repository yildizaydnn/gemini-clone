import React, { use, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { Context } from '../../context/Context.jsx'




function Sidebar() {

    const [extended, setExtended] = useState(false);
    const { setRecentPrompt, setShowResult, setResultData, prevPrompts, newChat } = useContext(Context);

    const loadPrompt = (item) => {
        setRecentPrompt(item.prompt);
        setShowResult(true);
        setResultData(item.response)
    }

    return (
        <div className='sidebar'>

            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className="menu" src={assets.menu_icon} alt="" />

                {/* NEW CHAT butonu */}
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>

                {/* RECENT alanı */}
                {extended ?
                    <div className="recent">
                        <p className='recent-title'>Recent Chats</p>
                        {prevPrompts.map((item, index) => {
                            return (
                                <div onClick={() => loadPrompt(item)} className="recent-entry">
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.prompt.slice(0, 20)}...</p>
                                </div>
                            )
                        })}

                    </div>
                    : null
                }

            </div>

            {/* BOTTOM alanı */}
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
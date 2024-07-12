import {useState} from 'react';

export default function Player({initialName, symbol, isActive}){

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    // Foncion d'evenement qui met à jour l'état du boutton
    function handleEditClick(){
        setIsEditing((editing ) => !editing);
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let editableplayerName = <span className="player-name">{playerName}</span>

    if(isEditing){
        editableplayerName = <input type="text" value={playerName} required onChange={handleChange} />;
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {editableplayerName}
              <span className="player-symbol">{symbol}</span>
              <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
            </span>
        </li>
    );
}
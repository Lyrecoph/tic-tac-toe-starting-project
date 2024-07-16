import {useState} from 'react';

export default function Player({initialName, symbol, isActive, onChangeName}){

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    // Foncion d'evenement qui met à jour l'état du boutton en se basant sur la valeur précedente
    function handleEditClick(){
        setIsEditing((editing) => !editing);

        if(isEditing){
            onChangeName(symbol, playerName);
        }
        
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
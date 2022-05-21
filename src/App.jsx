import React, {useState} from 'react';
import {Button, Logo} from "./styled";
import {RgbColorPicker} from "react-colorful";
import "./App.css";
import {v4 as uuidv4} from "uuid";

export default function App(){

    const [color, setColor] = useState({r: 255, g: 255, b: 255});
    const [preSet, setPreSet] = useState([]);
    const [groups, setGroups] = useState([]);
    const [select, setSelect] = useState([]);
    let group = {group_color: "", keys: []}

    function Left(){

        function newPreSet(){
            if(groups.length > 0){
                let clone = groups;
                setGroups([]);
                setPreSet([...preSet,clone]);
            }
        }

        function setNewGroup(){

            if(groups.length > 0){
                let clone = group;
                group = {group_color: "", keys: []};
                return setGroups([...groups, clone])}

            else {
                let clone = group;
                group = {group_color: "", keys: []};
                return setGroups([clone])}
        }

        function newGroup(){
            if(select.length > 0){
                let clone = select;
                setSelect([]);
                group = {group_color: color, keys: clone}
                return setNewGroup();
            }
        }
        function Delete(){
            return setGroups([]);
        }

        let PreSet = [],Groups = [];
        for (let i = 0; i < preSet.length;i++){

            PreSet.push(
                <option key={uuidv4()}>{"preSet " + (i+1)}</option>
            )
        }


        for (let group of groups){
            Groups.push(
                <option key={uuidv4()} value={group.keys}>{"Group: (" + group.keys + ")"}</option>
            )
        }


        return(
            <div className="left_field">
                <div className="logo">LIGHTSYNC</div>
                <div className="color_picker"><RgbColorPicker defaultValue={""} color={color} onChange={setColor}/></div>

                <div className="preset"><button onClick={()=>newPreSet()}>newPreSet</button></div>
                <div><select>{PreSet}</select><button>Edit PreSet</button></div>

                <div className="group"><button onClick={() => newGroup()}>newGroup</button></div>
                <div><select>{Groups}</select><button onClick={Delete}>Edit</button></div>

                <div className="check"><button onClick={() => console.log(preSet,groups, group, select)}>Check</button></div>
            </div>
        )
    }

    function Right(){

        function setKey(value){

            if(groups.length !== 0)
                for(let group of groups)
                    if(group?.keys?.includes(value))
                        return null

            if(select.includes(value)){
                let clone = select
                clone = clone.filter(i => i !== value)
                return setSelect(clone)}
            else
                return setSelect([...select,value])
        }


        function Key(props){

            return(
                <div key={props.value} onClick={() => setKey(props.value)}>
                    <Button color = {props.color}>{props.value}</Button>
                </div>
            )
        }

        function Keyboard(){
            const keyboard = [<Logo>GB</Logo>];
            const key = ["FN1", "FN2", "FN3", "FN4",
            "TAB", "Q", "W","E","R",
            "CAPS", "A", "S","D","F",
            "SHIFT", "Z", "X","C","V",
            "SPACE"]


            for(let i = 0; i < key.length; i++){
                let key_color;
                if(groups.length === 0)
                    key_color = color
                else{
                    let temp = true;
                    for(let group of groups){
                        if(group?.keys?.includes(key[i])){
                            key_color = group.group_color
                            temp = false;
                        }
                    }
                    if(temp)
                        key_color = color
                }
                keyboard.push(
                    <Key value = {key[i]} color = {key_color}/>
                )
            }

            return(
                <div className="keyboard">
                    {keyboard}
                </div>
            )
        }

        return(

            <div className="right_field">
                <Keyboard/>
            </div>
        )
    }

    return(
        <div className="main">
            <Left/>
            <Right/>
        </div>
    )
}
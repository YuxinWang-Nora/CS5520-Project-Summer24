import { Text, TextInput} from 'react-native';
import React, {useState} from 'react';

const Input = () => {
    const [text, setText] = useState('');

  return (
    <>
    <TextInput
    placeholder='Type here to input!'
    onChangeText={text => setText(text)}
    value={text}/>
    <Text>{text}</Text>
    </>
  );
}

export default Input;
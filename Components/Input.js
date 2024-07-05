import { Text, TextInput} from 'react-native';
import React, {useState} from 'react';

const Input = () => {
 const [text, setText] = useState('');
 const [showThankYou, setShowThankYou] = useState(false);
 
 return (
 <>
 <TextInput
 placeholder="Type here to input!"
 onChangeText={(text) => {
    setText(text);
    setShowThankYou(false);
}}
value={text}
autoFocus={true}
onBlur={() => setShowThankYou(true)}
onFocus={() => setShowThankYou(false)}
/>

{showThankYou && <Text>Thank you.</Text>}
</>
 );
};

export default Input;
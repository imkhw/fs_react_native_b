import React, { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const SearchInput = (props) => {
    const [text, setText] = useState('')

    const handleChangeText = (text) => {
        setText(text)
    } 
    
    const handleSubmitEditing = () => {        
        if (!text) return
        props.onSubmit(text)
        setText('')
    }

    return (
        <View style={styles.container}>
            <TextInput 
                autoCorrect={false}
                placeholder={props.placeholder}
                placeholderTextColor='white'
                style={styles.textInput}
                clearButtonMode='always'
                underlineColorAndroid="transparent"
                value={text}
                onChangeText={handleChangeText}
                onSubmitEditing={handleSubmitEditing}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#666',
        height: 40,
        // width: 300,
        marginTop: 20,
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
        // alignSelf: 'center',
    },
    textInput: {
      flex: 1,
      color: 'white'
    }
});

SearchInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
}

SearchInput.defaultProps = {
    placeholder: '',
}

export default SearchInput
import { useState } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatetimeInput(props) {
    const [showDatetime, setShowDatetime] = useState(false);

    const onChange = (event, selectedDate) => {
        setShowDatetime(false);
        const currentDate = selectedDate;
        props.vModel(String(currentDate));
    };

    const openDateTime = () => {
        setShowDatetime(true)
    }

    return (
        <View style={[
            Style.input,
            props.error ? Style.errorStyle : Style.defaultBorder,
            props.type === "time" ? Style.half : Style.full
        ]}>
            <TouchableWithoutFeedback style={Style.datatimeStyle} onPress={openDateTime}>
                { props.value
                    ? (<Text>
                        { props.type === "time"
                            ? new Date(props.value).toLocaleTimeString()
                            : new Date(props.value).toLocaleDateString()
                        }</Text>)
                    : (<Text style={Style.placeholder}>{props.placeholder}</Text>)
                }
            </TouchableWithoutFeedback>

            { showDatetime &&
                (<DateTimePicker
                    value={props.value ? new Date(props.value) : new Date()}
                    mode={props.type}
                    is24Hour={true}
                    onChange={onChange}
                />)
            }

            { props.type === "time"
                ? <Ionicons style={Style.icon} name="ios-time-outline" size={24} color="#898686" />
                : <MaterialIcons style={Style.icon} name="date-range" size={24} color="#898686" />
            }
        </View>
    )
}

const Style = StyleSheet.create({
    input: {
        borderWidth: 2,
        height: 50,
        borderRadius: 5,
        margin: 12,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    half: {
        width: (Dimensions.get('window').width * 0.5) - 42
    },
    full: {
        width: Dimensions.get('window').width - 60
    },
    placeholder: {
        color: '#898686'
    },
    icon: {
        position: 'absolute',
        top: 11,
        right: 10
    },
    defaultBorder: {
        borderColor: '#898686'
    },
    errorStyle: {
        borderColor: '#DC0139'
    }
})
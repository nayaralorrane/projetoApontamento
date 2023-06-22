import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SelectInput(props) {
    const setValue = (vl) => {
        props.vModel(vl)
    }

    return (
        <View style={[
                Style.input,
                props.error ? Style.errorStyle : Style.defaultBorder
            ]}>
            <Picker
                selectedValue={props.value}
                onValueChange={setValue}
                style={props.value ? Style.selectedStyle : Style.selectStyle}
            >
                <Picker.Item
                    label={props.placeholder}
                    style={{ fontSize: 14}}
                    enabled={false}
                />
                {
                    props.listOptions &&
                    props.listOptions.map(projeto =>
                        <Picker.Item
                            key={projeto.id}
                            label={projeto.placeholder}
                            value={projeto.id}
                            style={{ fontSize: 14}}
                        />
                    )
                }
            </Picker>
        </View>
    )
}

const Style = StyleSheet.create({
    input: {
        borderWidth: 2,
        width: Dimensions.get('window').width - 60,
        height: 50,
        borderRadius: 5,
        margin: 12,
        justifyContent: 'center',
        paddingLeft: 2,
    },
    selectStyle: {
        flex: 1,
        color: '#898686'
    },
    selectedStyle: {
        flex: 1,
        color: '#000'
    },
    defaultBorder: {
        borderColor: '#898686'
    },
    errorStyle: {
        borderColor: '#DC0139'
    }
});
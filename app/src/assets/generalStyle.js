import { StyleSheet, Dimensions} from "react-native";

const generalStyle = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#fff',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width
    }
});

export default generalStyle;
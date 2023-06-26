import { StyleSheet, ScrollView, View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from '@expo/vector-icons';

export default function ContainerListagem(props) {
    return (
        <View style={style.container}>
            <ScrollView>
                {
                    props.arrayItems?.map(item => (
                        <TouchableOpacity
                            style={style.item}
                            key={`item-${item.name}-${item.id}`}
                            onPress={() => props.editAction(item)}
                        >
                            <Text>{ item.name }</Text>
                            
                            <View style={style.contentEndLine}>
                                {
                                    item.task_time && 
                                    <Text style={style.timeTask}>{item.task_time}</Text>
                                }

                                {
                                    props.deleteAction &&
                                    <TouchableOpacity
                                        onPress={() => props.deleteAction(item.id)}
                                        style={{ zIndex: 2 }}
                                    >
                                        <Feather name="trash-2" size={24} color="black" />
                                    </TouchableOpacity>
                                }
                            </View>
                        </TouchableOpacity>
                    ))
                }
                <TouchableOpacity
                    style={style.refresh}
                    onPress={() => props.refresh()}
                >
                    <Ionicons name="refresh" size={24} color="#898686" />
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#898686',
        borderWidth: 2,
        borderRadius: 5,
        width: Dimensions.get('window').width - 60
    },
    item: {
        flexDirection: 'row',
        borderColor: '#898686',
        borderBottomWidth: 2,
        padding: 15,
        justifyContent: 'space-between',
        zIndex: 1
    },
    refresh: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    timeTask: {
        color: '#B125B4',
        marginRight: 10,
        fontSize: 12
    },
    contentEndLine: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
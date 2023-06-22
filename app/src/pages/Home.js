import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";

import ButtonMenu from '../components/ButtonMenu';

export default function Home({ navigation }) {
    return (
        <ScrollView>
            <View style={Style.container}>
                <ButtonMenu navigation={navigation}/>
            </View>
        </ScrollView>
    )
}

const Style = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        minHeight: Dimensions.get('window').height
    }
 })
